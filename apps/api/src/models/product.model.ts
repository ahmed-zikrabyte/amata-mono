import mongoose from "mongoose";
import { IProduct } from "../interfaces";
import { CATEGORY_DB_REF } from "./category.model";

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true },
    variants: [
      {
        size: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: CATEGORY_DB_REF,
      required: true,
    },
    ingredients: { type: String, required: true },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    nutritionInformation: {
      type: String,
      required: true,
    },
    storageInfo: {
      type: String,
      required: true,
    },
    suggestedUse: {
      type: String,
      required: true,
    },
    whyYouShouldUseThis: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PRODUCT_DB_REF = "products";
export const ProductModel = mongoose.model(PRODUCT_DB_REF, productSchema);
