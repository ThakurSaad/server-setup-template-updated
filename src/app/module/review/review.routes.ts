import { Router } from "express";
import auth from "../../middleware/auth";
import { ReviewController } from "./review.controller";
import config from "../../../config";

const router = Router();

router
  .post(
    "/post-review",
    auth(config.auth_level.user),
    ReviewController.postReview,
  )
  .get(
    "/get-all-reviews",
    auth(config.auth_level.user),
    ReviewController.getAllReviews,
  )
  .get("/get-review", auth(config.auth_level.user), ReviewController.getReview)
  .patch(
    "/update-review",
    auth(config.auth_level.user),
    ReviewController.updateReview,
  )
  .delete(
    "/delete-review",
    auth(config.auth_level.user),
    ReviewController.deleteReview,
  );

export = router;
