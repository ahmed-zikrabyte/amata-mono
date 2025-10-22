import React from "react";
import CustomBadge from "../global/custom-badge";
import Image from "next/image";
import ProductImage from "../../assets/images/image-product.png";
import { ChevronDown, ChevronRight, Dot } from "lucide-react";
import { Separator } from "@workspace/ui/components/separator";
import Link from "next/link";

const OrderCard = () => {
  return (
    <Link href={'/profile/order/details'}>
      <div className="w-full h-auto bg-white shadow-2xs hover:shadow-2xl duration-150 rounded-lg p-3 sm:p-5 space-y-3 mb-8">
        {/* Order ID and Status */}
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm sm:text-base font-medium truncate">AM-242423</p>
          <CustomBadge text="Shipped" type="shipped" />
        </div>

        {/* Shipping Timeline - Responsive layout */}
        <div className="flex flex-col xl:flex-row items-center xl:justify-between gap-3 lg:gap-2">
          {/* Origin */}
          <CustomBadge text="Amata ware house" type="shipped" />

          {/* Connector line - hidden on mobile, shown on lg+ */}
          <div className="flex flex-col xl:flex-row items-center flex-shrink-0">
            <Dot className="max-xl:-mb-2 xl:-mr-2" />
            <div className="border-dashed h-3 w-0 xl:h-0 xl:w-20  border-1 border-black" />
          </div>

          {/* Estimation */}
          <CustomBadge
            text={`Estimation Arrival: ${new Date().toDateString()}`}
            type="returned"
          />

          {/* Connector line - hidden on mobile, shown on lg+ */}
          <div className="flex flex-col xl:flex-row items-center flex-shrink-0">
            <div className="border-dashed h-3 w-0 xl:h-0 xl:w-20  border-1 border-black" />
            <ChevronRight className="max-xl:hidden size-4 -ml-1" />
            <ChevronDown className="xl:hidden size-4 -mt-1" />
          </div>

          {/* Destination */}
          <CustomBadge text={`1234, Bangalore`} type="cancelled" />
        </div>

        {/* Product Card */}
        <div className="h-25 sm:h-31 w-full rounded-xl bg-white border-2 flex items-center">
          <div className="relative h-24 sm:h-30 w-24 sm:w-30 flex-shrink-0">
            <Image
              src={ProductImage}
              fill
              alt="Product image"
              className="rounded-l-xl object-cover"
            />
          </div>
          <div className="flex items-center justify-between w-full px-3 sm:px-4">
            <div className="flex flex-col items-start space-y-1">
              <p className="font-medium text-sm sm:text-base text-black">
                Gir Cow A2
              </p>
              <p className="text-xs sm:text-sm text-black/90">Weight: 500g</p>
              <p className="font-semibold text-sm sm:text-base text-black">
                ₹849
              </p>
            </div>
            <ChevronRight className="text-black/80 flex-shrink-0 size-5 sm:size-6" />
          </div>
        </div>

        <Separator className="bg-gray-400" />

        {/* Footer */}
        <div className="flex items-center justify-between">
          <p className="font-medium text-sm sm:text-base">Total</p>
          <Link
            href={"/order-details"}
            className="text-amber-950 hover:text-amber-800 underline text-sm sm:text-base"
          >
            View Details
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
