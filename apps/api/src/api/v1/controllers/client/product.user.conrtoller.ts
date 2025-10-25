import { ApiResponse } from "../../../../utils/ApiResponse";
import catchAsync from "../../../../utils/catchAsync";
import UserProductService from "../../services/client/product.user.service";
import { Request, Response } from "express";

const userProductService = new UserProductService();

export default class UserProductController {
  getAllProducts = catchAsync(async (req: Request, res: Response) => {
    const { page, limit, search, category } = req.query;
    console.log(req.query)

    const response = await userProductService.getAllProducts(
      Number(page) || 1,
      Number(limit) || 10,
      search as string,
      category as string
    );

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });

  getOneProduct = catchAsync(async (req: Request, res: Response) => {
    const { slug } = req.params;

    const response = await userProductService.getOneProduct(slug as string);

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });
}
