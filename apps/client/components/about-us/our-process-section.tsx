import Image from "next/image";
import React from "react";
import Cow from "../../assets/cow.png";

const OurProcessSection = () => {
  return (
    <div className=" w-full bg-amber-100/60 px-6 py-10 md:py-20 md:px-20 space-y-6">
      <div className="text-center space-y-4">
        <h4 className="text-3xl font-medium text-amber-950">Our Process - How We Make It</h4>
        <p className="font-light text-lg">
          Every step of our traditional Bilona method is performed with love,
          patience, <br /> and generations of wisdom.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="relative h-34 w-34 rounded-full bg-white shadow-lg">
            <Image src={Cow.src} fill alt="cow" className="p-7" />
          </div>
          <p className="text-xl">Native Gir Cows</p>
          <p>Ethically raised and naturally fed</p>
        </div>
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="relative h-34 w-34 rounded-full bg-white shadow-lg">
            <Image src={Cow.src} fill alt="cow" className="p-7" />
          </div>
          <p className="text-xl">Bilona Method</p>
          <p>Hand-churned with wooden churners</p>
        </div>
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="relative h-34 w-34 rounded-full bg-white shadow-lg">
            <Image src={Cow.src} fill alt="cow" className="p-7" />
          </div>
          <p className="text-xl">Slow Cooked</p>
          <p>Preserves natural nutrition and aroma</p>
        </div>
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="relative h-34 w-34 rounded-full bg-white shadow-lg">
            <Image src={Cow.src} fill alt="cow" className="p-7" />
          </div>
          <p className="text-xl">100% Natural</p>
          <p>No preservatives, no shortcuts</p>
        </div>
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="relative h-34 w-34 rounded-full bg-white shadow-lg">
            <Image src={Cow.src} fill alt="cow" className="p-7" />
          </div>
          <p className="text-xl">Farm to Home</p>
          <p>Direct from our farm to your kitchen</p>
        </div>
      </div>
    </div>
  );
};

export default OurProcessSection;
