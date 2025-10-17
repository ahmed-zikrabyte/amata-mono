import mongoose from "mongoose";
import { IOrder, IOrderAddress } from "../interfaces";
import { PRODUCT_DB_REF } from "./product.model";

const addressSchema = new mongoose.Schema<IOrderAddress>({
  addressType: {
    type: String,
    enum: ["home", "work", "other"],
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
    required: false,
  },
  landmark: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
});

const OrderSchema = new mongoose.Schema<IOrder>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["order_placed", "pickup_scheduled", "delivered"],
    required: true,
  },
  address: {
    type: addressSchema,
    required: true,
  },
  coupon: {
    code: {
      type: String,
      required: false,
    },
    discountAmount: {
      type: Number,
      required: false,
    },
  },
  gst: {
    type: Number,
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: PRODUCT_DB_REF,
        required: true,
      },
      productName: {
        type: String,
        required: true,
      },
      variant: {
        size: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["razorpay", "cod"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "failed", "success"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const ORDER_DB_REF = "orders";
export const OrderModel = mongoose.model(ORDER_DB_REF, OrderSchema);
