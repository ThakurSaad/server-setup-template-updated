const express = require("express");
const auth = require("../../middleware/auth");
const { FeedbackController } = require("./feedback.controller");
const config = require("../../../config");

const router = express.Router();

router
  .post(
    "/post-feedback",
    auth(config.auth_level.user, false),
    FeedbackController.postFeedback
  )
  .get(
    "/get-feedback",
    auth(config.auth_level.user),
    FeedbackController.getFeedback
  )
  .get(
    "/get-all-feedbacks",
    auth(config.auth_level.user),
    FeedbackController.getAllFeedbacks
  )
  .patch(
    "/update-feedback-with-reply",
    auth(config.auth_level.admin),
    FeedbackController.updateFeedbackWithReply
  )
  .delete(
    "/delete-feedback",
    auth(config.auth_level.user),
    FeedbackController.deleteFeedback
  );

module.exports = router;
