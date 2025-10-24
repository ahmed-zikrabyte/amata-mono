import React from "react";
import Image from "next/image";
import homeBgSec11 from "../../../assets/homeBgSec3.png";
import mainBlog from "../../../assets/bgSec11MainBlog.png";
import subBlog1 from "../../../assets/bgSec11SubBlog1.png";
import subBlog2 from "../../../assets/bgSec11SubBlog2.png";
import subBlog3 from "../../../assets/bgSec11SubBlog3.png";
import { Button } from "../../../../../packages/ui/src/components/button";
import ProductListPage from "../../products/ProductListPage";

const Banner11 = () => {
  return (
    <div className="w-full">
      <div
        className="relative w-full z-0 min-h-[400px] md:min-h-[500px] lg:min-h-[600px]"
        style={{
          backgroundImage: `url(${homeBgSec11.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative z-20 h-full px-4 lg:px-20 xl:px-24">
          <div className="container h-full flex flex-col py-10 md:py-14 lg:py-20">
            <div className="w-full mx-auto">
              {/* Heading Section */}
              <div className="mb-8 md:mb-12">
                <span className="inline-block px-4 py-2 bg-gray-200 text-sm md:text-base rounded-full font-semibold text-gray-800">
                  Blogs
                </span>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">
                  <div className="flex-1">
                    <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-gray-900 mb-2">
                      Learn the Science of Pure Ghee
                    </h1>
                    <p className="text-sm md:text-base text-gray-700">
                      Explore our blog for insights, tips, and traditional
                      wisdom on ghee — from ancient Ayurvedic practices to
                      modern health benefits.
                    </p>
                  </div>
                  <Button className="bg-amber-900 hover:bg-amber-800 text-white px-6 py-2 rounded-lg whitespace-nowrap">
                    View all
                  </Button>
                </div>
              </div>

              {/* Blogs Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Left Side - Main Blog */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
                  <div className="relative w-full h-64 md:h-80 lg:h-96">
                    <Image
                      src={mainBlog}
                      alt="5 Proven Health Benefits of A2 Cow Ghee"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                      5 Proven Health Benefits of A2 Cow Ghee
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 mb-4 flex-1">
                      Discover how A2 Ghee supports digestion, immunity, and
                      energy. Learn why it's considered a superfood in Ayurveda
                      and modern wellness.
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Sept 15, 2025</span>
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>4 min read</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Sub Blogs */}
                <div className="flex flex-col gap-6">
                  {/* Sub Blog 1 */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
                      <Image
                        src={subBlog1}
                        alt="Bilona Method: The Ancient Secret Behind Pure Ghee"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 192px"
                      />
                    </div>
                    <div className="p-5 md:p-6 flex-1 flex flex-col">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                        Bilona Method: The Ancient Secret Behind Pure Ghee
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 flex-1">
                        Understand the traditional hand-churning Bilona process
                        — ...
                      </p>
                      <div className="flex items-center justify-between text-xs md:text-sm text-gray-500">
                        <span>Sept 15, 2025</span>
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>4 min read</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sub Blog 2 */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
                      <Image
                        src={subBlog3}
                        alt="How to Identify Pure Ghee at Home"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 192px"
                      />
                    </div>
                    <div className="p-5 md:p-6 flex-1 flex flex-col">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                        How to Identify Pure Ghee at Home
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 flex-1">
                        Learn simple tests and tips to check ghee purity using
                        smell..
                      </p>
                      <div className="flex items-center justify-between text-xs md:text-sm text-gray-500">
                        <span>Sept 15, 2025</span>
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>4 min read</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sub Blog 3 */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
                      <Image
                        src={subBlog2}
                        alt="Cooking with Ghee: Modern Recipes for a Traditional Touch"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 192px"
                      />
                    </div>
                    <div className="p-5 md:p-6 flex-1 flex flex-col">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                        Cooking with Ghee: Modern Recipes for a Traditional
                        Touch
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 flex-1">
                        From sautéing veggies to baking desserts — explore
                        delicio ...
                      </p>
                      <div className="flex items-center justify-between text-xs md:text-sm text-gray-500">
                        <span>Sept 15, 2025</span>
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>4 min read</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner11;
