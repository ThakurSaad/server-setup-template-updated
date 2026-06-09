import { Schema, model } from "mongoose";
import type { IAdmin } from "./admin.interface";

const AdminSchema = new Schema<IAdmin>(
  {
    authId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Auth",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profile_image: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Admin = model<IAdmin>("Admin", AdminSchema);

export = Admin;
