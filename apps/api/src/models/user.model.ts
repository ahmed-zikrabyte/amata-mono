import mongoose from "mongoose";
import { IUser } from "../interfaces";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const USER_DB_REF = "users";
export const UserModel = mongoose.model(USER_DB_REF, userSchema);
