const { FeedbackService } = require("./feedback.service");
const sendResponse = require("../../../util/sendResponse");
const catchAsync = require("../../../util/catchAsync");

const postFeedback = catchAsync(async (req, res) => {
  const result = await FeedbackService.postFeedback(req.user, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Feedback posted",
    data: result,
  });
});

const getFeedback = catchAsync(async (req, res) => {
  const result = await FeedbackService.getFeedback(req.user, req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Feedback retrieved",
    data: result,
  });
});

const getMyFeedback = catchAsync(async (req, res) => {
  const result = await FeedbackService.getMyFeedback(req.user, req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Feedback retrieved",
    data: result,
  });
});

const getAllFeedbacks = catchAsync(async (req, res) => {
  const result = await FeedbackService.getAllFeedbacks(req.user, req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Feedback retrieved",
    data: result,
  });
});

const updateFeedbackWithReply = catchAsync(async (req, res) => {
  const result = await FeedbackService.updateFeedbackWithReply(
    req.user,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Feedback replied",
    data: result,
  });
});

const deleteFeedback = catchAsync(async (req, res) => {
  const result = await FeedbackService.deleteFeedback(req.user, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Feedback deleted",
    data: result,
  });
});

const FeedbackController = {
  postFeedback,
  getFeedback,
  getMyFeedback,
  getAllFeedbacks,
  updateFeedbackWithReply,
  deleteFeedback,
};

module.exports = { FeedbackController };
