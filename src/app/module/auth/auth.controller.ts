const { AuthService } = require("./auth.service");
const sendResponse = require("../../../util/sendResponse");
const catchAsync = require("../../../util/catchAsync");
const config = require("../../../config");

const registrationAccount = catchAsync(async (req, res) => {
  const result = await AuthService.registrationAccount(req.body);

  const isSuccess =
    result.message === "Account created successfully. Please check your email";

  sendResponse(res, {
    statusCode: isSuccess ? 200 : 400,
    success: isSuccess,
    message: result.message || "Something went wrong",
    data: result,
  });
});

const resendActivationCode = catchAsync(async (req, res) => {
  await AuthService.resendActivationCode(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Resent successfully",
  });
});

const activateAccount = catchAsync(async (req, res) => {
  const result = await AuthService.activateAccount(req.body);
  const { refreshToken } = result;

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Activation code verified successfully.",
    data: result,
  });
});

const loginAccount = catchAsync(async (req, res) => {
  const result = await AuthService.loginAccount(req.body);
  const { refreshToken } = result;

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Log in successful",
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  await AuthService.changePassword(req.user, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password changed successfully!",
  });
});

const forgotPass = catchAsync(async (req, res) => {
  await AuthService.forgotPass(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Check your email!",
  });
});

const forgetPassOtpVerify = catchAsync(async (req, res) => {
  const result = await AuthService.forgetPassOtpVerify(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Code verified successfully",
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const result = await AuthService.resetPassword(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password has been reset successfully.",
    data: result,
  });
});

const AuthController = {
  registrationAccount,
  activateAccount,
  loginAccount,
  changePassword,
  forgotPass,
  resetPassword,
  forgetPassOtpVerify,
  resendActivationCode,
};

module.exports = { AuthController };
