"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import LoginPageImg from "../../assets/images/auth/login-page-img.png";
import { Dot } from "lucide-react";

const AuthSideComponent = () => {
  const lists: string[][] = [
    [
      "Crafted with care, straight from our Gir cows.",
      "Experience ghee made the traditional Bilona way.",
    ],
    [
      "Pure nourishment in every spoonful.",
      "From our family farm to your kitchen.",
    ],
    [
      "Taste the golden tradition of Amata.",
      "Authenticity that your health deserves.",
    ],
  ];

  const [index, setIndex] = useState(0);

  // Change list every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % lists.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [lists.length]);

  return (
    <div className="max-lg:hidden w-1/2 aspect-square bg-gradient-to-b from-[#F9D57B] to-amber-50 rounded-2xl flex flex-col items-center justify-center p-10 space-y-10 text-center overflow-hidden">
      <div className="space-y-6">
        <p className="text-2xl font-semibold text-amber-950">
          Welcome back to the <br />
          Taste of Purity
        </p>
        <p className="text-black/70">
          Log in to your Amata account and continue your journey with the finest
          A2 Gir Cow Ghee — pure, traditional, and made with love from our farms
          in Jharkhand.
        </p>
      </div>

      {/* Image Container */}
      <div className="relative h-60 w-full flex items-center text-start text-white">
        {/* Image */}
        <div className="relative w-full h-full">
          <Image
            src={LoginPageImg}
            alt="Login visual"
            fill
            className="object-contain"
          />

          {/* Dots fixed to top-right of the image */}
          <div className="absolute top-4 right-4 flex items-center -space-x-4 text-gray-400">
            <Dot className={`size-6 ${index === 0 && 'text-white'}`} />
            <Dot className={`size-6 ${index === 1 && 'text-white'}`} />
            <Dot className={`size-6 ${index === 2 && 'text-white'}`} />
          </div>
        </div>

        {/* Animated List (overlay) */}
        <ul className="absolute pl-16 pt-6 list-disc space-y-2 p-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {lists[index]?.map((item, i) => (
                <li key={i} className="max-xl:text-sm">
                  {item}
                </li>
              ))}
            </motion.div>
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
};

export default AuthSideComponent;
