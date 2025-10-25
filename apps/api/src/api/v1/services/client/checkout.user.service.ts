import { HTTP } from "../../../../config/http-status.config";
import { CartModel } from "../../../../models/cart.model";
import { ServiceResponse } from "../../../../typings";
import AppError from "../../../../utils/AppError";

export default class UserCheckoutService {
  getCheckout = async (userId: string): ServiceResponse => {
    try {
      if (!userId) {
        throw new AppError("User id is required", HTTP.BAD_REQUEST);
      }

      const cart = await CartModel.findOne({ userId }).populate(
        "items.product"
      );

      if (!cart) {
        throw new AppError("Cart not found", HTTP.NOT_FOUND);
      }

      if (cart.items.length === 0) {
        throw new AppError("No items in cart", HTTP.NOT_FOUND);
      }

      // Calculate total amount
      let totalAmount = 0;
      const itemsWithPrice = cart.items.map((item: any) => {
        // Find the matching variant in the product's variants array
        const selectedVariant = item.product.variants.find(
          (v: any) => v._id.toString() === item.variant.toString()
        );

        if (!selectedVariant) {
          throw new AppError(
            `Variant not found for product ${item.product.name}`,
            HTTP.BAD_REQUEST
          );
        }

        const itemTotal = selectedVariant.price * item.quantity;
        totalAmount += itemTotal;

        return {
          product: item.product,
          productName: item.product.name,
          variantId: selectedVariant._id,
          size: selectedVariant.size,
          price: selectedVariant.price,
          quantity: item.quantity,
          itemTotal: itemTotal,
        };
      });

      console.log("Checkout Details:", {
        items: itemsWithPrice,
        totalAmount,
      });

      return {
        data: {
          // cart,
          items: itemsWithPrice,
          totalAmount,
        },
        message: "Checkout success",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };
}