import mongoose from "mongoose";
import { IAddress } from "../interfaces";
import { USER_DB_REF } from "./user.model";

const addressSchema = new mongoose.Schema<IAddress>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: USER_DB_REF,
      required: true,
      index: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
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
  },
  {
    timestamps: true,
  }
);

export const ADDRESS_DB_REF = "addresses";
export const AddressModel = mongoose.model(ADDRESS_DB_REF, addressSchema);
