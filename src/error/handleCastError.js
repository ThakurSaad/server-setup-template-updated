const handleCastError = (error) => {
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

module.exports = handleCastError;
