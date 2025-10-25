import { ApiResponse } from "../../../../utils/ApiResponse";
import catchAsync from "../../../../utils/catchAsync";
import UserCheckoutService from "../../services/client/checkout.user.service";
import { Request, Response } from "express";

const userCheckoutService = new UserCheckoutService();

export default class UserCheckoutController {
  getCheckout = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.id;

    const response = await userCheckoutService.getCheckout(userId);

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });
}
