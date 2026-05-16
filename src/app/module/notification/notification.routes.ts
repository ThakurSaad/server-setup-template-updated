import express from "express";
import auth from "../../middleware/auth";
import config from "../../../config";
import { NotificationController } from "./notification.controller";

const router = express.Router();

router
  .get(
    "/get-notification",
    auth(config.auth_level.user),
    NotificationController.getNotification,
  )
  .get(
    "/get-all-notifications",
    auth(config.auth_level.user),
    NotificationController.getAllNotifications,
  )
  .patch(
    "/update-as-mark-unread",
    auth(config.auth_level.user),
    NotificationController.updateAsReadUnread,
  )
  .delete(
    "/delete-notification",
    auth(config.auth_level.user),
    NotificationController.deleteNotification,
  );

export = router;
