const express = require("express");
const auth = require("../../middleware/auth");
const { uploadFile } = require("../../middleware/fileUploader");
const { UserController } = require("./user.controller");
const config = require("../../../config");

const router = express.Router();

router
  .get("/profile", auth(config.auth_level.user), UserController.getProfile)
  .patch(
    "/edit-profile",
    auth(config.auth_level.user),
    uploadFile(),
    UserController.updateProfile
  )
  .delete(
    "/delete-account",
    auth(config.auth_level.user),
    UserController.deleteMyAccount
  );

module.exports = router;
