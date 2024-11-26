const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => ({
    path: el?.path,
    message: el?.message,
  }));

  return {
    statusCode: 400,
    message: `Validation Error: ${errors.map((e) => e.message).join(", ")}`,
    errorMessages: errors,
  };
};

module.exports = handleValidationError;
