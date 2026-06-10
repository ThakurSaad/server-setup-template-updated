import { MulterError } from "multer";
import createErrorMessage from "../util/createErrorMessage";

interface IMulterErrorResponse {
  statusCode: number;
  message: string;
  errorMessages: ReturnType<typeof createErrorMessage>;
}

const handleMulterError = (err: MulterError): IMulterErrorResponse => {
  let message: string;
  const { code, field, message: defaultMsg } = err;

  switch (code) {
    case "LIMIT_UNEXPECTED_FILE":
      message = `Unexpected file upload detected${field ? ` for field "${field}"` : ""}. This field does not accept files or exceeded the allowed number of files.`;
      break;

    case "LIMIT_FILE_SIZE":
      message = `File size exceeds the allowed limit${field ? ` for field "${field}"` : ""}. Please upload a smaller file.`;
      break;

    case "LIMIT_FILE_COUNT":
      message = `Too many files uploaded${field ? ` for field "${field}"` : ""}. Please reduce the number of files and try again.`;
      break;

    case "LIMIT_FIELD_KEY":
      message = `Field name is too long${field ? ` ("${field}")` : ""}. Please use shorter field names.`;
      break;

    case "LIMIT_FIELD_VALUE":
      message = `Field value is too long${field ? ` for "${field}"` : ""}. Please shorten the input value.`;
      break;

    case "LIMIT_FIELD_COUNT":
      message = `Too many form fields were submitted. Please reduce the number of fields and try again.`;
      break;

    case "LIMIT_PART_COUNT":
      message = `Too many parts in the multipart request. This usually means too many files or fields were sent together.`;
      break;

    case "MISSING_FIELD_NAME":
      message = `A field is missing its name. Ensure all form fields have valid names before submitting.`;
      break;

    default:
      message =
        defaultMsg ||
        "An unexpected file upload error occurred. Please try again.";
  }

  return {
    statusCode: 400,
    message,
    errorMessages: createErrorMessage(message, field),
  };
};

export = handleMulterError;
