"use client";

import React, { useEffect, useState } from "react";
import BgSec5 from "../../../assets/homeBgSec5.png";
import Image from "next/image";

// Components
import { Button } from "@workspace/ui/components/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@workspace/ui/components/carousel";

// Hooks & APIs
import { useApi } from "@/hooks/useApi";
import { productApi } from "@/lib/api/productApi";
import { Product } from "@/lib/types/product";

// Custom Components
import ProductCard from "@/components/products/productCard";
import Banner6 from "./Banner6";

const Banner5 = () => {
  const { execute, data, loading } = useApi<Product[]>();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts()
  }, []);

  const fetchProducts = async () => {
    try {
      const response: any = await execute(productApi.getAll({category: "", search: ""})).then(res => res.data)
      setProducts(response.data.products as any)
    } catch(error: any) {
      console.log(error?.response.data)
    }
  }

  return (
    <div>
      <div
        className="relative w-full z-0 min-h-[600px] sm:min-h-[650px] lg:min-h-[700px]"
        style={{
          backgroundImage: `url(${BgSec5.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative z-20 h-full">
          <div className="container mx-auto px-9 sm:px-6 lg:px-20 h-full flex items-center pt-10">
            <div className="w-full max-w-7xl mx-auto">
              {/* Header Section */}
              <div className="text-center mb-8 sm:mb-12">
                <h1 className="text-black font-bold text-2xl lg:text-3xl xl:text-4x mb-2">
                  Our Pure Ghee Collection
                </h1>
                <p className="text-black font-medium text-xs sm:text-sm lg:text-base max-w-2xl mx-auto">
                  Explore our range of traditionally crafted ghees — pure,
                  nutritious, and full of flavor.
                </p>
              </div>

              {/* Product Carousel */}
              {loading ? (
                <p className="text-center text-gray-700 py-10">
                  Loading products...
                </p>
              ) : products && products.length > 0 ? (
                <Carousel opts={{ align: "start", loop: true }} className="w-full">
                  <CarouselContent>
                    {products.map((product) => (
                      <CarouselItem
                        key={product._id}
                        className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 px-2"
                      >
                        <ProductCard
                          product={product}
                          onShopNow={(p) => console.log("Shop now:", p)}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {/* Custom Arrows */}
                  <CarouselPrevious className="ml-4 sm:ml-2 border border-primary text-primary bg-white hover:bg-red-100 transition" />
                  <CarouselNext className="mr-7 sm:mr-5 bg-primary text-white hover:bg-primary/70 hover:text-white transition" />
                </Carousel>
              ) : (
                <p className="text-center text-gray-600 py-10">
                  No products found
                </p>
              )}

              {/* View All Button */}
              <div className="text-center mt-8 sm:mt-12">
                <Button className="text-white font-semibold py-4 px-4 sm:py-4 rounded-lg text-sm sm:text-base lg:text-sm transition-all duration-300 transform hover:scale-105 shadow-lg">
                  View all
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner5;
