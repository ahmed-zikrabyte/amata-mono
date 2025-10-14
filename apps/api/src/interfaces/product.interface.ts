import mongoose from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  slug: string;
  variants: IProductVariant[];
  images: string[];
  nutritionInformation: string;
  ingredients: string;
  suggestedUse: string;
  storageInfo: string;
  whyYouShouldUseThis: string;
  category: mongoose.Types.ObjectId;
  isActive: boolean;
  isDeleted: boolean;
}

export interface IProductVariant {
  size: number;
  price: number;
}
