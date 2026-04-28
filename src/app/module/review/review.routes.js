const express = require("express");
const auth = require("../../middleware/auth");
const ReviewController = require("./review.controller");
const config = require("../../../config");

const router = express.Router();

router
  .post(
    "/post-review",
    auth(config.auth_level.user),
    ReviewController.postReview
  )
  .get(
    "/get-all-reviews",
    auth(config.auth_level.user),
    ReviewController.getAllReviews
  )
  .get("/get-review", auth(config.auth_level.user), ReviewController.getReview)
  .patch(
    "/update-review",
    auth(config.auth_level.user),
    ReviewController.updateReview
  )
  .delete(
    "/delete-review",
    auth(config.auth_level.user),
    ReviewController.deleteReview
  );

module.exports = router;
