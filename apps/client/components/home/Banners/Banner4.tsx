import React from "react";
import BgSec4 from "../../../assets/homeBgSec4.png";
import BgSec5 from "../../../assets/homeBgSec5.png";
import Banner5 from "./Banner5";
const Banner4 = () => {
  return (
    <div>
      <div
        className="relative w-full z-0 min-h-[400px] sm:min-h-[450px] lg:min-h-[500px]"
        style={{
          backgroundImage: `url(${BgSec4.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative z-20 h-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center pt-30">
            <div className="w-full max-w-4xl mx-auto">
              {/* Badge */}
              <div className="text-center mb-6">
                <span className="inline-block px-5 py-2 rounded-full opacity-90 text-white font-medium text-sm sm:text-base shadow-lg">
                  Special Welcome Offer!
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center mb-4 sm:mb-6 leading-tight">
                Get 15% Off on Your First Order
              </h1>

              {/* Description */}
              <p className="text-[6px] sm:text-[8px] lg:text-[13px] text-white/90 text-center mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
                Start your journey to purity with our handcrafted ghee — made
                using traditional Bilona methods and 100% A2 milk. Enjoy the
                richness of heritage, now with an exclusive first-time discount.
              </p>

              {/* CTA Button */}
              <div className="text-center">
                <button className="bg-black/50 hover:bg-amber-700 text-white font-medium py-2 px-4 sm:py-2 sm:px-4 rounded-xl text-base sm:text-lg lg:text-xl transition-all duration-300 transform hover:scale-105">
                  Shop Now and Get 10% Off
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner4;
