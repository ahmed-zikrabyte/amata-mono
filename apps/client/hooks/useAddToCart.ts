
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { addToCart } from "@/lib/api/cartApi";
import { Product } from "@/lib/types/product";

export const useAddToCart = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleAddToCart = async (product: Product) => {
    const variantId = product?.variants?.[0]?._id;
    const productId = product._id;

    if (!variantId) {
      toast.error("No variant available for this product.");
      return;
    }

    try {
      setLoading(productId);
      const res = await addToCart(productId, variantId);

      if (res?.success) {
        toast.success("Item added to cart!");
      } else {
        toast.error(res?.message || "Failed to add to cart.");
      }
    } catch (error: any) {
      console.error("Add to cart error:", error);
      toast.error(
        error.response?.status === 401
          ? "Please log in to add items to your cart."
          : "Something went wrong. Try again."
      );
    } finally {
      setLoading(null);
    }
  };

  return { handleAddToCart, loading };
};
