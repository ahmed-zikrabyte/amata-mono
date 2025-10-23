"use client";
import React, { useState, useCallback } from "react";
import carousel1 from "../../assets/carousel1.png";
import carousel2 from "../../assets/carousel2.png";
import carousel3 from "../../assets/carousel3.png";
import BgSec1 from "../../assets/homeBgSec2.png";
import BgSec1Img from "../../assets/homebgSec2Img.png";
import love from "../../assets/Love.png";
import Cookie from "../../assets/Cookie.png";
import NoCem from "../../assets/NoCem.png";
import BgSec3 from "../../assets/homeBgSec3.png";
import BgSec3Img from "../../assets/homeBgSec3Img.png";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Product } from "../../lib/types/product";
import productCorsoul1 from "../../assets/ProductCorsolImg1.png";
import productCorsoul2 from "../../assets/ProdutCorsolImg2.png";
import Banner4 from "./Banners/Banner4";

const HeroSection = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }),
  ]);

  // Product carousel state
  const [productEmblaRef, productEmblaApi] = useEmblaCarousel({ 
    loop: false, 
    align: "start",
    containScroll: "trimSnaps"
  });

  const scrollPrev = useCallback(() => {
    if (productEmblaApi) productEmblaApi.scrollPrev();
  }, [productEmblaApi]);

  const scrollNext = useCallback(() => {
    if (productEmblaApi) productEmblaApi.scrollNext();
  }, [productEmblaApi]);

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

  const productImagesCor = {
    ashwagandha: productCorsoul1,
    girCow: productCorsoul2,
    buffalo: productCorsoul1,
    brahmi: productCorsoul2,
  };

  interface LocalProduct {
    id: number;
    category: string;
    title: string;
    rating: number;
    price: string;
    image: any;
    badge: string;
  }

  const localProducts: LocalProduct[] = [
    {
      id: 1,
      category: "Category Approach",
      title: "Ashwagandha Vitality",
      rating: 4.3,
      price: "799/500ml",
      image: productImagesCor.ashwagandha,
      badge: "Approach",
    },
    {
      id: 2,
      category: "Category Traditional",
      title: "Gir Cow A2 Bilona Ghee",
      rating: 4.4,
      price: "849/500ml",
      image: productImagesCor.girCow,
      badge: "Traditional",
    },
    {
      id: 3,
      category: "Category Buffalo & Coal",
      title: "Buffalo A2 Cultured Ghee",
      rating: 4.3,
      price: "799/500ml",
      image: productImagesCor.buffalo,
      badge: "Buffalo & Coal",
    },
    {
      id: 4,
      category: "Category Aromatic",
      title: "Brahmi Herbal Ghee",
      rating: 4.3,
      price: "799/500ml",
      image: productImagesCor.brahmi,
      badge: "Aromatic",
    },
    {
      id: 5,
      category: "Category Approach",
      title: "Ashwagandha Vitality Pro",
      rating: 4.5,
      price: "899/500ml",
      image: productImagesCor.ashwagandha,
      badge: "Approach",
    },
  ];

  const [recommendedProducts] = useState<LocalProduct[]>(localProducts);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleAddToCart = (product: Product | LocalProduct) => {
    console.log("Add to cart:", product);
  };

  const handleShopNow = (product: Product | LocalProduct) => {
    console.log("Shop now:", product);
  };

  const handleViewAll = () => {
    console.log("View all products");
  };

  const filteredProducts = selectedFilter === "All" 
    ? localProducts 
    : localProducts.filter(product => product.badge.toLowerCase().includes(selectedFilter.toLowerCase()));

  return (
    <div className="relative w-full overflow-hidden mt-16">
      {/* Main Hero Carousel */}
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {carouselData.map((slide, index) => (
            <div
              className="embla__slide flex-[0_0_100%] min-w-0 relative"
              key={index}
            >
              <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[70vh] lg:min-h-[560px] lg:max-h-[800px]">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  className={slide.className}
                  priority={index === 0}
                  quality={90}
                />

                {/* Content Overlay - Same positioning for all screen sizes */}
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg">
                      {/* Tagline */}
                      <p
                        className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 text-left leading-tight ${slide.textColor}`}
                      >
                        {slide.tagline}
                      </p>

                      {/* Main Heading */}
                      <h1
                        className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-2xl font-normal text-left leading-relaxed mb-3 sm:mb-4 md:mb-6 lg:mb-8 ${slide.textColor}`}
                      >
                        {slide.heading}
                      </h1>

                      {/* Buttons Container */}
                      <div className="flex flex-col gap-2 sm:gap-3 md:flex-row md:gap-4 w-full md:w-auto">
                        {slide.buttons.map((button, btnIndex) => (
                          <button
                            key={btnIndex}
                            className={`font-semibold text-xs sm:text-sm md:text-base py-2 px-4 sm:py-2.5 sm:px-5 md:py-3 md:px-8 lg:py-4 lg:px-10 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl text-center ${button.className}`}
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
                <div className="border-t border-gray-400 pt-2 mb-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-4 text-black">
                    Purity Backed by Science
                  </h3>
                  <p className="text-base sm:text-sm mb-4 text-black">
                    Our NABL-certified lab reports show that Amata Farms' A2 Gir
                    Cow Ghee:
                  </p>

                  <ul className="text-sm sm:text-base mb-4">
                    <li className="flex items-start justify-center pr-20 gap-1">
                      <Image
                        src={Cookie}
                        alt="Cookie"
                        className="w-7 h-9 object-contain"
                      />
                      <span className="text-black">
                        Has 99.87% healthy fats with minimal moisture content
                      </span>
                    </li>
                    <li className="flex items-start justify-center pr-20 gap-1">
                      <Image
                        src={love}
                        alt="heart"
                        className="w-7 h-7 object-contain"
                      />
                      <span className="text-black">
                        Contains high MUFA and PUFA levels for better heart
                        health.
                      </span>
                    </li>
                    <li className="flex items-start justify-center pr-20 gap-1">
                      <Image
                        src={NoCem}
                        alt="No-Cem"
                        className="w-7 h-7 object-contain"
                      />
                      <span className="text-black">
                        Is completely free mineral oils, adulterants, or
                        preervativesGhee(A2GirCowCultured)
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="bg-red-800 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                    Order Now
                  </button>
                  <button className="bg-white hover:bg-amber-800 text-black hover:text-white font-semibold py-3 px-6 rounded-lg border-none border-amber-400 transition duration-300 ease-in-out transform hover:scale-105">
                    View Full Lab Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 - Trending Products */}
      <div
        className="relative w-full z-0 min-h-[300px] sm:min-h-[350px] lg:min-h-[400px]"
        style={{
          backgroundImage: `url(${BgSec3.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative z-20 h-full">
          {/* Section Heading */}
          <div className="pt-6 sm:pt-8 lg:pt-10 text-center px-4">
            <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl">
              Trending Now — Loved by Thousands!
            </h1>
            <p className="text-xs sm:text-sm lg:text-base font-medium tracking-wide max-w-2xl mx-auto mt-2">
              Discover what's creating a buzz in every kitchen! Our most-loved
              ghee selections are flying off the shelves — pure, traditional,
              and packed with flavor.
            </p>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-6 lg:gap-10">
            
            {/* Left Side Offer Card */}
            <div className="relative flex-shrink-0 w-full sm:w-[70%] lg:w-[30%]">
              <div className="relative w-96 sm:w-80 md:w-full h-72 sm:h-80 lg:h-[480px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={BgSec3Img}
                  alt="Offer Image"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end items-center pb-6 text-white text-center">
                  <p className="text-sm sm:text-base font-semibold">
                    Get{" "}
                    <span className="text-yellow-300 italic">20% Discount</span>{" "}
                    on your first order
                  </p>
                  <button className="mt-3 bg-amber-700 hover:bg-amber-600 text-white font-semibold py-2 px-5 sm:px-6 rounded-lg text-sm transition-transform duration-300 hover:scale-105">
                    View all
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Products Carousel */}
            <div className="flex-grow w-full lg:w-[65%]">
              
              {/* Filter Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                {/* Filter Buttons */}
                <div className="flex items-center gap-2 flex-nowrap overflow-x-auto pb-2 w-full sm:w-auto scrollbar-hide">
                  {["All", "500 ml", "1 Litre", "2 Litres", "5 Litres"].map((label, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedFilter(label)}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                        selectedFilter === label
                          ? "bg-[#4B2C20] text-white"
                          : "border border-[#4B2C20] text-[#4B2C20] hover:bg-[#4B2C20] hover:text-white"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
                  <div className="hidden sm:block h-px bg-[#4B2C20]/40 flex-1 max-w-[100px] mx-2"></div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button 
                      onClick={scrollPrev}
                      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border border-[#4B2C20]/40 text-[#4B2C20] hover:bg-[#4B2C20] hover:text-white transition"
                    >
                      <span className="text-sm sm:text-lg">&larr;</span>
                    </button>
                    <button 
                      onClick={scrollNext}
                      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border border-[#4B20]/40 text-[#4B2C20] hover:bg-[#4B2C20] hover:text-white transition"
                    >
                      <span className="text-sm sm:text-lg">&rarr;</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Carousel */}
              <div className="embla overflow-hidden" ref={productEmblaRef}>
                <div className="embla__container flex gap-4">
                  {filteredProducts.map((product, index) => (
                    <div 
                      className="embla__slide flex-[0_0_280px] sm:flex-[0_0_300px] min-w-0" 
                      key={product.id}
                    >
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="relative h-48 sm:h-56">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-3 right-3 bg-amber-800 text-white px-4 py-1 rounded-full text-xs font-medium">
                            Sale
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-2">
                            {product.title}
                          </h3>
                          <div className="flex items-center justify-between">
                            <span className="text-amber-600 font-bold text-sm sm:text-base">
                              {product.price}
                            </span>
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-500">⭐</span>
                              <span className="text-xs text-gray-600">{product.rating}</span>
                            </div>
                          </div>
                          <button className="w-full mt-3 bg-[#4B2C20] hover:bg-[#3a2116] text-white py-2 rounded-lg text-sm font-medium transition-colors">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <Banner4/>
    </div>
  );
};

export default HeroSection;