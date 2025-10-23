"use client"
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import { Separator } from "@workspace/ui/components/separator";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { X } from "lucide-react";
import CartItems from "./cart-items";
import JoinOurPureLivingCommunityBanner from "../global/join-our-pure-living-banner";
import FeatureCards from "../global/feature-cards";
import { useRouter } from "next/navigation";
import { getCart, removeFromCart, CartItem } from "../../lib/api/cartApi";

const CartPage: React.FC = () => {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);

  async function fetchCart() {
    const res = await getCart();
    if (res.success) setCart(res.data.items);
  }

  async function handleClearCart() {
    for (const item of cart) {
      await removeFromCart(item.product, item.variant);
    }
    fetchCart();
  }

  useEffect(() => {
    fetchCart();
  }, []);

  const totalItems = cart.reduce((acc, i) => acc + i.quantity, 0);
  const totalAmount = cart.reduce(
    (acc, i) => acc + (i.price || 800) * i.quantity,
    0
  );

  return (
    <div>
      <div className="py-5 px-6 lg:px-20">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Cart</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5 py-5">
          <div className="p-4 bg-white rounded-xl w-full md:w-2/3">
            <div className="flex items-center justify-between">
              <h3 className="text-xl text-amber-950 font-medium mb-2">
                Your Cart
              </h3>
              <Button
                variant="ghost"
                className="text-red-500 hover:text-red-600"
                onClick={handleClearCart}
              >
                <X /> Clear cart
              </Button>
            </div>
            <CartItems />
          </div>

          <div className="bg-white rounded-xl w-full md:w-1/3">
            <div className="p-4 space-y-3">
              <p className="text-xl text-amber-950 font-medium">
                Have a coupon code?
              </p>
              <Separator />
              <div className="flex items-center space-x-4">
                <Input className="h-12" placeholder="Enter your coupon code..." />
                <Button className="h-12 w-24">Apply</Button>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <p className="text-xl text-amber-950 font-medium">Order Summary</p>
              <Separator />
              <div className="space-y-3">
                <p className="flex justify-between text-sm text-gray-600">
                  <span>Items ({totalItems})</span>
                  <span>{totalAmount}</span>
                </p>
                <p className="flex justify-between text-sm text-gray-600">
                  <span>Delivery Fee</span>
                  <span>50</span>
                </p>
                <p className="flex justify-between text-sm text-gray-600">
                  <span>Platform Fee</span>
                  <span>10</span>
                </p>
                <Separator />
                <p className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{totalAmount + 60}</span>
                </p>
              </div>
              <Button
                className="h-12 w-full cursor-pointer"
                onClick={() => router.push("/checkout")}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <JoinOurPureLivingCommunityBanner />
      <FeatureCards />
    </div>
  );
};

export default CartPage;
