import { Schema, model } from "mongoose";
import type { INotification } from "./Notification.interface";

const notificationSchema = new Schema<INotification>(
  {
    toId: {
      type: Schema.Types.ObjectId,
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
  },
);

const Notification = model<INotification>("Notification", notificationSchema);

export default Notification;
