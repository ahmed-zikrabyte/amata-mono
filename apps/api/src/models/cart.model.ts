import mongoose from "mongoose";
import { ICart } from "../interfaces";
import { USER_DB_REF } from "./user.model";
import { PRODUCT_DB_REF } from "./product.model";

const CartSchema = new mongoose.Schema<ICart>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: USER_DB_REF,
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: PRODUCT_DB_REF,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      variant: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
    },
  ],
});

export const CART_DB_REF = "carts";
export const CartModel = mongoose.model(CART_DB_REF, CartSchema);
