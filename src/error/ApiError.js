class ApiError extends Error {
  constructor(statusCode, message, stack = "") {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    }
  }
}

module.exports = ApiError;
