const catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      return await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = catchAsync;
