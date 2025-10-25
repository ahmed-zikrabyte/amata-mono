import React from "react";
import Image from "next/image";
import bgSec8 from "../../../assets/homeSecBg8.png";
import bgSecImg8 from "../../../assets/homeSecBgImg8.png";

const Banner8 = () => {
  return (
    <div>
      <div
        className="relative w-full z-0 min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]"
        style={{
          backgroundImage: `url(${bgSec8.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative z-20 h-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center py-10">
            <div className="w-full max-w-6xl mx-auto">
              <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {/* Left Text Section */}
                <div>
                  <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-[#4B2C20]">
                    Why Amata Farms is Different?
                  </h2>

                  <ul className="mt-6 space-y-4 text-sm sm:text-base text-[#4B2C20] leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2 bg-[#4B2C20] rounded-full flex-shrink-0"></span>
                      <span>
                        <strong>100% A2 Gir Cow Milk</strong> – From indigenous,
                        free-grazing Gir cows
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2 bg-[#4B2C20] rounded-full flex-shrink-0"></span>
                      <span>
                        <strong>Traditional Bilona Process</strong> – Ensures
                        quality, freshness & retains maximum nutrition
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2 bg-[#4B2C20] rounded-full flex-shrink-0"></span>
                      <span>
                        <strong>Farm-to-Home Transparency</strong> – Ghee made
                        on our own ethical farms
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2 bg-[#4B2C20] rounded-full flex-shrink-0"></span>
                      <span>
                        <strong>No Preservatives or Additives</strong> – Pure.
                        Clean. Honest.
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2 bg-[#4B2C20] rounded-full flex-shrink-0"></span>
                      <span>
                        <strong>Lab Tested for Quality</strong> – Certified
                        results from NABL-accredited Equinox Labs (A2 Gir Cow
                        Ghee).
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Image */}
                <div className="relative sm:left-30 lg:left-0">
                  <Image
                    src={bgSecImg8}
                    alt="Amata Farms"
                    className="object-contain rounded-t-full rounded-b-full h-full"
                  />
                </div>

                {/* Right side Text */}
                <div>
                  <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-[#4B2C20]">
                    Why Choose Amata farms A2 Gir Cow Ghee?
                  </h2>

                  <ul className="mt-6 space-y-4 text-sm sm:text-base text-[#4B2C20] leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2 bg-[#4B2C20] rounded-full flex-shrink-0"></span>
                      <span>
                        <strong>Ethically Raised Cows</strong> – Free-grazing,
                        hormone-free
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2 bg-[#4B2C20] rounded-full flex-shrink-0"></span>
                      <span>
                        <strong>Traditional Bilona Process</strong> – Retains
                        maximum nutrition.
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2 bg-[#4B2C20] rounded-full flex-shrink-0"></span>
                      <span>
                        <strong>Small Batch Production</strong> – Ensures qulity
                        and freshness.
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2 bg-[#4B2C20] rounded-full flex-shrink-0"></span>
                      <span>
                        <strong>Lab Tested Purity</strong> – Every batch
                        certifed by NABL labs
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2 bg-[#4B2C20] rounded-full flex-shrink-0"></span>
                      <span>
                        <strong>Farm-to-Home Trasparency</strong> – We Know
                        every cow, every btach. Ghee).
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner8;
