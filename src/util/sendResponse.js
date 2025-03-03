const sendResponse = (res, data) => {
  const responseData = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || undefined,
    data: data.data || null,
    activationToken: data.activationToken || null,
  };

  // If activationToken is null, remove it from the responseData object
  if (responseData.activationToken === null) {
    delete responseData.activationToken;
  }

  res.status(data.statusCode).json(responseData);
};

module.exports = sendResponse;
