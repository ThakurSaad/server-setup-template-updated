import { Error } from "mongoose";

// 1. Define the shape of a single error item and the full response
interface IValidationErrorItem {
  path: string | undefined;
  message: string;
}

interface IValidationErrorResponse {
  statusCode: number;
  message: string;
  errorMessages: IValidationErrorItem[];
}

const handleValidationError = (
  err: Error.ValidationError,
): IValidationErrorResponse => {
  // Object.values(err.errors) extracts all the individual field errors (ValidatorError | CastError)
  const errors: IValidationErrorItem[] = Object.values(err.errors).map(
    (el) => ({
      path: el?.path,
      message: el?.message || "Validation failed",
    }),
  );

  return {
    statusCode: 400,
    message: `Validation Error: ${errors.map((e) => e.message).join(", ")}`,
    errorMessages: errors,
  };
};

export = handleValidationError;
