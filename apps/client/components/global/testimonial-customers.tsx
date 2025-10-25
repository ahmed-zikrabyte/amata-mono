import Image from "next/image";
import React from "react";
import TestimonialImage from "../../assets/images/testimonial/testimonial-section-img.png";
import { Badge } from "@workspace/ui/components/badge";
import { Separator } from "@workspace/ui/components/separator";
import TestimonialVector from "../../assets/images/testimonial/testimonial-vector.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@workspace/ui/components/carousel";
import {Avatar, AvatarFallback, AvatarImage} from "@workspace/ui/components/avatar";
import person1 from "../../assets/Review1.png"
import person2 from "../../assets/Review1.png"
import person3 from "../../assets/Review1.png"
import { Star } from "lucide-react";

const TestimonialCustomers = () => {
  return (
    <div className="px-6 lg:px-20 py-6 md:py-8 w-full min-h-[430px] md:h-[430px] rounded-3xl bg-[#8B511F] flex flex-col md:flex-row justify-evenly items-center gap-6">
      {/* Image Section */}
      <div className="relative h-40 md:h-64 lg:h-full aspect-square shrink-0">
        <Image
          src={TestimonialImage}
          fill
          alt="testimonial img"
          className="object-cover"
          style={{
            WebkitMaskImage:
              "radial-gradient(circle at center, black 40%, transparent 70%)",
            maskImage:
              "radial-gradient(circle at center, black 40%, transparent 70%)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "cover",
            maskSize: "cover",
          }}
        />
      </div>

      {/* Content Section */}
      <div className="w-full md:w-1/2 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="h-full p-2 md:p-5 space-y-3 md:space-y-5">
            <Badge>Testimonial</Badge>
            <h5 className="text-lg md:text-2xl lg:text-3xl text-white font-semibold">
              What our Customers Say About Us
            </h5>
            <Separator className="hidden md:block" />
          </div>
          <div className="hidden md:block">
            <div className="max-lg:hidden relative h-full w-20 aspect-square shrink-0">
              <Image
                src={TestimonialVector}
                fill
                alt=""
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="mt-4 md:mt-0">
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem className="p-4">
                <div className="space-y-4">
                  <p className="text-white/90 text-sm md:text-base">
                    "The Gir Cow A2 Bilona Ghee tastes just like the one my
                    grandmother used to make. Rich aroma, authentic flavor, and
                    amazing quality — I won't go back to any other brand."
                  </p>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={person1.src} alt="Person 1" />
                      <AvatarFallback>PM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white font-medium text-sm md:text-base">Priya Menon - Bengaluru</p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="p-4">
                <div className="space-y-4">
                  <p className="text-white/90 text-sm md:text-base">
                    "The Gir Cow A2 Bilona Ghee tastes just like the one my
                    grandmother used to make. Rich aroma, authentic flavor, and
                    amazing quality — I won't go back to any other brand."
                  </p>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={person2.src} alt="Person 2" />
                      <AvatarFallback>PM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white font-medium text-sm md:text-base">Priya Menon - Bengaluru</p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="p-4">
                <div className="space-y-4">
                  <p className="text-white/90 text-sm md:text-base">
                    "The Gir Cow A2 Bilona Ghee tastes just like the one my
                    grandmother used to make. Rich aroma, authentic flavor, and
                    amazing quality — I won't go back to any other brand."
                  </p>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={person3.src} alt="Person 3" />
                      <AvatarFallback>PM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white font-medium text-sm md:text-base">Priya Menon - Bengaluru</p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            
            {/* Navigation buttons positioned at the bottom center */}
            <div className="flex justify-end items-center gap-2 mt-4">
              <CarouselPrevious className="static md:-translate-y-16 md:-translate-x-20" />
              <CarouselNext className="static md:-translate-y-16 md:-translate-x-20" />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCustomers;