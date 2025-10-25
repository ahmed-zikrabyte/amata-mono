"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import LoaderImage from "../../assets/Group.png";
import { motion, AnimatePresence } from "framer-motion";

const GlobalLoader = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // preload the image
  useEffect(() => {
    const img = new window.Image();
    img.src = LoaderImage.src;
    img.onload = () => setImageLoaded(true);
  }, []);

  if (!imageLoaded) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <div className="relative w-28 h-28">
            <Image
              src={LoaderImage}
              alt="Loading..."
              fill
              priority
              className="object-contain"
              sizes="112px"
            />
          </div>
          <div className="mt-4 text-gray-800 text-sm tracking-wide animate-pulse">
            Loading, please wait...
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GlobalLoader;