import mongoose, { Document, Model } from "mongoose";

export interface IDescription extends Document {
  description: string;
}

const descriptionSchema = new mongoose.Schema<IDescription>(
  { description: { type: String, required: true } },
  { timestamps: true },
);

export const TermsConditions: Model<IDescription> = mongoose.model(
  "TermsConditions",
  descriptionSchema,
);

export const PrivacyPolicy: Model<IDescription> = mongoose.model(
  "PrivacyPolicy",
  descriptionSchema,
);

export const FAQ: Model<IDescription> = mongoose.model(
  "FAQ",
  descriptionSchema,
);

export const AboutUs: Model<IDescription> = mongoose.model(
  "AboutUs",
  descriptionSchema,
);

export const ContactUs: Model<IDescription> = mongoose.model(
  "ContactUs",
  descriptionSchema,
);
