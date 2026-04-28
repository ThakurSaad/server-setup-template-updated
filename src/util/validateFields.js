const { default: status } = require("http-status");
const ApiError = require("../error/ApiError");

const validateFields = (payload, requiredFields) => {
  if (!payload)
    throw new ApiError(status.BAD_REQUEST, `Request body is required`);

  for (const field of requiredFields)
    if (!payload[field])
      throw new ApiError(status.BAD_REQUEST, `${field} is required`);
};

module.exports = validateFields;
