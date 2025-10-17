import { ApiResponse } from "../../../../utils/ApiResponse";
import catchAsync from "../../../../utils/catchAsync";
import UserOrderService from "../../services/client/order.user.service";
import { Request, Response } from "express";

const userOrderService = new UserOrderService();

export default class UserOrderController {
  createOrder = catchAsync(async (req: Request, res: Response) => {
    const { addressId, couponCode } = req.body;
    const userId = req.user.id;

    const response = await userOrderService.createOrder(
      userId,
      addressId,
      couponCode ?? null
    );

    return ApiResponse.success({
      res,
      message: response.message,
      data: response.data,
    });
  });

  verifyPayment = catchAsync(async (req: Request, res: Response) => {
    const {
      orderId,
      paymentId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      preparedOrderData,
    } = req.body;
    const userId = req.user.id;
    const response = await userOrderService.verifyPayment(
      orderId,
      paymentId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      preparedOrderData
    );

    return ApiResponse.success({
      res,
      message: response.message,
    })
  });

  getAllOrders = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user.id;

    const response = await userOrderService.getAllOrders(userId);

    return ApiResponse.success({
      res,
      message: response.message,
      data: response.data,
    });
  });

  getOrderDetails = catchAsync(async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const response = await userOrderService.getOrderDetails(orderId as string);

    return ApiResponse.success({
      res,
      message: response.message,
      data: response.data,
    });
  });
}
