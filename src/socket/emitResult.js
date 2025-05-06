const emitResult = ({ statusCode, success, message, data }) => {
  return {
    statusCode,
    success,
    message,
    ...(data && { data }),
  };
};

module.exports = emitResult;
