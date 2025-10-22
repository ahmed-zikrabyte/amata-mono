import React from "react";
import { LiaCertificateSolid } from "react-icons/lia";
import { TbTruckDelivery } from "react-icons/tb";
import { TbTruckReturn } from "react-icons/tb";

const FeatureCards = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-evenly py-10 max-md:space-y-7">
      <Cards
        title="Lab Certified"
        description="All product tested for purity and quality"
        logo={<LiaCertificateSolid className="size-8 -rotate-12" />}
      />
      <Cards
        title="Free Shipping"
        description="Free delivery on order above 1000"
        logo={<TbTruckDelivery className="size-8" />}
      />
      <Cards
        title="Easy Returns"
        description="7-day hassle free return policy"
        logo={<TbTruckReturn className="size-8" />}
      />
    </div>
  );
};

export default FeatureCards;

const Cards = ({
  title,
  description,
  logo,
}: {
  title: string;
  description: string;
  logo: any;
}) => {
  return (
    <div className="h-20 w-60 rounded-lg shadow-lg shadow-[#542d182c] p-3 flex items-center justify-between">
      <div className="h-17 w-17 rounded-full bg-[#542D18]/20 flex items-center justify-center shrink-0">
        {logo}
      </div>
      <div className="w-2/3 space-y-1">
        <p className="text-sm">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
};
