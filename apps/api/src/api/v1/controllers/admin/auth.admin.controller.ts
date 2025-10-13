import type { Request, Response } from "express";
import AdminAuthService from "../../services/admin/auth.admin.service";
import catchAsync from "../../../../utils/catchAsync";
import { ApiResponse } from "../../../../utils/ApiResponse";

const adminAuthService = new AdminAuthService();

export default class AdminAuthController {
  registerAdmin = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const response = await adminAuthService.registerAdmin(email, password);

    return ApiResponse.created({
      res,
      data: response.data,
      message: response.message,
    });
  });

  loginAdmin = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const response = await adminAuthService.loginAdmin(email, password);

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });
}
