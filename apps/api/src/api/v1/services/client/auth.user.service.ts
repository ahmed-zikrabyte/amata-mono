import jwt, { SignOptions } from "jsonwebtoken";
import config from "../../../../config";
import { HTTP } from "../../../../config/http-status.config";
import { OtpModel } from "../../../../models/otp.model";
import { UserModel } from "../../../../models/user.model";
import { ServiceResponse } from "../../../../typings";
import AppError from "../../../../utils/AppError";
import generateOTP from "../../../../utils/generateOtp";

export default class UserAuthService {
  register = async (
    name: string,
    email: string,
    phone: string
  ): ServiceResponse => {
    try {
      if (!name || !phone || !email) {
        throw new AppError("Inputs required", HTTP.BAD_REQUEST);
      }

      const checkUser = await UserModel.findOne({ email, phone });
      if (checkUser) {
        throw new AppError("User aleady exists", HTTP.OK);
      }

      console.log({ phone, email });
      const otp = await generateOTP(4);
      await OtpModel.create({
        email,
        otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      });

      return {
        message: "OTP send successfully",
        data: { phone, email, otp },
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };

  registerVerify = async (
    name: string,
    email: string,
    phone: string,
    otp: string
  ): ServiceResponse => {
    try {
      if (!name || !email || !phone || !otp) {
        throw new AppError("Inputs required", HTTP.BAD_REQUEST);
      }

      const emailCheck = await UserModel.findOne({ email });
      if (emailCheck) {
        throw new AppError("Email already exists", HTTP.BAD_REQUEST);
      }
      const otpData = await OtpModel.findOne({ email }).sort({ createdAt: -1 });
      if (!otpData) {
        throw new AppError("OTP not found or expired", HTTP.NOT_FOUND);
      }
      // ✅ check expiry
      if (otpData.expiresAt && otpData.expiresAt.getTime() < Date.now()) {
        await OtpModel.deleteMany({ email }); // cleanup
        throw new AppError("OTP expired", HTTP.BAD_REQUEST);
      }

      if (otp !== otpData.otp) {
        throw new AppError(
          "Incorret OTP, enter another one or resend",
          HTTP.BAD_REQUEST
        );
      }

      const newUser = new UserModel({
        email,
        phone,
        name,
      });

      await newUser.save();

      const token = await signToken(newUser._id.toString(), "client");

      return {
        message: "User verified successfully",
        data: {
          token,
        },
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };

  login = async (email: string): ServiceResponse => {
    try {
      if (!email) {
        throw new AppError("Inputs required", HTTP.BAD_REQUEST);
      }

      const userCheck = await UserModel.findOne({ email });
      if (!userCheck) {
        throw new AppError("User not found", HTTP.BAD_REQUEST);
      }

      const otp = await generateOTP(4);
      await OtpModel.create({
        email,
        otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      });

      return {
        message: "Success",
        data: { email, otp },
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };

  loginVerify = async (email: string, otp: string): ServiceResponse => {
    try {
      if (!email || !otp) {
        throw new AppError("Inputs required", HTTP.BAD_REQUEST);
      }

      const userCheck = await UserModel.findOne({ email });
      if (!userCheck) {
        throw new AppError("User not found with this email", HTTP.NOT_FOUND);
      }

      const otpData = await OtpModel.findOne({ email }).sort({ createdAt: -1 });
      if (!otpData) {
        throw new AppError("OTP not found or expired", HTTP.NOT_FOUND);
      }
      // ✅ check expiry
      if (otpData.expiresAt && otpData.expiresAt.getTime() < Date.now()) {
        await OtpModel.deleteMany({ email }); // cleanup
        throw new AppError("OTP expired", HTTP.BAD_REQUEST);
      }

      if (otp !== otpData.otp) {
        throw new AppError(
          "Incorret OTP, enter another one or resend",
          HTTP.BAD_REQUEST
        );
      }

      const token = await signToken(userCheck._id.toString(), "client");

      return {
        data: {
          token,
        },
        message: "OTP verification successful",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
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
