import mongoose from "mongoose";
import { IFaq } from "../interfaces";


const faqSchema = new mongoose.Schema<IFaq>(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const FAQ_DB_REF = "faqs";
export const FaqModel = mongoose.model(FAQ_DB_REF, faqSchema);