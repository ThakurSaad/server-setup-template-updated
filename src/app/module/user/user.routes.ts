import express from "express";
import auth from "../../middleware/auth";
import { uploadFile } from "../../middleware/fileUploader";
import { UserController } from "./user.controller";
import config from "../../../config";

const router = express.Router();

router
  .get("/profile", auth(config.auth_level.user), UserController.getProfile)
  .patch(
    "/edit-profile",
    auth(config.auth_level.user),
    uploadFile(),
    UserController.updateProfile,
  )
  .delete(
    "/delete-account",
    auth(config.auth_level.user),
    UserController.deleteMyAccount,
  );

export = router;
