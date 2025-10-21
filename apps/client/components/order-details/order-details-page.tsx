import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import { Check, ChevronRight, Dot } from "lucide-react";
import Image from "next/image";
import ProductImage from "../../assets/images/image-product.png";
import { Button } from "@workspace/ui/components/button";
import { Separator } from "@workspace/ui/components/separator";

const OrderDetailsPage = () => {
  return (
    <div className="w-full lg:pr-20 space-y-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/profile?tab=orders">Orders</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Orders</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="bg-white rounded-xl p-3 flex flex-col md:flex-row md:items-center justify-between max-md:space-y-2">
        <div>
          <p>Am-938493</p>
          <p>Size- 2</p>
        </div>
        <p>Estimated Arrival: {new Date().toDateString()}</p>
      </div>

      <div className="space-y-5">
        <h4>Items order and delivery details</h4>
        <div className="grid grid-cols-4 lg:grid-cols-7 justify-between text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="rounded-full bg-amber-950 h-7 w-7 flex items-center justify-center text-white p-1">
              <Check />
            </div>
            <p className="text-sm mt-1">Order comfirmed</p>
          </div>
          <div className="flex items-center flex-shrink-0">
            <Dot className="-mr-2" />
            <div className="border-dashed w-20  border-1 border-black" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="rounded-full bg-amber-950 h-7 w-7 flex items-center justify-center text-white p-1">
              <Check />
            </div>
            <p className="text-sm mt-1">Order shipped</p>
          </div>
          <div className="flex items-center flex-shrink-0">
            <div className="border-dashed w-20  border-1 border-black" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="rounded-full bg-amber-950 h-7 w-7 flex items-center justify-center text-white p-1">
              <Check />
            </div>
            <p className="text-sm mt-1">Out for delivery</p>
          </div>
          <div className="flex items-center flex-shrink-0">
            <div className="border-dashed w-20 border-1 border-black" />
            <ChevronRight className="size-4 -ml-1" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="rounded-full bg-amber-950 h-7 w-7 flex items-center justify-center text-white p-1">
              <Check />
            </div>
            <p className="text-sm mt-1">Delivery</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row space-x-5">
          <div className="p-4 bg-white rounded-xl w-full md:w-3/5 space-y-5 h-min">
            <p>Items</p>
            <div className="flex items-center rounded-lg border-2">
              <div className="relative h-30 w-30 rounded-lg shrink-0">
                <Image
                  src={ProductImage}
                  fill
                  alt="Product image"
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between ml-3 w-full">
                <div className="flex flex-col items-start">
                  <p>Gir cow A2 ghee</p>
                  <p>Weight: 510 ml</p>
                  <p>849.00</p>
                </div>
                <Button variant={"link"}>Cancel</Button>
              </div>
            </div>

            <div className="flex items-center rounded-lg border-2">
              <div className="relative h-30 w-30 rounded-lg shrink-0">
                <Image
                  src={ProductImage}
                  fill
                  alt="Product image"
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between ml-3 w-full">
                <div className="flex flex-col items-start">
                  <p>Gir cow A2 ghee</p>
                  <p>Weight: 510 ml</p>
                  <p>849.00</p>
                </div>
                <Button variant={"link"}>Cancel</Button>
              </div>
            </div>
          </div>

          <div className="w-2/5 space-y-5">
            <div className="p-4 bg-white rounded-xl space-y-2">
              <p className="font-medium mb-2">Delivery Details</p>
              <p className="text-sm text-gray-600">12, Jayanagar, Bangalore, Karnataka</p>
              <p className="text-sm text-gray-600">+91 9999999999</p>
            </div>
            <div className="p-4 bg-white rounded-xl space-y-3">
              <p className="text-lg text-amber-950 font-medium">Payment Details</p>
              <Separator />
              <p className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Items(2)</span>
                <span>3434</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Delivery Fee</span>
                <span>3434</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Platform Fee</span>
                <span>3434</span>
              </p>
              <Separator />
              <p className="flex items-center justify-between">
                <span className="text-sm font-medium">Total</span>
                <span>3434</span>
              </p>
              <p className="text-xs">Paid using credit card</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
