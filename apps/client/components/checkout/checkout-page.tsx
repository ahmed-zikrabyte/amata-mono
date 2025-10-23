"use client";

import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import { Separator } from "@workspace/ui/components/separator";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Plus } from "lucide-react";
import Image from "next/image";
import productimage from "../../assets/images/image-product.png";
import OrderSuccessfulPage from "./order-successful-page";
import AddressAddForm from "../address-form/address-add-form";

const CheckoutPage = () => {
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [showAddAddressSection, setShowAddAddressSection] = useState(false);

  if (isOrderSuccess) {
    return <OrderSuccessfulPage />;
  }
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
              <BreadcrumbLink href="/cart">Cart</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Checkout</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col md:flex-row space-y-5 space-x-5 py-5">
          <div className="p-4 bg-white rounded-xl w-full h-min md:w-2/3">
            <div className="flex items-center justify-between pb-2">
              <h3 className=" text-amber-950 font-medium">Shipping address</h3>
              <Button
                className="text-amber-950"
                variant={"ghost"}
                type="button"
                onClick={() => setShowAddAddressSection((prev) => !prev)}
              >
                {!showAddAddressSection ? (
                  <>
                    <Plus /> Add Address
                  </>
                ) : (
                  <>Cancel</>
                )}
              </Button>
            </div>
            <Separator />
            {showAddAddressSection ? (
              <AddressAddForm setShowForm={setShowAddAddressSection} />
            ) : (
              <div className="text-center p-4 text-gray-600">
                No addresses added
              </div>
            )}
          </div>

          <div className=" rounded-xl space-y-5 w-full md:w-1/3">
            <div className="p-4 space-y-3 bg-white">
              <p className="text-xl text-amber-950 font-medium">Your cart</p>
              <Separator />
              <div className="w-full flex items-center justify-between">
                <div className="relative h-14 w-14 rounded-lg shrink-0">
                  <Image
                    src={productimage}
                    fill
                    alt=""
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <p className="text-sm">Gir Cow Ghee</p>
                  <p className="text-xs space-x-1 text-gray-600">
                    <span>Weight: 500 gm</span>
                    <span className="border-l-2 pl-1">Qty: 3</span>
                  </p>
                </div>
                <p className="">1699</p>
              </div>
              <div className="w-full flex items-center justify-between">
                <div className="relative h-14 w-14 rounded-lg shrink-0">
                  <Image
                    src={productimage}
                    fill
                    alt=""
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <p className="text-sm">Gir Cow Ghee</p>
                  <p className="text-xs space-x-1 text-gray-600">
                    <span>Weight: 500 gm</span>
                    <span className="border-l-2 pl-1">Qty: 3</span>
                  </p>
                </div>
                <p className="">1699</p>
              </div>
              <div className="w-full flex items-center space-x-4">
                <Input
                  className="h-12"
                  placeholder="Enter your coupon code..."
                />
                <Button className="h-12 w-24">Apply</Button>
              </div>
            </div>

            <div className="p-4 space-y-3 bg-white">
              <p className="text-xl text-amber-950 font-medium">
                Price details
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
              <Button className="h-12 w-full">Proceed to Payment</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
