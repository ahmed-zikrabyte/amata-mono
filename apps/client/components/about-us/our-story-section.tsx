import React from "react";
import OurStoryClient from "./our-story-client";


const OurStorySection = () => {
  return (
    <div className="px-4 sm:px-6 md:px-20 py-16 md:py-20">
      <div className="flex flex-col md:flex-row md:space-x-10">
        <div className="space-y-4 md:space-y-3 flex-1">
          <h3 className="font-medium text-lg md:text-xl">Our Story - The Beginning of Purity</h3>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-snug">
            From a Village in Jharkhand <br />
            To Kitchens Across India
          </h2>

          <p className="text-gray-400 text-sm sm:text-base">
            The story of purity that began at home
          </p>

          <p className="text-sm sm:text-base">
            I'm Abhishek Singh, founder of Amata Farms, but my story starts much
            before my name was ever on a label. I was born in Jamadoba, Dhanbad,
            Jharkhand, into a family that valued purity over convenience.
          </p>
          <p className="text-sm sm:text-base">
            Back in the 1980s, my father moved to Mumbai for work. Like every
            newcomer to the city, he dreamt of a better life for his family. But
            there was one thing he couldn’t compromise on – the purity of milk
            and ghee that we were used to in our hometown.
          </p>
          <p className="text-sm sm:text-base">
            The challenge in Mumbai was real. Packaged milk lacked taste,
            freshness, and the wholesome goodness he had grown up with. Ghee
            available in markets had no aroma, no grainy texture, and no
            assurance of purity. And my father knew – food is not just food,
            it’s the foundation of health.
          </p>
        </div>
        <div className="bg-amber-200 w-full md:w-1/2 h-64 md:h-96 mt-6 md:mt-0 rounded-lg flex-shrink-0"></div>
      </div>

      {/* Client-side interactive section */}
      <OurStoryClient />
    </div>
  );
};

export default OurStorySection;
