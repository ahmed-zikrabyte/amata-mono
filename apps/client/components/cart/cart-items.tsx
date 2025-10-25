"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { Button } from "@workspace/ui/components/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  getCart,
  updateCart,
  removeFromCart,
  CartItem,
} from "@/lib/api/cartApi";
import { toast } from "sonner";

const CartItems: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Map to store product objects to prevent flicker
  const [productMap, setProductMap] = useState<Record<string, any>>({});

  // Fetch Cart
  async function fetchCart() {
    setLoading(true);
    try {
      const res = await getCart();
      if (res.success) {
        setCart(res.data.items);

        // Populate productMap
        const map: Record<string, any> = {};
        res.data.items.forEach((item: CartItem) => {
          if (typeof item.product !== "string") {
            map[item._id] = item.product;
          }
        });
        setProductMap(map);
      }
    } catch (err) {
      console.error("Fetch cart error:", err);
      toast.error("Failed to load cart.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  // Quantity Handler
  const handleQuantity = async (
    productId: string,
    variantId: string,
    action: "increment" | "decrement"
  ) => {
    try {
      const res = await updateCart(productId, variantId, action);
      if (res.success) {
        setCart(res.data.items);

        // Update productMap with any new product data
        const map: Record<string, any> = { ...productMap };
        res.data.items.forEach((item: CartItem) => {
          if (typeof item.product !== "string") map[item._id] = item.product;
        });
        setProductMap(map);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update cart.");
    }
  };

  // Remove Item
  const handleRemove = async (productId: string, variantId: string) => {
    try {
      const res = await removeFromCart(productId, variantId);
      if (res.success) {
        setCart(res.data.items);
        toast.success("Item removed from cart.");

        // Remove from productMap
        const map = { ...productMap };
        delete map[productId];
        setProductMap(map);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove item.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!cart.length)
    return (
      <p className="text-gray-500 text-center py-10">Your cart is empty.</p>
    );

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-right">Remove</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {cart.map((item) => {
            // Use cached product object or fallback
            const product =
              typeof item.product === "string"
                ? (productMap[item._id] ?? {
                    _id: item.product,
                    name: "Product",
                    images: [],
                  })
                : item.product;

            const variantData = product.variants?.find(
              (v: (typeof product.variants)[number]) => v._id === item.variant
            );

            const unitPrice = variantData?.price ?? item.price ?? 0;
            const totalPrice = unitPrice * item.quantity;

            const productImage =
              product.images?.[0] ?? "/placeholder-image.jpg";

            return (
              <TableRow key={item._id}>
                {/* Product Info */}
                <TableCell>
                  <div className="flex items-center gap-3 border-0">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border">
                      <Image
                        src={productImage as string}
                        alt={product.name ?? "Product Image"}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-amber-950">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Size: {variantData?.size ?? "N/A"} ml
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* Quantity */}
                <TableCell className="text-center">
                  <div className="flex items-center justify-center border border-amber-950 rounded-lg w-min">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        handleQuantity(product._id, item.variant, "decrement")
                      }
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="px-3">{item.quantity}</div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        handleQuantity(product._id, item.variant, "increment")
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>

                {/* Price */}
                <TableCell className="text-center font-medium text-amber-950">
                  ₹{totalPrice}
                </TableCell>

                {/* Remove */}
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(product._id, item.variant)}
                  >
                    <Trash2 className="text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default CartItems;
