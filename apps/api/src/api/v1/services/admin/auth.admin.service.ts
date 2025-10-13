import jwt, { SignOptions } from "jsonwebtoken";
import config from "../../../../config";
import { HTTP } from "../../../../config/http-status.config";
import { AdminModel } from "../../../../models/admin.model";
import { ServiceResponse } from "../../../../typings";
import AppError from "../../../../utils/AppError";
import {
  comparePassword,
  hashPassword,
} from "../../../../utils/hashingPassword";

export default class AdminAuthService {
  registerAdmin = async (email: string, password: string): ServiceResponse => {
    try {
      if (!email || !password) {
        throw new AppError("Input fields required", HTTP.BAD_REQUEST);
      }

      const adminCheck = await AdminModel.findOne({ email });
      if (adminCheck) {
        throw new AppError(
          "Admin with the same email exists",
          HTTP.BAD_REQUEST
        );
      }

      const hashedPassword = await hashPassword(password);
      const newAdmin = new AdminModel({
        email,
        password: hashedPassword,
        role: "admin",
      });

      await newAdmin.save();

      const token = await signToken(newAdmin._id.toString(), newAdmin.role);

      return {
        message: "Admin registered successfully",
        data: {
          token,
        },
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      throw error;
    }
  };

  loginAdmin = async (email: string, password: string): ServiceResponse => {
    try {
      if (!email || !password) {
        throw new AppError("Input fields required", HTTP.BAD_REQUEST);
      }

      const adminCheck = await AdminModel.findOne({ email });
      console.log({ adminCheck });
      if (!adminCheck) {
        throw new AppError("Admin not found", HTTP.BAD_REQUEST);
      }
      const passwordCheck = await comparePassword(
        password,
        adminCheck.password
      );
      if (!passwordCheck) {
        throw new AppError("Invalid credentials", HTTP.BAD_REQUEST);
      }

      const token = await signToken(adminCheck._id.toString(), adminCheck.role);

      return {
        message: "Admin login successfull",
        data: {
          token,
        },
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      throw error;
    }
  };
}

const signToken = (id: string, role: "admin" | "client") => {
  const secret = role === "admin" ? config.adminJwt.secret : config.jwt.secret;
  const expiresIn =
    role === "admin" ? config.adminJwt.expiresIn : config.jwt.expiresIn;

  const options: SignOptions = {
    expiresIn: expiresIn as any,
  };

  return jwt.sign({ id, role }, secret as string, options);
};
