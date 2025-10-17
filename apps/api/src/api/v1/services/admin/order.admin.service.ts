import { HTTP } from "../../../../config/http-status.config";
import { OrderModel } from "../../../../models/order.model";
import { ServiceResponse } from "../../../../typings";
import AppError from "../../../../utils/AppError";

export default class AdminOrderService {
  getAllOrders = async (
  page: number,
  limit: number,
  search?: string,
  fromDate?: string,
  toDate?: string
): ServiceResponse => {
  try {
    const skip = (page - 1) * limit;

    // Build dynamic query
    const query: any = {};

    // 🔍 Search filter
    if (search && search.length > 0) {
      query.orderId = { $regex: search, $options: "i" };
    }

    // 📅 Date range filter
    if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);

      // Move end date to the end of the day (so we include all orders from that date)
      end.setHours(23, 59, 59, 999);

      query.createdAt = { $gte: start, $lte: end };
    } else if (fromDate) {
      const start = new Date(fromDate);
      query.createdAt = { $gte: start };
    } else if (toDate) {
      const end = new Date(toDate);
      end.setHours(23, 59, 59, 999);
      query.createdAt = { $lte: end };
    }

    // 🧩 Fetch orders with pagination + populate
    const [orders, totalOrders] = await Promise.all([
      OrderModel.find(query)
        .skip(skip)
        .limit(limit)
        .populate("items.productId")
        .sort({ createdAt: -1 }), // latest first
      OrderModel.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalOrders / limit);

    return {
      data: {
        orders,
        pagination: {
          page,
          limit,
          total: totalOrders,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
      message: "Orders fetched successfully",
      status: HTTP.OK,
      success: true,
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
  }
};


  getOneOrder = async (orderId: string): ServiceResponse => {
    try {
      if (!orderId) {
        throw new AppError("Order id is required", HTTP.BAD_REQUEST);
      }

      const order = await OrderModel.findOne({ orderId });
      if (!order) {
        throw new AppError("Order not found", HTTP.NOT_FOUND);
      }

      return {
        data: order,
        message: "Order fetched successfully",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };
}
