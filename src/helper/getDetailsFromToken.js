const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const config = require("../config");
const ApiError = require("../error/ApiError");
const Admin = require("../app/module/admin/admin.model");
const User = require("../app/module/auth/auth.model");
const { ENUM_USER_ROLE } = require("../util/enum");

const getUserDetailsFromToken = async (token) => {
  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid token");
  }

  const decode = jwt.verify(token, config.jwt.secret);

  const user =
    decode.role === ENUM_USER_ROLE.ADMIN
      ? await Admin.findById(decode.userId)
      : decode.role === ENUM_USER_ROLE.USER
      ? await User.findById(decode.userId)
      : null;

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  return user;
};

module.exports = getUserDetailsFromToken;
