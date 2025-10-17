import mongoose from "mongoose";

export interface IItems {
  productId: mongoose.Types.ObjectId;
  productName: string;
  variant: {
    _id: string;
    size: string;
    price: number;
  };
  slug: string;
  images: string[];
  quantity: number;
  totalPrice: number;
  unitPrice: number;
}

export interface IOrderAddress {
  addressType: "home" | "work" | "other";
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface IOrder {
  orderId: string;
  userId: mongoose.Types.ObjectId;
  status: "order_placed" | "pickup_scheduled" | "delivered";
  items: IItems[];
  totalAmount: number;
  paymentMethod: "razorpay" | "cod";
  paymentStatus: "pending" | "failed" | "success";
  address: IOrderAddress;
  createdAt: Date;
  coupon?: {
    code: string;
    discountAmount: number;
  };
  gst: number;
}
