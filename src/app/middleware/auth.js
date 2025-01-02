const config = require("../../config");
const ApiError = require("../../error/ApiError");
const httpStatus = require("http-status");
const { jwtHelpers } = require("../../helper/jwtHelpers");
const { ENUM_USER_ROLE } = require("../../util/enum");
const Auth = require("../module/auth/Auth");

const auth =
  (roles, isAccessible = true) =>
  async (req, res, next) => {
    try {
      const tokenWithBearer = req.headers.authorization;

      if (!tokenWithBearer && isAccessible) return next();

      if (!tokenWithBearer)
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "You are not authorized for this role"
        );

      if (tokenWithBearer.startsWith("Bearer")) {
        const token = tokenWithBearer.split(" ")[1];

        const verifyUser = jwtHelpers.verifyToken(token, config.jwt.secret);

        req.user = verifyUser;

        const isExist = await Auth.findById(verifyUser?.authId);
        if (
          verifyUser.role ===
            Object.values(ENUM_USER_ROLE).includes(verifyUser.role) &&
          !isExist
        ) {
          throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
        }

        if (roles.length && !roles.includes(verifyUser.role))
          throw new ApiError(
            httpStatus.FORBIDDEN,
            "Access Forbidden: You do not have permission to perform this action"
          );

        next();
      }
    } catch (error) {
      next(error);
    }
  };

module.exports = auth;
