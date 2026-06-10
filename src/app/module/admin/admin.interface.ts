import type { Types, Document } from "mongoose";

export interface IAdmin extends Document {
  authId: Types.ObjectId;
  name: string;
  email: string;
  profile_image?: string;
  phoneNumber?: string;
  address?: string;
}
