import React from "react";
import BgSec5 from "../../../assets/homeBgSec5.png";
import Image from "next/image";

// Shadcn UI Components
import { Card, CardContent } from "@workspace/ui/components/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@workspace/ui/components/carousel";

// Mock product images - replace with your actual imports
import product1 from "../../../assets/ProductCorsolImg1.png";
import product2 from "../../../assets/ProdutCorsolImg2.png";
import product3 from "../../../assets/ProductCorsolImg1.png";
import product4 from "../../../assets/ProdutCorsolImg2.png";
import product5 from "../../../assets/ProductCorsolImg1.png";
import product6 from "../../../assets/ProdutCorsolImg2.png";
import { Button } from "@workspace/ui/components/button";
import Banner6 from "./Banner6";

const Banner5 = () => {
  const products = [
    {
      id: 1,
      category: "Traditional",
      title: "Gir Cow A2 Bilona Ghee",
      rating: 4.8,
      price: "₹849/500ml",
      image: product1,
    },
    {
      id: 2,
      category: "Buffalo A2 Oats",
      title: "Buffalo A2 Cultured Ghee",
      rating: 4.8,
      price: "₹799/500ml",
      image: product2,
    },
    {
      id: 3,
      category: "Aromatic",
      title: "Brahmi Herbal Ghee",
      rating: 4.8,
      price: "₹799/500ml",
      image: product3,
    },
    {
      id: 4,
      category: "Flavored",
      title: "Garlic Infused Ghee",
      rating: 4.8,
      price: "₹799/500ml",
      image: product4,
    },
    {
      id: 5,
      category: "Traditional",
      title: "Gir Cow A2 Bilona Ghee",
      rating: 4.8,
      price: "₹849/500ml",
      image: product5,
    },
    {
      id: 6,
      category: "Buffalo A2 Oats",
      title: "Buffalo A2 Cultured Ghee",
      rating: 4.8,
      price: "₹799/500ml",
      image: product6,
    },
  ];

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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center pt-10">
          <div className="w-full max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-black font-bold text-xl sm:text-2xl lg:text-3xl mb-2">
                Our Pure Ghee Collection
              </h1>
              <p className="text-black font-medium text-xs sm:text-sm lg:text-base max-w-2xl mx-auto">
                Explore our range of traditionally crafted ghees - pure, nutritious, and full of flavor.
              </p>
            </div>

            {/* Shadcn UI Carousel */}
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent>
                {products.map((product, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <div className="px-4">
                      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-0">
                          {/* Product Image */}
                          <div className="relative h-40 sm:h-36 lg:h-40">
                            <Image
                              src={product.image}
                              alt={product.title}
                              fill
                              className="object-cover rounded-t-lg"
                            />
                          </div>
                          
                          {/* Product Info */}
                          <div className="p-4 sm:p-6">
                            {/* Category */}
                            <p className="text-gray-600 font-medium text-[8px] sm:text-[10px] mb-2">
                              Category: {product.category}
                            </p>
                            
                            <div className="flex justify-between items-center">
                                {/* Title */}
                            <h3 className="font-medium text-gray-800 text-[10px] sm:text-[13px] lg:text-[15px]">
                              {product.title}
                            </h3>
                            
                            {/* Rating */}
                            <div className="">
                              <span className="text-yellow-400 text-sm">⭐</span>
                              <span className="text-gray-600 text-xs sm:text-sm">{product.rating}*</span>
                            </div>
                            </div>
                            
                            
                            {/* Price */}
                            <p className="text-amber-700 font-bold text-base sm:text-lg lg:text-lg mt-2">
                              {product.price}
                            </p>
                            
                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-5">
                                <Button className="border-2 border-red-700 px-4 py-2 bg-white text-red-600 font-semibold text-sm hover:text-white">
                                    Add to cart
                                </Button>
                                <Button>
                                    Show Now
                                </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ml-7"/>
              <CarouselNext className="mr-7" />
            </Carousel>

            {/* View All Button */}
            <div className="text-center mt-8 sm:mt-12">
              <Button className="bg-red-700 hover:bg-amber-700 text-white font-semibold py-4 px-8 sm:py-4 sm:px-12 rounded-lg text-sm sm:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                View all
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Banner6/>
    </div>
  );
};

export default Banner5;