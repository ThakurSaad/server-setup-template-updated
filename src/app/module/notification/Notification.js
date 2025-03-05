const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const notificationSchema = new Schema(
  {
    toId: {
      type: ObjectId,
      required: true,
    },
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

const Notification = model("Notification", notificationSchema);

module.exports = Notification;
