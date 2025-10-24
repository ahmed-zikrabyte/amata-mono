"use client";

import React, { useState, useCallback, useEffect } from "react";
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
import productCorsoul1 from "../../assets/ProductCorsolImg1.png";
import productCorsoul2 from "../../assets/ProdutCorsolImg2.png";
import Banner4 from "./Banners/Banner4";
import ProductCard from "../products/productCard";
import { Product } from "@/lib/types/product";
import { productApi } from "@/lib/api/productApi";
import { Button } from "@workspace/ui/components/button";
import TrendingProductsSection from "./Banners/TrendingProductSection";
import Link from "next/link";

const HeroSection = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }),
  ]);

  const carouselData = [
    {
      image: carousel1,
      alt: "Pure A2 Gir Cow Ghee",
      className: "object-cover object-[77%_center] md:object-[70%_center]",
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
      className: "object-cover object-[83%_center] md:object-[80%_center]",
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
      className: "object-cover object-[77%_center] md:object-[75%_center]",
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
    id: string;
    variantId: string;
    category: string;
    title: string;
    rating: number;
    price: string;
    image: any;
    badge: string;
  }

  const localProducts: LocalProduct[] = [
    {
      id: "1",
      variantId: "v1",
      category: "Category Approach",
      title: "Ashwagandha Vitality",
      rating: 4.3,
      price: "799/500ml",
      image: productImagesCor.ashwagandha,
      badge: "Approach",
    },
    {
      id: "2",

      variantId: "v1",
      category: "Category Traditional",
      title: "Gir Cow A2 Bilona Ghee",
      rating: 4.4,
      price: "849/500ml",
      image: productImagesCor.girCow,
      badge: "Traditional",
    },
    {
      id: "3",
      variantId: "v1",
      category: "Category Buffalo & Coal",
      title: "Buffalo A2 Cultured Ghee",
      rating: 4.3,
      price: "799/500ml",
      image: productImagesCor.buffalo,
      badge: "Buffalo & Coal",
    },
    {
      id: "4",
      variantId: "v1",
      category: "Category Aromatic",
      title: "Brahmi Herbal Ghee",
      rating: 4.3,
      price: "799/500ml",
      image: productImagesCor.brahmi,
      badge: "Aromatic",
    },
    {
      id: "5",

      variantId: "v1",
      category: "Category Approach",
      title: "Ashwagandha Vitality Pro",
      rating: 4.5,
      price: "899/500ml",
      image: productImagesCor.ashwagandha,
      badge: "Approach",
    },
  ];

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [loading, setLoading] = useState<boolean>(true);

  // Product carousel state
  const [productEmblaRef, productEmblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => {
    if (productEmblaApi) productEmblaApi.scrollPrev();
  }, [productEmblaApi]);

  const scrollNext = useCallback(() => {
    if (productEmblaApi) productEmblaApi.scrollNext();
  }, [productEmblaApi]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await productApi.getAll();
        if (res.success) setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts =
    selectedFilter === "All"
      ? products
      : products.filter((p) =>
          p.variants.some((v) =>
            v.size.toString().includes(selectedFilter.replace(/\D/g, ""))
          )
        );

  return (
    <div className="relative w-full overflow-hidden mt-16">
      {/* Main Hero Carousel */}
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {carouselData.map((slide, index) => (
            <div
              key={index}
              className="embla__slide flex-[0_0_100%] min-w-0 relative"
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
                  <div className="container px-4 sm:px-6 lg:px-20 xl:px-24">
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
                          <Link href={'/products'}>
                            <button
                              key={btnIndex}
                              className={`font-semibold text-xs sm:text-sm md:text-base py-2 px-4 sm:py-2.5 sm:px-5 md:py-3 md:px-8 lg:py-4 lg:px-10 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl text-center ${button.className}`}
                            >
                              {button.text}
                            </button>
                          </Link>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full w-full mx-auto px-4 sm:px-6 lg:px-20 xl:px-24 py-8 lg:py-16">
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
                <div className="border-t border-gray-400 pt-2 mb-6 space-y-4">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-black">
                    Purity Backed by Science
                  </h3>
                  <p className="text-base sm:text-sm mb-4 text-black">
                    Our NABL-certified lab reports show that Amata Farms' A2 Gir
                    Cow Ghee:
                  </p>

                  <ul className="text-sm sm:text-base mb-4 space-y-2">
                    <li className="flex items-start justify-center pr-20 gap-2">
                      <Image
                        src={Cookie}
                        alt="Cookie"
                        className="w-7 h-9 object-contain"
                      />
                      <span className="text-black">
                        Has 99.87% healthy fats with minimal moisture content
                      </span>
                    </li>
                    <li className="flex items-start justify-center pr-20 gap-2">
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
                    <li className="flex items-start justify-center pr-20 gap-2">
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
                  <Link href={'/products'}>
                  <button className="bg-red-800 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                    Order Now
                  </button>
                  </Link>
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
      <TrendingProductsSection />
      {/* Section 4 */}
      <Banner4 />
    </div>
  );
};

export default HeroSection;
