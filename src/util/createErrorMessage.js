const createErrorMessage = (message, path = "") => [{ path, message }];

module.exports = createErrorMessage;
