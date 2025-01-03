const rateLimit = require("express-rate-limit");
const sendResponse = require("../../shared/sendResponse");

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: async (req, res) =>
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Too many requests please try again later",
    }),
});

module.exports = limiter;
