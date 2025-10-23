"use client";

import Image from "next/image";
import React from "react";
import SectionImg from "../../assets/images/about-us/about-us-second-img.png";

const TraditionalMethodSection = () => {
  return (
    <div className="w-full bg-white flex flex-col lg:flex-row items-center justify-center lg:p-20 p-6 lg:space-x-10 relative overflow-hidden">
      {/* Image Section */}
      <div className="relative lg:aspect-[4/3] lg:w-3/5 w-full h-64 lg:h-max">
        <Image
          src={SectionImg.src}
          fill
          alt="ghee"
          className="object-cover object-center max-md:rounded-2xl"
        />
      </div>

      {/* Content Section */}
      <div className="lg:w-2/5 w-full flex flex-col items-start lg:relative">
        {/* Overlapping box */}
        <div
          className="lg:-ml-30 w-full xl:w-[85%] bg-white shadow-2xl p-6 sm:p-8 lg:p-10 z-10 
          relative lg:top-0 -mt-20 lg:mt-0 max-md:rounded-b-2xl"
        >
          <h4 className="text-2xl sm:text-3xl font-semibold text-amber-950 mb-4">
            Traditional Method
          </h4>
          <p className="text-sm sm:text-base text-black/80 leading-relaxed">
            At Amata, we bring you the purest form of nourishment — 100% A2 Gir
            Cow Bilona Ghee, handcrafted using traditional methods. Made in
            small batches, our ghee retains its authentic taste, rich aroma, and
            wholesome nutrition. Every jar is a reflection of care, honesty, and
            generations of tradition.
          </p>
        </div>

        {/* Stats Section */}
        <div className="flex items-center justify-between lg:justify-start w-full mt-6 lg:mt-8 lg:pl-10">
          <div className="text-center p-3 sm:p-5">
            <p className="text-2xl sm:text-3xl font-medium text-amber-950">2000</p>
            <p className="text-black/80 text-sm sm:text-base">Journey Began</p>
          </div>

          <div className="hidden sm:block h-20 w-0.5 bg-gradient-to-b from-gray-300 via-gray-500 to-white mx-3" />

          <div className="text-center p-3 sm:p-5">
            <p className="text-2xl sm:text-3xl font-medium text-amber-950">25</p>
            <p className="text-black/80 text-sm sm:text-base">First Gir Cows</p>
          </div>
        </div>
      </div>

      {/* Optional: light gradient overlay behind content on mobile */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-transparent lg:hidden pointer-events-none"></div>
    </div>
  );
};

export default TraditionalMethodSection;
