import catchAsync from "../../../../utils/catchAsync";
import { Request, Response } from "express";
import UserAuthService from "../../services/client/auth.user.service";
import { ApiResponse } from "../../../../utils/ApiResponse";

const userAuthService = new UserAuthService();

export default class UserAuthController {
  register = catchAsync(async (req: Request, res: Response) => {
    const { fullName, phone, email } = req.body;

    const response = await userAuthService.register(fullName, email, phone);

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });

  registerVerify = catchAsync(async (req: Request, res: Response) => {
    const { fullName, phone, email, otp } = req.body;

    const response = await userAuthService.registerVerify(
      fullName,
      email,
      phone,
      otp
    );

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });

  login = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body;

    const response = await userAuthService.login(email);

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });

  loginVerify = catchAsync(async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    const response = await userAuthService.loginVerify(email, otp);

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });
}
