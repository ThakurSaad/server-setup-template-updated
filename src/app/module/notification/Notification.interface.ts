import type { Document, Types } from "mongoose";

export interface INotification extends Document {
  toId: Types.ObjectId;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}
