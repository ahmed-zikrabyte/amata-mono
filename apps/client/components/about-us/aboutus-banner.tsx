import React from 'react'
import BannerImg from "../../assets/images/about-us/about-us-banner-img.png";

const AboutusBanner = () => {
  return (
    <div
        className="w-full h-80 md:h-90 flex flex-col items-center justify-center space-y-4 text-center p-5"
        style={{
          backgroundImage: `url(${BannerImg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <p className="text-2xl md:text-3xl text-amber-950 font-medium px-3">
          Pure Goodness, Crafted with Care
        </p>
        <p className="max-md:text-sm font-medium">
          From our family farm in Jharkhand to kitchens across India — purity{" "}
          <br className="max-md:hidden" />
          that you can taste, trust, and treasure.
        </p>
        <div className="flex items-center text-xs space-x-3">
          <div className="bg-amber-100 font-medium rounded-full px-3 py-2">Farm Fresh</div>
          <div className="bg-amber-100 font-medium rounded-full px-3 py-2">
            Traditional Method
          </div>
          <div className="bg-amber-100 font-medium rounded-full px-3 py-2">100% Pure</div>
        </div>
      </div>
  )
}

export default AboutusBanner