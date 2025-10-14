import mongoose from "mongoose";
import { IOtpData } from "../interfaces";

const otpSchema = new mongoose.Schema<IOtpData>({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  otp: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
});

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const OtpModel = mongoose.model<IOtpData>("otp", otpSchema);