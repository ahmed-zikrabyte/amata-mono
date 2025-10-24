"use client";

import { useEffect, useState } from "react";
import { Product } from "@/lib/types/product";
import { useApi } from "@/hooks/useApi";
import { productApi } from "@/lib/api/productApi";
import ProductCard from "@/components/products/productCard";
import Image from "next/image";
import BgSec3 from "@/assets/images/background/background-img.png";
import BgSec3Img from "@/assets/homeBgSec3Img.png";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "../../../../../packages/ui/src/components/button";

const TrendingProductsSection = () => {
  const { execute, data, loading } = useApi<Product[]>();
  const [products, setProducts] = useState<Product[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  useEffect(() => {
    execute(productApi.getAll());
  }, []);

  useEffect(() => {
    if (data?.data?.products) {
      setProducts(data.data.products);
    } else if (Array.isArray(data?.data)) {
      setProducts(data.data);
    }
  }, [data]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section
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
          <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl text-[#4B2C20]">
            Trending Now — Loved by Thousands!
          </h1>
          <p className="text-xs sm:text-sm lg:text-base font-medium tracking-wide max-w-2xl mx-auto mt-2 text-[#4B2C20]/80">
            Discover what's creating a buzz in every kitchen! Our most-loved
            ghee selections are flying off the shelves — pure, traditional, and
            packed with flavor.
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

          {/* Right Side - Carousel with Filter & Arrows */}
          <div className="flex-grow w-full lg:w-[65%]">
            {/* Filter Bar + Arrows */}
           {/* Filter Bar + Arrows */}
<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
  {/* Filter Buttons */}
  <div className="flex items-center gap-2 flex-nowrap overflow-x-auto pb-2 w-full sm:w-auto scrollbar-hide">
    {["All", "500 ml", "1 Litre", "2 Litres", "5 Litres"].map((label, idx) => {
      const isActive = label === "All";
      return (
        <button
          key={idx}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 whitespace-nowrap flex-shrink-0
            ${isActive
              ? "bg-red-800 text-white border border-red-600"
              : "bg-white text-red-600 border border-red-600 hover:bg-red-600 hover:text-white"
            }`}
        >
          {label}
        </button>
      );
    })}
  </div>

  {/* Divider + Arrows */}
  <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
    <div className="hidden lg:block h-px bg-[#4B2C20]/40 flex-1 max-w-[100px] mx-2"></div>
    <div className="flex items-center gap-2 shrink-0">
      {/* Left Arrow - White */}
      <button
        onClick={scrollPrev}
        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border border-red-600 text-red-600 bg-white hover:bg-red-100 transition"
      >
        &larr;
      </button>

      {/* Right Arrow - Red */}
      <button
        onClick={scrollNext}
        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border border-red-600 text-white bg-red-800 hover:bg-red-700 transition"
      >
        &rarr;
      </button>
    </div>
  </div>
</div>


            {/* Product Cards Carousel */}
            {loading ? (
              <p className="text-center text-[#4B2C20] py-10">
                Loading products...
              </p>
            ) : products && products.length > 0 ? (
              <div className="embla overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex gap-4">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="embla__slide flex-[0_0_280px] sm:flex-[0_0_300px] min-w-0"
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-600 py-10">
                No trending products found
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingProductsSection;
