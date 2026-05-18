const { default: status } = require("http-status");

// import status from "http-status";
import ApiError from "../error/ApiError";
import otpResendTemp from "../mail/otpResendTemp";
import resetPassEmailTemp from "../mail/resetPassEmailTemp";
import signUpEmailTemp from "../mail/signUpEmailTemp";
import { sendEmail } from "../util/sendEmail";

// const ApiError = require("../error/ApiError");
// const otpResendTemp = require("../mail/otpResendTemp");
// const resetPassEmailTemp = require("../mail/resetPassEmailTemp");
// const signUpEmailTemp = require("../mail/signUpEmailTemp");
// const { sendEmail } = require("../util/sendEmail");

const sendActivationEmail = async (
  email: string,
  data: {
    user: string;
    activationCode: string;
    activationCodeExpire: number;
  },
) => {
  try {
    await sendEmail({
      email,
      subject: "Activate Your Account",
      html: signUpEmailTemp(data),
    });
  } catch (error) {
    console.log(error);
    throw new ApiError(status.INTERNAL_SERVER_ERROR, "Email was not sent");
  }
};

const sendOtpResendEmail = async (
  email: string,
  data: {
    user: string;
    activationCode: string;
    activationCodeExpire: number;
  },
) => {
  try {
    await sendEmail({
      email,
      subject: "New Activation Code",
      html: otpResendTemp(data),
    });
  } catch (error) {
    console.log(error);
    throw new ApiError(status.INTERNAL_SERVER_ERROR, "Email was not sent");
  }
};

const sendResetPasswordEmail = async (
  email: string,
  data: {
    user: string;
    verificationCode: string;
    verificationCodeExpire: number;
  },
) => {
  try {
    await sendEmail({
      email,
      subject: "Password Reset Code",
      html: resetPassEmailTemp(data),
    });
  } catch (error) {
    console.log(error);
    throw new ApiError(status.INTERNAL_SERVER_ERROR, "Email was not sent");
  }
};

const EmailHelpers = {
  sendActivationEmail,
  sendOtpResendEmail,
  sendResetPasswordEmail,
};

export = EmailHelpers;
