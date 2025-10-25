"use client";
import React from "react";
import Image from "next/image";
import TestAyu1 from "../../assets/TestmonialsAyu1.png";
import TestAyu2 from ".././assets/TestmonialsAyu2.png";
import TestAyu3 from "../../assets/TestmonialsAyu3.png";
import TestAyu4 from "../../assets/TestmonialsAyu4.png";
import topView from "../../assets/Soup-bowl.png";
import { motion } from "framer-motion";

const AyurvedicSuperfoodSection = () => {
  return (
    <section className="py-8 sm:py-12 bg-amber-50">
  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-8 text-center text-amber-900">
    The Golden Ayurvedic Superfood
  </h2>

  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 px-6 sm:px-10 lg:px-20">
    {[
      {
        src: TestAyu1,
        alt: "Nutritional Benefits",
        title: "Nutritional Benefits",
      },
      {
        src: TestAyu4,
        alt: "Ancient Tradition",
        title: "Ancient Tradition",
      },
      {
        src: TestAyu3,
        alt: "Pure & Natural",
        title: "Pure & Natural",
      },
      {
        src: TestAyu2,
        alt: "Culinary Versatility",
        title: "Culinary Versatility",
      },
    ].map((item, index) => (
      <div
        key={index}
        className="flex flex-col items-center text-center space-y-3 transition-transform hover:scale-105"
      >
        <Image
          src={item.src}
          alt={item.alt}
          width={112}
          height={112}
          className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain drop-shadow-md"
        />
        <div className="text-xs sm:text-sm lg:text-base xl:text-lg font-semibold text-amber-900 leading-snug">
          {item.title}
        </div>
      </div>
    ))}
  </div>
</section>

  );
};

export default AyurvedicSuperfoodSection;
