class ApiError extends Error {
  // 1. declare class properties in TypeScript
  public statusCode: number;

  constructor(statusCode: number, message: string, stack = "") {
    super(message);
    this.statusCode = statusCode;

    // 2. Ensure built-in Error stack trace capturing works nicely
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export = ApiError;
