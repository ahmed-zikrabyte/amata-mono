import React from "react";
import Image from "next/image";
import bgSec10 from "../../../assets/bgSec10.png";
import productImg from "../../../assets/bgSec10ProductImg.png";
import bgSeclogo1 from "../../../assets/bgSec10Logo1.png";
import bgSeclogo2 from "../../../assets/bgSec10Logo2.png";
import bgSeclogo3 from "../../../assets/bgSec10Logo3.png";
import bgSeclogo4 from "../../../assets/bgSec10Logo4.png";

const Banner10 = () => {
  return (
    <div className="w-full">
      <div
        className="relative w-full z-0 min-h-[600px] md:min-h-[700px] lg:min-h-[800px]"
        style={{
          backgroundImage: `url(${bgSec10.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative z-20 h-full px-4 md:px-6 lg:px-20 xl:px-24">
          <div className="container h-full flex flex-col py-10 md:py-14 lg:py-20">
            <div className="w-full mx-auto">
              {/* Header */}
              <div className="">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                  How To Order
                </h1>
                <p className="text-sm md:text-base lg:text-lg font-medium text-gray-700 mt-2">
                  Here's how you can order our product without hassle
                </p>
              </div>

              {/* Content Section */}
              <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8">
                {/* Left Side - Cards */}
                <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {/* Card 1 */}
                  <div className="bg-[#faf9f0] rounded-2xl shadow-xl/20 p-6 flex flex-col items-start">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                      <Image
                        src={bgSeclogo1}
                        alt="Choose jar size"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex items-start gap-2 p-2">
                      <span className="flex-shrink-0 w-6 h-6 bg-amber-900 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        1
                      </span>
                      <p className="text-sm md:text-base font-medium text-gray-900">
                        Choose your jar size.
                      </p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-[#faf9f0] rounded-2xl shadow-xl/20 p-6 flex flex-col items-start">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                      <Image
                        src={bgSeclogo2}
                        alt="Add to cart"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex items-start gap-2 p-2">
                      <span className="flex-shrink-0 w-6 h-6 bg-amber-900 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        2
                      </span>
                      <p className="text-sm md:text-base font-medium text-gray-900">
                        Add to cart.
                      </p>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-[#faf9f0] rounded-2xl shadow-xl/20 p-6 flex flex-col items-start">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                      <Image
                        src={bgSeclogo3}
                        alt="Pay online"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex items-start gap-2 p-2">
                      <span className="flex-shrink-0 w-6 h-6 bg-amber-900 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        3
                      </span>
                      <p className="text-sm md:text-base font-medium text-gray-900">
                        Pay online or choose COD.
                      </p>
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div className="bg-[#faf9f0] rounded-2xl shadow-xl/20 p-6 flex flex-col items-start">
                    <div className="relative w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <Image
                        src={bgSeclogo4}
                        alt="Same day delivery"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex items-start gap-2 p-2">
                      <span className="flex-shrink-0 w-6 h-6 bg-amber-900 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        4
                      </span>
                      <p className="text-sm md:text-base font-medium text-gray-900">
                        Get same-day delivery in Bangalore.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side - Product Image */}
                <div className="w-full lg:w-1/2 flex justify-end order-1 lg:order-2 mb-8 sm:mb-10 md:mb-12 lg:mb-0">
                  <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl aspect-square">
                    <Image
                      src={productImg}
                      alt="Amata Farms Product"
                      fill
                      className="object-contain rounded-2xl"
                      sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 400px, 500px"
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
  );
};

export default Banner10;
