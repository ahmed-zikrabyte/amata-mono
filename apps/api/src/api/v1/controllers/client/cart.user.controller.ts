import catchAsync from "../../../../utils/catchAsync";
import { Request, Response } from "express";
import UserCartService from "../../services/client/cart.user.service";
import { ApiResponse } from "../../../../utils/ApiResponse";

const userCartService = new UserCartService();

export default class UserCartController {
  getCart = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.id;

    const response = await userCartService.getCart(userId as string);

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });

  addToCart = catchAsync(async (req: Request, res: Response) => {
    const { productId, variantId } = req.body;
    const userId = req.user.id;
    console.log(userId);

    const response = await userCartService.addToCart(
      userId,
      productId,
      variantId
    );

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });

  updateCartQuantity = catchAsync(async (req: Request, res: Response) => {
    const { productId, variantId, action } = req.body;
    const userId = req.user.id;

    const response = await userCartService.updateCartQuantity(
      userId,
      productId,
      variantId,
      action
    );

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });

  removeFromCart = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.id;
    const { productId, variantId } = req.body;

    const response = await userCartService.removeFromCart(
      userId,
      productId,
      variantId
    );

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });
}
