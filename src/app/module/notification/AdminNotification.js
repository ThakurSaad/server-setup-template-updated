const { Schema, model } = require("mongoose");

const adminNotificationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const AdminNotification = model("AdminNotification", adminNotificationSchema);

module.exports = AdminNotification;
