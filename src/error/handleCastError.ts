import mongoose from "mongoose";

interface IErrorMessage {
  path: string;
  message: string;
}

interface ICastErrorResponse {
  statusCode: number;
  message: string;
  errorMessages: IErrorMessage[];
}

const handleCastError = (
  error: mongoose.Error.CastError,
): ICastErrorResponse => {
  const errorMessage = {
    path: error.path,
    message: "Invalid Id",
  };

  return {
    statusCode: 400,
    message: "CastError -> Please Provide Valid ObjectID",
    errorMessages: [errorMessage],
  };
};

export = handleCastError;
