import mongoose from "mongoose";
import { IConfig } from "../interfaces";

export const configSchema = new mongoose.Schema<IConfig>({
  globalDiscount: { type: Number, required: true },
  gst: {
    igst: { type: Number, required: true },
    cgst: { type: Number, required: true },
    sgst: { type: Number, required: true },
  },
  contactInfo: {
    phoneNumber: { type: String },
    email: { type: String },
    address: { type: String },
    googleMapLink: { type: String },
  },
});

export const CONFIG_DB_REF = "configs";
export const ConfigModel = mongoose.model(CONFIG_DB_REF, configSchema);