import { ApiResponse } from "../../../../utils/ApiResponse";
import catchAsync from "../../../../utils/catchAsync";
import UserCategoryService from "../../services/client/cateogry.user.service";
import { Request, Response } from "express";

const userCategoryService = new UserCategoryService();

export default class UserCategoryController {
  getAllCategories = catchAsync(async (req: Request, res: Response) => {
    const response = await userCategoryService.getAllCategories();

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });
}
