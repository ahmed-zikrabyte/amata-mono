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
import { Button } from "@workspace/ui/components/button";
import OrderCard from "./order-card";

const OrderSection = () => {
  const [status, setStatus] = useState<"shipped" | "delivered" | "cancelled">(
    "shipped"
  );
  return (
    <div className="w-full">
      {/* Breadcrumb - hidden on mobile, visible on md and up */}
      <div className="hidden md:block mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/profile?tab=profile">
                Profile
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>My Orders</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Mobile title - visible only on mobile */}
      <h1 className="md:hidden text-2xl font-bold px-4 mb-4">My Orders</h1>

      <div className="w-full h-full">
        {/* Filter buttons - responsive spacing and layout */}
        <div className="flex flex-wrap gap-2 md:gap-3 p-4">
          <Button
            className="rounded-full flex-shrink-0 cursor-pointer"
            variant={`${status === "shipped" ? "default" : "outline"}`}
            onClick={() => setStatus("shipped")}
          >
            On Shipping
          </Button>
          <Button
            className="rounded-full flex-shrink-0 cursor-pointer"
            variant={`${status === "delivered" ? "default" : "outline"}`}
            onClick={() => setStatus("delivered")}
          >
            Delivered
          </Button>
          <Button
            className="rounded-full flex-shrink-0 cursor-pointer"
            variant={`${status === "cancelled" ? "default" : "outline"}`}
            onClick={() => setStatus("cancelled")}
          >
            Cancelled
          </Button>
        </div>

        {/* Order cards - responsive spacing */}
        <div className="px-4 py-2">
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </div>
      </div>
    </div>
  );
};

export default OrderSection;
