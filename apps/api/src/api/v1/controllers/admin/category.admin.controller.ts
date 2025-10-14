import catchAsync from "../../../../utils/catchAsync";
import { Request, Response } from "express";
import AdminCategoryService from "../../services/admin/category.admin.service";
import { ApiResponse } from "../../../../utils/ApiResponse";

const adminCategoryService = new AdminCategoryService();

export default class AdminCategoryController {
  getAllCategories = catchAsync(async (req: Request, res: Response) => {
    const { page, limit, search } = req.query;

    const response = await adminCategoryService.getAllCategories(
      Number(page) || 1,
      Number(limit) || 10,
      search as string
    );

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });

  getCategory = catchAsync(async (req: Request, res: Response) => {
    const slug = req.params.slug;
    const response = await adminCategoryService.getCategory(slug as string);
    return ApiResponse.success({
      res,
      message: response.message,
      data: response.data,
      statusCode: response.status,
    });
  });

  createCategory = catchAsync(async (req: Request, res: Response) => {
    const { name } = req.body;
    const image = req.file as Express.Multer.File;

    const response = await adminCategoryService.createCategory(name, image);

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });

  updateCategory = catchAsync(async (req: Request, res: Response) => {
    const slug = req.params.slug;
    const { name } = req.body;

    const image = req.file as Express.Multer.File;

    const response = await adminCategoryService.updateCategory(
      slug as string,
      name,
      image
    );

    return ApiResponse.success({
      res,
      message: response.message,
      data: response.data,
      statusCode: response.status,
    });
  });

  toggleCategoryStatus = catchAsync(async (req: Request, res: Response) => {
    const slug = req.params.slug;
    const response = await adminCategoryService.toggleCategoryStatus(
      slug as string
    );
    return ApiResponse.success({
      res,
      message: response.message,
      data: response.data,
      statusCode: response.status,
    });
  });

  deleteCategory = catchAsync(async (req: Request, res: Response) => {
    const slug = req.params.slug;
    const response = await adminCategoryService.deleteCategory(slug as string);
    return ApiResponse.success({
      res,
      message: response.message,
      data: response.data,
      statusCode: response.status,
    });
  });
}
