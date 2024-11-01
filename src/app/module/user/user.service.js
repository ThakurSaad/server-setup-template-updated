const { status } = require("http-status");

const ApiError = require("../../../error/ApiError");
const User = require("./user.model");
const Auth = require("../auth/auth.model");

const updateProfile = async (req) => {
  const { files, body: data } = req;
  const { userId, authId } = req.user;

  if (!Object.keys(data).length)
    throw new ApiError(
      status.BAD_REQUEST,
      "Data is missing in the request body!"
    );

  let profile_image;
  if (files && files.profile_image)
    profile_image = `/${files.profile_image[0].path}`;

  const updatedData = { ...data };
  const [auth, user] = await Promise.all([
    Auth.findByIdAndUpdate(
      authId,
      { name: updatedData.name },
      {
        new: true,
      }
    ),
    User.findByIdAndUpdate(
      userId,
      { profile_image, ...updatedData },
      {
        new: true,
      }
    ).populate("authId"),
  ]);

  if (!auth || !user) throw new ApiError(status.NOT_FOUND, "User not found!");

  return user;
};

const getProfile = async (userData) => {
  const { userId, authId } = userData;

  const [auth, result] = await Promise.all([
    Auth.findById(authId),
    User.findById(userId).populate("authId"),
  ]);

  if (!result || !auth) throw new ApiError(status.NOT_FOUND, "User not found");
  if (auth.isBlocked)
    throw new ApiError(status.FORBIDDEN, "You are blocked. Contact support");

  return result;
};

const deleteMyAccount = async (payload) => {
  const { email, password } = payload;

  const isUserExist = await Auth.isAuthExist(email);
  if (!isUserExist) throw new ApiError(status.NOT_FOUND, "User does not exist");
  if (
    isUserExist.password &&
    !(await Auth.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(status.FORBIDDEN, "Password is incorrect");
  }

  Promise.all([
    Auth.deleteOne({ email }),
    User.deleteOne({ authId: isUserExist._id }),
  ]);
};

const UserService = {
  getProfile,
  deleteMyAccount,
  updateProfile,
};

module.exports = { UserService };
