import Image from "next/image";
import React from "react";
import bgImage from "../../assets/images/order-success-page/bg-img.png";
import approvedImage from "../../assets/images/order-success-page/approved.png";
import { Button } from "../../../../packages/ui/src/components/button";

const OrderSuccessfulPage = () => {
  return (
    <div className="relative h-[90vh] w-screen bg-white overflow-hidden">
      {/* Background image pinned to top */}
      <div className="absolute top-0 left-0 right-0 w-screen h-2/3 sm:h-4/5 md:h-full">
        <Image
          src={bgImage}
          alt="background"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      {/* Content area */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="h-auto w-80 sm:w-110 md:w-150 lg:h-140 lg:w-200 rounded-xl flex flex-col items-center justify-center text-center space-y-5 bg-white p-10 shadow-2xl">
          <p className="text-2xl font-medium text-amber-950">Thank you!</p>
          <div className="relative h-30 w-30 md:h-40 md:w-40">
            <Image src={approvedImage} fill alt="approved" />
          </div>
          <p className="md:text-xl text-green-600 font-medium">Order placed Successfully</p>
          <p className="md:px-10 max-md:text-xs">
            We are getting started on your order right away, and you will
            receive an order confirmation email shortly to johndoe@gmail.com. In
            the meantime, explore the latest Ghee products
          </p>
          <div className="flex flex-col md:flex-row items-center max-md:space-y-3 md:space-x-3">
            <Button size={"lg"}>Explore Products</Button>
            <Button size={"lg"}
              variant={"outline"}
              className="border-primary text-primary hover:bg-primary hover:text-white duration-100"
            >
              Track Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessfulPage;
