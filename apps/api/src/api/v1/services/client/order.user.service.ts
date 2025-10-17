import mongoose from "mongoose";
import { HTTP } from "../../../../config/http-status.config";
import { IOrder } from "../../../../interfaces";
import { AddressModel } from "../../../../models/address.model";
import { CartModel } from "../../../../models/cart.model";
import { ConfigModel } from "../../../../models/config.model";
import { UserModel } from "../../../../models/user.model";
import { ServiceResponse } from "../../../../typings";
import AppError from "../../../../utils/AppError";
import { OrderModel } from "../../../../models/order.model";
import crypto from "crypto";
import createOrder from "../../../../utils/razorpay";

export default class UserOrderService {
  createOrder = async (
    userId: string,
    addressId: string,
    couponCode: string | null
  ): ServiceResponse => {
    try {
      if (!userId || !addressId) {
        throw new AppError(
          "User is and address id is required",
          HTTP.BAD_REQUEST
        );
      }

      const user = await UserModel.findById(userId);
      if (!user) {
        throw new AppError("User not found", HTTP.NOT_FOUND);
      }

      const address = await AddressModel.findById(addressId).lean();
      if (!address) {
        throw new AppError("Address not found", HTTP.NOT_FOUND);
      }

      const config = await ConfigModel.findOne();
      if (!config) {
        throw new AppError("Config not found", HTTP.NOT_FOUND);
      }

      const cart = await CartModel.findOne({ userId }).populate(
        "items.product"
      );
      if (!cart) {
        throw new AppError("Cart not found", HTTP.NOT_FOUND);
      }

      if (cart.items.length === 0) {
        throw new AppError("Cart items empty", HTTP.FORBIDDEN);
      }

      const itemsToOrder: any[] = [];

      cart.items.forEach((item: any) => {
        const product = item.product;
        const variant = item.variant;
        const quantity = item.quantity;
        console.log({ product });

        const matchedVariant = product.variants.find(
          (v: any) => v._id.toString() === variant.toString()
        );

        if (!matchedVariant) {
          throw new Error(
            `Variant ${variant} not found in product ${product._id}`
          );
        }

        if (product.isActive) {
          const unitPrice =
            matchedVariant.price -
            matchedVariant.price * (config.globalDiscount / 100);

          const existingItem = itemsToOrder.find(
            (i) =>
              i.productId.toString() === product._id.toString() &&
              i.variant._id.toString() === matchedVariant._id.toString()
          );

          console.log({ existingItem });

          if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.totalPrice =
              existingItem.unitPrice * existingItem.quantity;
          } else {
            itemsToOrder.push({
              productId: product._id,
              productName: product.name,
              images: product.images,
              slug: product.slug,
              variant: matchedVariant,
              quantity,
              unitPrice,
              totalPrice: unitPrice * quantity,
            });
          }
        }
      });

      const preparedOrder: IOrder = {
        items: itemsToOrder,
        address: {
          fullName: address.fullName,
          phoneNumber: address.phoneNumber,
          addressLine1: address.addressLine1,
          addressLine2: address.addressLine2 || "",
          addressType: address.addressType as "home" | "work" | "other",
          city: address.city,
          postalCode: address.postalCode,
          state: address.state,
          landmark: address.landmark || "",
        },
        createdAt: new Date(),
        userId: new mongoose.Types.ObjectId(userId),
        orderId: "order-id",
        status: "order_placed",
        paymentMethod: "razorpay",
        paymentStatus: "pending",
        totalAmount: itemsToOrder.reduce((a, b) => a + b.totalPrice, 0),
        gst: 0,
      };

      console.log({ preparedOrder });

      // const newOrder = new OrderModel(preparedOrder);
      // await newOrder.save();

      const razorpayOrder = await createOrder(
        preparedOrder.totalAmount,
        preparedOrder.orderId
      );

      if (!razorpayOrder) {
        throw new AppError("Razorpay failed", HTTP.INTERNAL_SERVER_ERROR);
      }
      return {
        message: "Order success",
        data: {
          order: preparedOrder,
          razorpayOrder,
        },
        status: HTTP.CREATED,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };

  verifyPayment = async (
    orderId: string,
    paymentId: string,
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string,
    userId: string,
    preparedOrderData: IOrder
  ): ServiceResponse => {
    const session = await mongoose.startSession();
    console.log({
      orderId,
      paymentId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      preparedOrderData,
    });

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      // order.paymentStatus = "failed";
      // order.status = "failed";
      // await order.save({ session });

      // await session.commitTransaction();
      // session.endSession();

      throw new AppError("Invalid payment signature", HTTP.UNAUTHORIZED);
    }

    const config = await ConfigModel.findOne();
    const gst = config?.gst;

    const newOrder = new OrderModel({
      ...preparedOrderData,
      userId: preparedOrderData.userId,
      address: preparedOrderData.address,
      orderId: preparedOrderData.orderId,
      totalAmount: preparedOrderData.totalAmount,
      paymentId,
      status: "order_placed",
      paymentStatus: "success",
      gst,
    });

    await newOrder.save({ session });

    const order = await OrderModel.findById(newOrder._id)
      .populate("userId")
      .session(session);

    if (!order) {
      throw new AppError("Order not found", HTTP.NOT_FOUND);
    }

    // ✅ Clear cart
    await CartModel.deleteOne({ userId });

    return {
      message: "success",
      status: HTTP.OK,
      success: true,
    };
  };

  getAllOrders = async (userId: string): ServiceResponse => {
    try {
      if (!userId) {
        throw new AppError("User id is required", HTTP.BAD_REQUEST);
      }

      const orders = await OrderModel.find({ userId }).lean();

      return {
        data: orders,
        message: "Orders fetched successful",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };

  getOrderDetails = async (orderId: string): ServiceResponse => {
    try {
      if (!orderId) {
        throw new AppError("Order id is required", HTTP.BAD_REQUEST);
      }

      const order = await OrderModel.findById(orderId);
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
