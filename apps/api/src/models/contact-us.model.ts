import mongoose from "mongoose";
import { IContactUs } from "../interfaces";

const ContactUsSchema = new mongoose.Schema<IContactUs>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const CONTACT_US_REF = "contact_us";
export const ContactUsModel = mongoose.model(CONTACT_US_REF, ContactUsSchema);
