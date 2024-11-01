const bcrypt = require("bcrypt");
const cron = require("node-cron");

const ApiError = require("../../../error/ApiError");
const config = require("../../../config");
const { jwtHelpers } = require("../../../helper/jwtHelpers");
const { sendEmail } = require("../../../util/sendEmail");
const { ENUM_USER_ROLE } = require("../../../util/enum");
const { logger } = require("../../../shared/logger");
const Auth = require("./auth.model");
const createActivationToken = require("../../../util/createActivationToken");
const User = require("../user/user.model");
const Admin = require("../admin/admin.model");
const { status } = require("http-status");
const signUpEmailTemp = require("../../../mail/signUpEmailTemp");
const otpResendTemp = require("../../../mail/otpResendTemp");
const resetPassEmailTemp = require("../../../mail/resetPassEmailTemp");

const registrationAccount = async (payload) => {
  const { role, password, confirmPassword, email, ...other } = payload;

  if (!role || !Object.values(ENUM_USER_ROLE).includes(role))
    throw new ApiError(status.BAD_REQUEST, "Valid Role is required!");
  if (!password || !confirmPassword || !email)
    throw new ApiError(
      status.BAD_REQUEST,
      "Email, Password, and Confirm Password are required!"
    );
  if (password !== confirmPassword)
    throw new ApiError(
      status.BAD_REQUEST,
      "Password and Confirm Password didn't match"
    );

  const existingAuth = await Auth.findOne({ email }).lean();
  if (existingAuth?.isActive)
    throw new ApiError(status.BAD_REQUEST, "Email already exists");

  if (existingAuth && !existingAuth.isActive) {
    await Promise.all([
      existingAuth.role === ENUM_USER_ROLE.USER &&
        User.deleteOne({ authId: existingAuth._id }),
      existingAuth.role === ENUM_USER_ROLE.ADMIN &&
        Admin.deleteOne({ authId: existingAuth._id }),
      Auth.deleteOne({ email }),
    ]);
  }

  const activationCode = createActivationToken().activationCode;
  const activationCodeExpire = Date.now() + 3 * 60 * 1000;
  const auth = {
    role,
    name: other.name,
    email,
    password,
    activationCode,
    activationCodeExpire,
  };
  const data = {
    user: other.name,
    activationCode,
    activationCodeExpire: Math.round(
      (activationCodeExpire - Date.now()) / (60 * 1000)
    ),
  };

  if (role === ENUM_USER_ROLE.USER) {
    try {
      sendEmail({
        email: email,
        subject: "Activate Your Account",
        html: signUpEmailTemp(data),
      });
    } catch (error) {
      throw new ApiError(status.INTERNAL_SERVER_ERROR, "Email was not sent");
    }
  }

  const createAuth = await Auth.create(auth);

  if (!createAuth)
    throw new ApiError(
      status.INTERNAL_SERVER_ERROR,
      "Failed to create auth account"
    );

  other.authId = createAuth._id;
  other.email = email;

  let result;
  switch (role) {
    case ENUM_USER_ROLE.USER:
      result = await User.create(other);
      break;
    case ENUM_USER_ROLE.ADMIN:
      result = await Admin.create(other);
      break;
    default:
      throw new ApiError(status.BAD_REQUEST, "Invalid role provided!");
  }

  return { result, role, message: "Account created successfully!" };
};

const resendActivationCode = async (payload) => {
  const email = payload.email;
  const user = await Auth.isAuthExist(email);
  if (!user) throw new ApiError(status.BAD_REQUEST, "Email not found!");

  const activationCode = createActivationToken().activationCode;
  const activationCodeExpire = new Date(Date.now() + 3 * 60 * 1000);
  const data = {
    user: user.name,
    code: activationCode,
    expiresIn: Math.round((activationCodeExpire - Date.now()) / (60 * 1000)),
  };

  user.activationCode = activationCode;
  user.activationCodeExpire = activationCodeExpire;
  await user.save();

  try {
    sendEmail({
      email: email,
      subject: "New Activation Code",
      html: otpResendTemp(data),
    });
  } catch (error) {
    throw new ApiError(status.INTERNAL_SERVER_ERROR, "Email was not sent");
  }
};

const activateAccount = async (payload) => {
  const { activationCode, email } = payload;

  const existAuth = await Auth.findOne({ email: email });
  if (!existAuth) throw new ApiError(status.NOT_FOUND, "User not found");
  if (!existAuth.activationCode)
    throw new ApiError(
      status.NOT_FOUND,
      "Activation code not found. Get a new activation code"
    );
  if (existAuth.activationCode !== activationCode)
    throw new ApiError(status.BAD_REQUEST, "Code didn't match!");

  const user = await Auth.findOneAndUpdate(
    { email: email },
    { isActive: true },
    {
      new: true,
      runValidators: true,
    }
  );

  let result = {};
  if (existAuth.role === ENUM_USER_ROLE.USER) {
    result = await User.findOne({ authId: existAuth._id });
  } else if (existAuth.role === ENUM_USER_ROLE.ADMIN) {
    result = await Admin.findOne({ authId: existAuth._id });
  } else {
    throw new ApiError(status.BAD_REQUEST, "Invalid role provided!");
  }

  const tokenPayload = {
    authId: existAuth._id,
    userId: result._id,
    email: existAuth.email,
    role: existAuth.role,
  };

  const accessToken = jwtHelpers.createToken(
    tokenPayload,
    config.jwt.secret,
    config.jwt.expires_in
  );
  const refreshToken = jwtHelpers.createToken(
    tokenPayload,
    config.jwt.refresh_secret,
    config.jwt.refresh_expires_in
  );

  return {
    accessToken,
    refreshToken,
    user,
  };
};

const loginAccount = async (payload) => {
  const { email, password } = payload;

  const isAuth = await Auth.isAuthExist(email);
  if (!isAuth) throw new ApiError(status.NOT_FOUND, "User does not exist");
  if (!isAuth.isActive)
    throw new ApiError(
      status.BAD_REQUEST,
      "Please activate your account then try to login"
    );
  if (isAuth.isBlocked)
    throw new ApiError(status.FORBIDDEN, "You are blocked. Contact support");
  if (
    isAuth.password &&
    !(await Auth.isPasswordMatched(password, isAuth.password))
  ) {
    throw new ApiError(status.BAD_REQUEST, "Password is incorrect");
  }

  let result;
  let role;
  const { _id: authId } = isAuth;

  switch (isAuth.role) {
    case ENUM_USER_ROLE.USER:
      result = await User.findOne({ authId: isAuth._id }).populate("authId");
      role = ENUM_USER_ROLE.USER;
      break;
    case ENUM_USER_ROLE.ADMIN:
      result = await Admin.findOne({ authId: isAuth._id }).populate("authId");
      role = ENUM_USER_ROLE.ADMIN;
      break;
    default:
      throw new ApiError(status.BAD_REQUEST, "Invalid role provided!");
  }

  const tokenPayload = {
    authId,
    userId: result._id,
    email,
    role,
  };

  const accessToken = jwtHelpers.createToken(
    tokenPayload,
    config.jwt.secret,
    config.jwt.expires_in
  );

  const refreshToken = jwtHelpers.createToken(
    tokenPayload,
    config.jwt.refresh_secret,
    config.jwt.refresh_expires_in
  );

  return {
    user: result,
    accessToken,
    refreshToken,
  };
};

const forgotPass = async (payload) => {
  const { email } = payload;

  if (!email) throw new ApiError(status.BAD_REQUEST, "Missing email");

  const user = await Auth.isAuthExist(email);
  if (!user) throw new ApiError(status.BAD_REQUEST, "User does not found!");

  const verificationCode = createActivationToken().activationCode;
  const verificationCodeExpire = new Date(Date.now() + 15 * 60 * 1000);

  user.verificationCode = verificationCode;
  user.verificationCodeExpire = verificationCodeExpire;
  await user.save();

  const data = {
    name: user.name,
    verificationCode,
    verificationCodeExpire: Math.round(
      (verificationCodeExpire - Date.now()) / (60 * 1000)
    ),
  };

  try {
    sendEmail({
      email: payload.email,
      subject: "Password Reset Code",
      html: resetPassEmailTemp(data),
    });
  } catch (error) {
    throw new ApiError(status.INTERNAL_SERVER_ERROR, error.message);
  }
};

const forgetPassOtpVerify = async (payload) => {
  const { email, code } = payload;

  if (!email) throw new ApiError(status.BAD_REQUEST, "Missing email");

  const auth = await Auth.findOne({ email: email });
  if (!auth) throw new ApiError(status.NOT_FOUND, "Account does not exist!");
  if (!auth.verificationCode)
    throw new ApiError(
      status.NOT_FOUND,
      "No verification code. Get a new verification code"
    );
  if (auth.verificationCode !== code)
    throw new ApiError(status.BAD_REQUEST, "Invalid verification code!");

  const update = await Auth.findOneAndUpdate(
    { email: auth.email },
    { isVerified: true, verificationCode: null }
  );

  return update;
};

const resetPassword = async (payload) => {
  const { email, newPassword, confirmPassword } = payload;

  if (newPassword !== confirmPassword)
    throw new ApiError(status.BAD_REQUEST, "Passwords do not match");

  const auth = await Auth.isAuthExist(email);
  if (!auth) throw new ApiError(status.NOT_FOUND, "User not found!");
  if (!auth.isVerified)
    throw new ApiError(status.FORBIDDEN, "Please complete OTP verification");

  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  const result = await Auth.updateOne(
    { email },
    {
      $set: { password: hashedPassword },
      $unset: {
        isVerified: "",
        verificationCode: "",
        verificationCodeExpire: "",
      },
    }
  );
  return result;
};

const changePassword = async (userData, payload) => {
  const { email } = userData;

  const { oldPassword, newPassword, confirmPassword } = payload;
  if (newPassword !== confirmPassword)
    throw new ApiError(
      status.BAD_REQUEST,
      "Password and confirm password do not match"
    );

  const isUserExist = await Auth.isAuthExist(email);
  if (!isUserExist)
    throw new ApiError(status.NOT_FOUND, "Account does not exist!");
  if (
    isUserExist.password &&
    !(await Auth.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(status.BAD_REQUEST, "Old password is incorrect");
  }

  isUserExist.password = newPassword;
  isUserExist.save();
};

// Unset activationCode activationCodeExpire field for expired activation code
cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    const result = await Auth.updateMany(
      {
        activationCodeExpire: { $lte: now },
      },
      {
        $unset: {
          activationCode: "",
          activationCodeExpire: "",
        },
      }
    );

    if (result.modifiedCount > 0) {
      logger.info(`Removed ${result.modifiedCount} expired activation code`);
    }
  } catch (error) {
    logger.error("Error removing expired activation code:", error);
  }
});

// Unset isVerified, verificationCode, verificationCodeExpire field for expired verification code
cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    const result = await Auth.updateMany(
      {
        verificationCodeExpire: { $lte: now },
      },
      {
        $unset: {
          isVerified: "",
          verificationCode: "",
          verificationCodeExpire: "",
        },
      }
    );

    if (result.modifiedCount > 0) {
      logger.info(`Removed ${result.modifiedCount} expired verification code`);
    }
  } catch (error) {
    logger.error("Error removing expired verification code:", error);
  }
});

const AuthService = {
  registrationAccount,
  loginAccount,
  changePassword,
  forgotPass,
  resetPassword,
  activateAccount,
  forgetPassOtpVerify,
  resendActivationCode,
};

module.exports = { AuthService };
