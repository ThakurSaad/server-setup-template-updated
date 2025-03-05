const { default: status } = require("http-status");
const ApiError = require("../error/ApiError");

const dateTimeValidator = (inputDate = null, inputTime = null) => {
  const date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/; // MM/DD/YYYY
  const time_regex = /((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))/; // HH:MM AM/PM

  if (inputDate && !date_regex.test(inputDate))
    throw new ApiError(
      status.BAD_REQUEST,
      "Invalid date format. Use MM/DD/YYYY."
    );

  if (inputTime && !time_regex.test(inputTime))
    throw new ApiError(
      status.BAD_REQUEST,
      "Invalid time format. Use HH:MM AM/PM."
    );

  return true;
};

module.exports = dateTimeValidator;
