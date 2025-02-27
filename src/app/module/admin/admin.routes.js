const auth = require("../../middleware/auth");
const express = require("express");
const { EnumUserRole } = require("../../../util/enum");
const { uploadFile } = require("../../middleware/fileUploader");
const { AdminController } = require("../admin/admin.controller");

const router = express.Router();

router
  .get("/profile", auth(EnumUserRole.ADMIN), AdminController.getProfile)
  .patch(
    "/edit-profile",
    auth(EnumUserRole.ADMIN),
    uploadFile(),
    AdminController.updateProfile
  )
  .delete(
    "/delete-account",
    auth(EnumUserRole.ADMIN),
    AdminController.deleteMyAccount
  );

module.exports = router;
