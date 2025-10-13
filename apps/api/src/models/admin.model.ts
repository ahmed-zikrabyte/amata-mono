import mongoose from "mongoose";
import { IAdmin } from "src/interfaces";

const AdminSchema = new mongoose.Schema<IAdmin>({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["admin"],
    default: "admin",
  },
});

export const AdminModel = mongoose.model("admins", AdminSchema);
