import catchAsync from "../../../../utils/catchAsync";
import { Request, Response } from "express";
import AdminContactUsService from "../../services/admin/contact-us.admin.service";
import { ApiResponse } from "../../../../utils/ApiResponse";

const adminContactUsService = new AdminContactUsService();

export default class AdminContactUsController {
  getContacts = catchAsync(async (req: Request, res: Response) => {
    const { page, limit, search } = req.query;

    const response = await adminContactUsService.getContacts(
      Number(page) || 1,
      Number(limit) || 10,
      (search as string) || ""
    );

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });
}
