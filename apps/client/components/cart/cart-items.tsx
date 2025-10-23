"use client"
import React, { useEffect, useState } from "react";
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
import { getCart, updateCart, removeFromCart, CartItem } from "../../lib/api/cartApi";

const CartItems: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCart() {
      setLoading(true);
      try {
        const res = await getCart();
        if (res.success) setCart(res.data.items);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, []);

  async function handleQuantity(
    productId: string,
    variantId: string,
    action: "increment" | "decrement"
  ) {
    const res = await updateCart(productId, variantId, action);
    if (res.success) setCart(res.data.items);
  }

  async function handleRemove(productId: string, variantId: string) {
    const res = await removeFromCart(productId, variantId);
    if (res.success) setCart(res.data.items);
  }

  if (loading) return <p>Loading...</p>;
  if (!cart.length) return <p className="text-gray-500">Your cart is empty.</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cart.map((item) => (
          <TableRow key={item._id}>
            <TableCell className="font-medium">{item.product}</TableCell>
            <TableCell>
              <div className="flex items-center p-1 rounded-lg border-2 border-amber-950 w-min">
                <Button
                  size="sm"
                  onClick={() =>
                    handleQuantity(item.product, item.variant, "decrement")
                  }
                >
                  <Minus />
                </Button>
                <div className="h-10 w-8 flex justify-center items-center">
                  {item.quantity}
                </div>
                <Button
                  size="sm"
                  onClick={() =>
                    handleQuantity(item.product, item.variant, "increment")
                  }
                >
                  <Plus />
                </Button>
              </div>
            </TableCell>
            <TableCell>{item.price || 800}</TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                onClick={() => handleRemove(item.product, item.variant)}
              >
                <Trash2 />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CartItems;
