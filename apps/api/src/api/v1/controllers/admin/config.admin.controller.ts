import catchAsync from "../../../../utils/catchAsync";
import { Request, Response } from "express";
import AdminConfigService from "../../services/admin/config.admin.service";
import { ApiResponse } from "../../../../utils/ApiResponse";

const adminConfigService = new AdminConfigService();

export default class AdminConfigController {
  getConfig = catchAsync(async (req: Request, res: Response) => {
    const response = await adminConfigService.getConfig();

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });

  createConfig = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;

    const response = await adminConfigService.createConfig(data);

    return ApiResponse.created({
      res,
      message: response.message,
    });
  });

  updateConfig = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;

    const response = await adminConfigService.updateConfig(data);

    return ApiResponse.success({
      res,
      message: response.message,
    });
  });
}
