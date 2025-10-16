import mongoose from "mongoose";
import { HTTP } from "../../../../config/http-status.config";
import { CartModel } from "../../../../models/cart.model";
import { ServiceResponse } from "../../../../typings";
import AppError from "../../../../utils/AppError";

export default class UserCartService {
  getCart = async (userId: string): ServiceResponse => {
    try {
      if (!userId) {
        throw new AppError("User id is required", HTTP.BAD_REQUEST);
      }

      const cart = await CartModel.findOne({ userId });

      return {
        data: cart || {},
        message: "Cart fetched successfully",
        status: HTTP.OK,
        success: true,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };

  addToCart = async (
    userId: string,
    productId: string,
    variantId: string
  ): ServiceResponse => {
    try {
      if (!userId || !productId || !variantId) {
        throw new AppError("Inputs required", HTTP.BAD_REQUEST);
      }

      let cart = await CartModel.findOne({ userId });
      if (!cart) {
        cart = await CartModel.create({
          userId,
          items: [
            {
              product: productId,
              variant: variantId,
              quantity: 1,
            },
          ],
        });

        return {
          success: true,
          message: "Cart created and item added",
          status: HTTP.OK,
          data: cart,
        };
      }

      const existingItem = cart.items.find(
        (item) =>
          item.product.toString() === productId &&
          item.variant.toString() === variantId
      );

      if (existingItem) {
        // Increment quantity
        existingItem.quantity += 1;
      } else {
        // Add as new item
        cart.items.push({
          product: new mongoose.Types.ObjectId(productId),
          variant: new mongoose.Types.ObjectId(variantId),
          quantity: 1,
        });
      }

      await cart.save();

      return {
        success: true,
        message: existingItem
          ? "Quantity updated in cart"
          : "New item added to cart",
        data: cart,
        status: HTTP.OK,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };

  updateCartQuantity = async (
    userId: string,
    productId: string,
    variantId: string,
    action: "increment" | "decrement"
  ): ServiceResponse => {
    try {
      const cart = await CartModel.findOne({ userId });
      if (!cart) throw new AppError("Cart not found", HTTP.NOT_FOUND);

      const item = cart.items.find(
        (i) =>
          i.product.toString() === productId &&
          i.variant.toString() === variantId
      );
      if (!item) throw new AppError("Item not found in cart", HTTP.NOT_FOUND);

      if (action === "increment") {
        item.quantity += 1;
      } else if (action === "decrement") {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // Remove item if quantity becomes zero
          cart.items = cart.items.filter(
            (i) =>
              !(
                i.product.toString() === productId &&
                i.variant.toString() === variantId
              )
          );
        }
      }

      await cart.save();

      return {
        success: true,
        message:
          action === "increment"
            ? "Quantity increased"
            : "Quantity decreased or item removed",
        data: cart,
        status: HTTP.OK,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };

  removeFromCart = async (
    userId: string,
    productId: string,
    variantId: string
  ): ServiceResponse => {
    try {
      const cart = await CartModel.findOne({ userId });
      if (!cart) throw new AppError("Cart not found", HTTP.NOT_FOUND);

      const itemExists = cart.items.some(
        (i) =>
          i.product.toString() === productId &&
          i.variant.toString() === variantId
      );

      if (!itemExists)
        throw new AppError("Item not found in cart", HTTP.NOT_FOUND);

      cart.items = cart.items.filter(
        (i) =>
          !(
            i.product.toString() === productId &&
            i.variant.toString() === variantId
          )
      );

      await cart.save();

      return {
        success: true,
        message: "Item removed from cart",
        data: cart,
        status: HTTP.OK,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError((error as Error).message, HTTP.INTERNAL_SERVER_ERROR);
    }
  };
}
