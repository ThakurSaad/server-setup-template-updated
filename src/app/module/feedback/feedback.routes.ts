import { Router } from "express";
import auth from "../../middleware/auth";
import { FeedbackController } from "./feedback.controller";
import config from "../../../config";

const router = Router();

router
  .post(
    "/post-feedback",
    auth(config.auth_level.user, false),
    FeedbackController.postFeedback,
  )
  .get(
    "/get-feedback",
    auth(config.auth_level.user),
    FeedbackController.getFeedback,
  )
  .get(
    "/get-all-feedbacks",
    auth(config.auth_level.user),
    FeedbackController.getAllFeedbacks,
  )
  .patch(
    "/update-feedback-with-reply",
    auth(config.auth_level.admin),
    FeedbackController.updateFeedbackWithReply,
  )
  .delete(
    "/delete-feedback",
    auth(config.auth_level.user),
    FeedbackController.deleteFeedback,
  );

export = router;
