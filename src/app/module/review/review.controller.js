const ReviewService = require("./review.service");
const sendResponse = require("../../../util/sendResponse");
const catchAsync = require("../../../util/catchAsync");

const postReview = catchAsync(async (req, res) => {
  const result = await ReviewService.postReview(req.user, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review posted",
    data: result,
  });
});

const getAllReviews = catchAsync(async (req, res) => {
  const result = await ReviewService.getAllReviews(req.user, req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review retrieved",
    data: result,
  });
});

const getReview = catchAsync(async (req, res) => {
  const result = await ReviewService.getReview(req.user, req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review retrieved",
    data: result,
  });
});

const updateReview = catchAsync(async (req, res) => {
  const result = await ReviewService.updateReview(req.user, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review updated",
    data: result,
  });
});

const deleteReview = catchAsync(async (req, res) => {
  const result = await ReviewService.deleteReview(req.user, req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review deleted",
    data: result,
  });
});

const ReviewController = {
  postReview,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
};

module.exports = ReviewController;
