const { default: status } = require("http-status");
const ApiError = require("../error/ApiError");

const dateTimeValidator = (inputDate = [], inputTime = []) => {
  const date_regex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/; // YYYY-MM-DD
  const time_regex = /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/; // HH:MM AM/PM

  for (let date of inputDate) {
    if (date && !date_regex.test(date))
      throw new ApiError(
        status.BAD_REQUEST,
        "Invalid date format. Use MM/DD/YYYY."
      );
  }

  for (let time of inputTime) {
    if (time && !time_regex.test(time))
      throw new ApiError(
        status.BAD_REQUEST,
        "Invalid time format. Use HH:MM AM/PM."
      );
  }

  return true;
};

module.exports = dateTimeValidator;
