"use client";
import React from "react";
import carousel1 from "../../assets/carousel1.png";
import carousel2 from "../../assets/carousel2.png";
import carousel3 from "../../assets/carousel3.png";
import BgSec1 from "../../assets/homeBgSec2.png";
import BgSec1Img from "../../assets/homebgSec2Img.png";
import love from "../../assets/Love.png"
import Cookie from "../../assets/Cookie.png"
import NoCem from "../../assets/NoCem.png"
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const HeroSection = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }),
  ]);

  const carouselData = [
    {
      image: carousel1,
      alt: "Pure A2 Gir Cow Ghee",
      className: "object-cover",
      tagline: "Not the famous ghee. The best ghee.",
      heading:
        "Pure A2 Gir Cow Bilona Ghee - Delivered from our farm to your kitchen",
      textColor: "text-white",
      buttons: [
        {
          text: "Shop Now",
          className: "bg-red-800 hover:bg-red-900 text-white",
        },
        {
          text: "Order from Amazon Fresh",
          className:
            "bg-white hover:bg-orange-50 text-red-800 border-2 border-transparent hover:border-orange-200",
        },
      ],
    },
    {
      image: carousel2,
      alt: "Limited Batch Bilona Ghee",
      className: "object-bottom-right",
      tagline: "Limited Batch Bilona Ghee - Fresh From Our Farms.",
      heading:
        "Crafted using traditional methods, this limited batch ghee is fresh, pure and available for a short time only.",
      textColor: "text-black",
      buttons: [
        {
          text: "Order Now",
          className: "bg-red-800 hover:bg-red-900 text-white",
        },
      ],
    },
    {
      image: carousel3,
      alt: "Premium A2 Ghee Collection",
      className: "object-bottom-right",
      tagline: "Discover Our Premium A2 Ghee Collection",
      heading:
        "Savor the richness of tradition with ghee crafted from the finest cow's milk, farm to jar.",
      textColor: "text-white",
      buttons: [
        {
          text: "Explore Collection",
          className: "bg-red-800 hover:bg-red-900 text-white",
        },
      ],
    },
  ];

  return (
    <div className="relative w-full overflow-hidden mt-16">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {carouselData.map((slide, index) => (
            <div
              className="embla__slide flex-[0_0_100%] min-w-0 relative"
              key={index}
            >
              <div className="relative w-full h-[70vh] min-h-[560px] max-h-[800px]">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  className={slide.className}
                  priority={index === 0}
                  quality={90}
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-center justify-start">
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-lg">
                      {/* Tagline */}
                      <p
                        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-left leading-tight ${slide.textColor}`}
                      >
                        {slide.tagline}
                      </p>

                      {/* Main Heading */}
                      <h1
                        className={`text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-left leading-relaxed mb-6 sm:mb-8 max-w-md ${slide.textColor}`}
                      >
                        {slide.heading}
                      </h1>

                      {/* Buttons Container */}
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                        {slide.buttons.map((button, btnIndex) => (
                          <button
                            key={btnIndex}
                            className={`font-semibold py-3 px-6 sm:py-3 sm:px-8 md:py-4 md:px-10 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl ${button.className}`}
                          >
                            {button.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2 */}
      <div
  className="relative w-full z-0 min-h-[200px] sm:min-h-[200px] lg:min-h-[400px]"
  style={{
    backgroundImage: `url(${BgSec1.src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="absolute inset-0 z-10"></div>
  <div className="relative z-20 h-full">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">

      {/* Left side */}
      <div className="flex items-center justify-center lg:justify-start order-2 lg:order-1">
        <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl">
          <div className="relative h-64 sm:h-80 lg:h-96 xl:h-[500px]">
            <Image
              src={BgSec1Img}
              alt="hero-section"
              fill
              className="object-contain drop-shadow-2xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center lg:justify-end order-1 lg:order-2">
        <div className="w-full max-w-md lg:max-w-lg text-white">
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 leading-tight">
            Purity Backed by Science<br />
            <span className="text-amber-300">BILONA GHEE</span>
          </h1>
          <div className="border-t border-gray-400 pt-4 mb-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-amber-200">
              Purity Backed by Science
            </h3>
            <p className="text-sm sm:text-base mb-4">
              Our NABL-certified lab reports show that Amata Farms' A2 Gir Cow Ghee:
            </p>
            
            <ul className="space-y-3 text-sm sm:text-base mb-4">
              <li className="flex items-start">
                <span className="text-amber-300 mr-2">•</span>
                <span>Has 99.87% healthy fats with minimal moisture content</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-300 mr-2">•</span>
                <span>Contains high MUFA and PUFA levels for better heart health</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-300 mr-2">•</span>
                <span>Is completely free from mineral oils, adulterants, or preservatives</span>
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
              Order Now
            </button>
            <button className="bg-transparent hover:bg-white/10 text-white font-semibold py-3 px-6 rounded-lg border border-amber-400 transition duration-300 ease-in-out transform hover:scale-105">
              View Full Lab Report
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default HeroSection;
