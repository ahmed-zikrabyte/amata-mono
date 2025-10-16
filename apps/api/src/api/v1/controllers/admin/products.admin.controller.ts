import catchAsync from "../../../../utils/catchAsync";
import { Request, Response } from "express";
import AdminProductService from "../../services/admin/products.admin.service";
import { ApiResponse } from "../../../../utils/ApiResponse";

const adminProductService = new AdminProductService();

export default class AdminProductController {
  getAllProducts = catchAsync(async (req: Request, res: Response) => {
    const { page, limit, search } = req.query;

    const response = await adminProductService.getAllProducts(
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

  getProduct = catchAsync(async (req: Request, res: Response) => {
    const { slug } = req.params;

    const response = await adminProductService.getProduct(slug as string);

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });

  createProduct = catchAsync(async (req: Request, res: Response) => {
    const {
      name,
      description,
      variants,
      category,
      ingredients,
      nutritionInformation,
      storageInfo,
      whyYouShouldUseThis,
      suggestedUse,
    } = req.body;
    const images = req.files as Express.Multer.File[];

    const response = await adminProductService.createProduct(
      name,
      description,
      variants,
      category,
      ingredients,
      nutritionInformation,
      storageInfo,
      suggestedUse,
      whyYouShouldUseThis,
      images
    );

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });

  updateProduct = catchAsync(async (req: Request, res: Response) => {
    const {slug} = req.params;
     const {
      name,
      description,
      variants,
      category,
      ingredients,
      nutritionInformation,
      storageInfo,
      whyYouShouldUseThis,
      suggestedUse,
      deletedImages
    } = req.body;
    const images = req.files as Express.Multer.File[];

    const response = await adminProductService.updateProduct(
      name,
      description,
      slug as string,
      variants,
      category,
      ingredients,
      nutritionInformation,
      storageInfo,
      suggestedUse,
      whyYouShouldUseThis,
      images,
      deletedImages
    );

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  })

  toggleProductStatus = catchAsync(async (req: Request, res: Response) => {
    const { slug } = req.params;

    const response = await adminProductService.toggleProductStatus(
      slug as string
    );

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });

  deleteProduct = catchAsync(async (req: Request, res: Response) => {
    const { slug } = req.params;

    const response = await adminProductService.deleteProduct(slug as string);

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });
}
