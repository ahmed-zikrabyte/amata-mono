import Image from "next/image";
import React from "react";
import Cow from "../../assets/cow.png";

const WhyChoose = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row px-6 md:px-20 py-6 md:py-10 space-y-4">
      <div className="space-y-3 w-full lg:w-1/3 p-5 flex flex-col justify-center items-start">
        <h4 className="text-3xl font-medium text-amber-950">
          Why Choose <br /> Amata
        </h4>
        <p className="text-sm text-gray-600">
          When you choose Amata, you’re choosing more than just ghee — you’re
          choosing purity, tradition, and trust that comes straight from our
          family farm.
        </p>
      </div>
      <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex items-center justify-start py-3 px-5 space-x-4 rounded-md shadow-sm bg-white">
          <div className="relative h-25 w-25 shrink-0 bg-[#F2F2F2] rounded-full">
            <Image
              src={Cow.src}
              fill
              alt=""
              className="object-cover p-4 rounded-full"
            />
          </div>
          <div className="space-y-2">
            <p className="text-lg text-amber-950 font-medium">100% Farm-Made</p>
            <p className="text-xs">
              Crafted entirely on our own farm with complete control over
              quality
            </p>
          </div>
        </div>
        <div className="flex items-center justify-start py-3 px-5 space-x-4 rounded-md shadow-sm bg-white">
          <div className="relative h-25 w-25 shrink-0 bg-[#F2F2F2] rounded-full">
            <Image
              src={Cow.src}
              fill
              alt=""
              className="object-cover p-4 rounded-full"
            />
          </div>
          <div className="space-y-2">
            <p className="text-lg text-amber-950 font-medium">
              Bilona Traditional
            </p>
            <p className="text-xs">
              Ancient churning method preserves all natural nutrients
            </p>
          </div>
        </div>
        <div className="flex items-center justify-start py-3 px-5 space-x-4 rounded-md shadow-sm bg-white">
          <div className="relative h-25 w-25 shrink-0 bg-[#F2F2F2] rounded-full">
            <Image
              src={Cow.src}
              fill
              alt=""
              className="object-cover p-4 rounded-full"
            />
          </div>
          <div className="space-y-2">
            <p className="text-lg text-amber-950 font-medium">
              Naturally Nourishing
            </p>
            <p className="text-xs">
              Rich in vitamins, minerals, and healthy fats
            </p>
          </div>
        </div>
        <div className="flex items-center justify-start py-3 px-5 space-x-4 rounded-md shadow-sm bg-white">
          <div className="relative h-25 w-25 shrink-0 bg-[#F2F2F2] rounded-full">
            <Image
              src={Cow.src}
              fill
              alt=""
              className="object-cover p-4 rounded-full"
            />
          </div>
          <div className="space-y-2">
            <p className="text-lg text-amber-950 font-medium">
              Sustainable & Ethical
            </p>
            <p className="text-xs">
              Responsible farming practices that care for animals and
              environment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
