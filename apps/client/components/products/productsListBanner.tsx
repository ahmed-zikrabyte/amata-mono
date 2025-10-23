import Image from "next/image";
import React from "react";
import ProductListBannerImage from "../../assets/images/banners/products-list-banner.png";
import { Button } from "../../../../packages/ui/src/components/button";

const ProductsListBanner = () => {
  return (
    <div className="relative w-full h-60 md:h-[400px] 2xl:h-[600px]">
      <Image
        src={ProductListBannerImage}
        fill
        alt="banner"
        className="object-cover object-top"
      />
      <div className="absolute h-full w-full md:w-1/2 p-5 md:p-20 flex flex-col justify-center space-y-3">
        <h3 className="text-2xl md:text-5xl font-semibold text-white">
          Experience Nature's Finest Collection
        </h3>
        <h6 className="text-sm md:text-lg font-medium text-white">
          Shop premium A2 ghee, raw honey, and cold-pressed oils — pure,
          traditional, and trusted.
        </h6>
        <div className="flex items-center space-x-5">
          <Button>Explore Products</Button>
          <Button className="bg-white text-black">View Offers</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductsListBanner;
