class NotFoundHandler {
  static handle(req, res) {
    return res.status(404).json({
      success: false,
      message: "Not Found",
      errorMessages: [
        {
          path: req.originalUrl,
          message: `This ${req.originalUrl} API Not Found`,
        },
      ],
    });
  }
}

module.exports = NotFoundHandler;
