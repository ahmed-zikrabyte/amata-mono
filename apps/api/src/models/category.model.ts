import mongoose from "mongoose";
import { ICategory } from "../interfaces";

export const categorySchema = new mongoose.Schema<ICategory>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const CATEGORY_DB_REF = "categories";
export const CategoryModel = mongoose.model<ICategory>(
  CATEGORY_DB_REF,
  categorySchema
);
