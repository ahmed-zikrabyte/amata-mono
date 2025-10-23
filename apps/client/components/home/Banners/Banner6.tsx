import React from "react";
import BgSec6 from "../../../assets/homeBgSec6.png";
import BgSec6Img from "../../../assets/homeBgSec6Img.png";
import Image from "next/image";
import Banner7 from "./Banner7";

const Banner6 = () => {
  return (
    <div>
    <div
      className="relative w-full z-0 min-h-[250px] sm:min-h-[350px] lg:min-h-[450px]"
      style={{
        backgroundImage: `url(${BgSec6.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-20 h-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center py-8 sm:py-12 lg:py-16">
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
              
              {/* Text Content - Left Side */}
              <div className="w-full lg:w-1/2">
                <h1 className="font-semibold text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6 text-gray-800">
                  What is A2 Gir Cow Ghee?
                </h1>
                
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-sm sm:text-base lg:text-lg font-normal text-black leading-relaxed ">
                    A2 Gir Cow Ghee is a form of clarified butter made exclusively from the milk of 
                    indigenous Gir cows - a breed native to India and revered for its nutritional richness. 
                    Unlike commercial dairy breeds, Gir cows naturally produce A2 beta-casein protein in 
                    their milk, which is considered easier to digest and closer to the milk consumed by 
                    our ancestors.
                  </p>
                  
                  <p className="text-sm sm:text-base lg:text-lg font-normal text-black leading-relaxed">
                    The ghee is made using the bilona method - a slow, traditional process described in 
                    Ayurveda. First, the milk is set into curd. The curd is then churned using a wooden 
                    churner (bilona) to extract butter, which is slow-cooked over a low flame until it 
                    transforms into golden, aromatic ghee.
                  </p>
                </div>
              </div>

              {/* Image - Right Side */}
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
                  <div className="relative h-64 sm:h-80 lg:h-96 xl:h-[450px]">
                    <Image
                      src={BgSec6Img}
                      alt="A2 Gir Cow Ghee"
                      fill
                      className="object-contain drop-shadow-2xl"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <Banner7/>
    </div>
  );
};

export default Banner6;