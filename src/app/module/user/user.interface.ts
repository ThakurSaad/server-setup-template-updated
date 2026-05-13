import type { Types, Document } from "mongoose";

export interface IUser extends Document {
  authId: Types.ObjectId;
  name: string;
  email: string;
  profile_image?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
