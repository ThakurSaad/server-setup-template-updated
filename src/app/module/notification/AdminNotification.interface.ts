import type { Types, Document } from "mongoose";

export interface IAdminNotification extends Document {
  toId: Types.ObjectId;
  title: string;
  message: string;
  isRead: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
