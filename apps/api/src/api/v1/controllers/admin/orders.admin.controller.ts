import catchAsync from "../../../../utils/catchAsync";
import { Request, Response } from "express";
import AdminOrderService from "../../services/admin/order.admin.service";
import { ApiResponse } from "../../../../utils/ApiResponse";

const adminOrderService = new AdminOrderService();

export default class AdminOrderController {
  getAllOrders = catchAsync(async (req: Request, res: Response) => {
    const { page, limit, search, fromDate, toDate } = req.query;

    const response = await adminOrderService.getAllOrders(
      Number(page),
      Number(limit),
      search as string,
      fromDate as string,
      toDate as string,
    );

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });

  getOneOrder = catchAsync(async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const response = await adminOrderService.getOneOrder(orderId as string);

    return ApiResponse.success({
      res,
      data: response.data,
      message: response.message,
    });
  });
}
