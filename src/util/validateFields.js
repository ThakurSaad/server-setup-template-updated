const { default: status } = require("http-status");
const ApiError = require("../error/ApiError");

const validateFields = (payload, requiredFields) => {
  for (const field of requiredFields) {
    if (!payload[field])
      throw new ApiError(status.BAD_REQUEST, `${field} is required`);
  }
};

module.exports = validateFields;
