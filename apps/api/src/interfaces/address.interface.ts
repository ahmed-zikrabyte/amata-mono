import mongoose from "mongoose";

export interface IAddress {
  userId: mongoose.Types.ObjectId;
  isDefault: boolean;
  addressType: "home" | "work" | "other";
  fullName: string;
  phoneNumber: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  landmark?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
