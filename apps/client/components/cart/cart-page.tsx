import React from "react";
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
import CartItems from "./cart-items";
import { X } from "lucide-react";
import JoinOurPureLivingCommunityBanner from "../global/join-our-pure-living-banner";
import FeatureCards from "../global/feature-cards";

const CartPage = () => {
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

        <div className="flex flex-col md:flex-row space-y-5 space-x-5 py-5">
          <div className="p-4 bg-white rounded-xl w-full h-min md:w-2/3">
            <div className="flex items-center justify-between">
              <h3 className="text-xl text-amber-950 font-medium mb-2">
                Your Cart
              </h3>
              <Button
                variant={"ghost"}
                className="text-red-500 border-0 hover:text-red-600 text-sm"
              >
                <X /> Clear cart
              </Button>
            </div>
            <CartItems />
          </div>

          <div className="bg-white rounded-xl  w-full md:w-1/3">
            <div className="p-4 space-y-3">
              <p className="text-xl text-amber-950 font-medium">
                Have a coupon code?
              </p>
              <Separator />
              <div className="w-full flex items-center space-x-4">
                <Input
                  className="h-12"
                  placeholder="Enter your coupon code..."
                />
                <Button className="h-12 w-24">Apply</Button>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <p className="text-xl text-amber-950 font-medium">
                Order Summary
              </p>
              <Separator />
              <div className="space-y-3">
                <p className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Items(2)
                  </span>
                  <span>3434</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Delivery Fee
                  </span>
                  <span>3434</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Platform Fee
                  </span>
                  <span>3434</span>
                </p>
                <Separator />
                <p className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total</span>
                  <span>3434</span>
                </p>
              </div>
              <Button className="h-12 w-full">Proceed to Checkout</Button>
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
