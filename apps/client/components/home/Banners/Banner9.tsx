import React from "react";
import bgSec9 from "../../../assets/homeBgSecImg9.png";
import BgSecImg1 from "../../../assets/BgSec9Img1.png";
import BgSecImg2 from "../../../assets/BgSec9Img2.png";
import Image from "next/image";
import { Button } from "../../../../../packages/ui/src/components/button";
import Link from "next/link";

const Banner9 = () => {
  return (
    <div>
      <div className="w-full">
        <div
          className="relative w-full z-0 min-h-[200px] md:min-h-[300px] lg:min-h-[400px]"
          style={{
            backgroundImage: `url(${bgSec9.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/10 lg:bg-black/20 z-10"></div>

          <div className="relative z-20 h-full">
            <div className="container mx-auto px-4 sm:px-6 lg:px-20 h-full flex items-center py-10 md:py-14 lg:py-20">
              <div className="w-full max-w-6xl mx-auto">
                {/* Mobile Version (0px - 767px) */}
                <div className="block md:hidden">
                  <div className="flex flex-col items-center">
                    {/* Two Images Side by Side (like tablet) */}
                    <div className="flex flex-row justify-center gap-4 sm:gap-6 mb-8">
                      <div className="relative w-36 h-56 sm:w-44 sm:h-64 rounded-full overflow-hidden">
                        <Image
                          src={BgSecImg1}
                          alt="Founder story image 1"
                          className="object-cover object-[90%_center] sm:object-[90%_center] lg:object-[90%_center]"
                          fill
                          sizes="(max-width: 640px) 144px, 176px"
                        />
                      </div>
                      <div className="relative w-36 h-56 sm:w-44 sm:h-64 rounded-full overflow-hidden">
                        <Image
                          src={BgSecImg2}
                          alt="Founder story image 2"
                          className="object-contain object-[75%_center] md:object-[90%_center]"
                          fill
                          sizes="(max-width: 640px) 144px, 176px"
                        />
                      </div>
                    </div>

                    {/* Founder's Story Content - remains the same */}
                    <div className="text-center">
                      <span className="inline-block bg-black/20 text-white px-6 py-3 rounded-full font-semibold text-base mb-6">
                        Founder's Story
                      </span>

                      <p className="text-white text-sm sm:text-base leading-relaxed sm:leading-loose">
                        I'm Abhishek Singh, founder of Amata Farms, but my story
                        starts much before my name was ever on a label. I was
                        born in Jamadoba, Dhanbad, Jharkhand, into a family that
                        valued purity over convenience.
                        <br />
                        <br />
                        Back in the 1980s, my father moved to Mumbai for work.
                        Like every newcomer to the city, he dreamt of a better
                        life for his family. But there was one thing he couldn't
                        compromise on – the purity of milk and ghee that we were
                        used to in our hometown.
                        <br />
                        <br />
                        The challenge in Mumbai was real. Packaged milk lacked
                        taste, freshness, and the wholesome goodness he had
                        grown up with. Ghee available in markets had no aroma,
                        no grainy texture, and no assurance of purity. And my
                        father knew – food is not just food, it's the foundation
                        of health.
                      </p>

                      <Link href={"/about"}>
                        <Button className="mt-8 px-3 py-3 text-xs text-white font-medium transition-colors">
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Tablet Version (768px - 1023px) */}
                <div className="hidden md:block lg:hidden">
                  <div className="flex flex-col items-center">
                    {/* Two Images Side by Side */}
                    <div className="flex justify-center gap-8 mb-10">
                      <div className="relative w-56 h-72 md:w-64 md:h-80 rounded-full overflow-hidden">
                        <Image
                          src={BgSecImg1}
                          alt="Founder story image 1"
                          className="object-cover"
                          fill
                          sizes="(max-width: 1023px) 224px"
                        />
                      </div>
                      <div className="relative w-56 h-72 md:w-64 md:h-80 rounded-full overflow-hidden">
                        <Image
                          src={BgSecImg2}
                          alt="Founder story image 2"
                          className="object-cover"
                          fill
                          sizes="(max-width: 1023px) 224px"
                        />
                      </div>
                    </div>

                    {/* Founder's Story Content */}
                    <div className="text-center max-w-3xl">
                      <span className="inline-block bg-black/20 text-white px-8 py-3 rounded-full font-semibold text-lg mb-8">
                        Founder's Story
                      </span>

                      <p className="text-white text-lg leading-loose">
                        I'm Abhishek Singh, founder of Amata Farms, but my story
                        starts much before my name was ever on a label. I was
                        born in Jamadoba, Dhanbad, Jharkhand, into a family that
                        valued purity over convenience.
                        <br />
                        <br />
                        Back in the 1980s, my father moved to Mumbai for work.
                        Like every newcomer to the city, he dreamt of a better
                        life for his family. But there was one thing he couldn't
                        compromise on – the purity of milk and ghee that we were
                        used to in our hometown.
                        <br />
                        <br />
                        The challenge in Mumbai was real. Packaged milk lacked
                        taste, freshness, and the wholesome goodness he had
                        grown up with. Ghee available in markets had no aroma,
                        no grainy texture, and no assurance of purity. And my
                        father knew – food is not just food, it's the foundation
                        of health.
                      </p>

                      <Link href={"/about"}>
                        <Button className="mt-10 px-3 py-4 text-sm text-white font-medium transition-colors">
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Desktop Version (1024px and above) */}
                <div className="hidden lg:flex flex-row items-center justify-between gap-12 xl:gap-16">
                  {/* Images on Left Side - Side by Side */}
                  <div className="w-1/2 flex justify-center">
                    <div className="flex flex-row gap-6 xl:gap-8">
                      <div className="relative w-56 h-80 xl:w-64 xl:h-96 rounded-full overflow-hidden">
                        <Image
                          src={BgSecImg1}
                          alt="Founder story image 1"
                          className="object-cover"
                          fill
                          sizes="(min-width: 1024px) 224px, 256px"
                        />
                      </div>
                      <div className="relative w-56 h-80 xl:w-64 xl:h-96 rounded-full overflow-hidden">
                        <Image
                          src={BgSecImg2}
                          alt="Founder story image 2"
                          className="object-cover"
                          fill
                          sizes="(min-width: 1024px) 224px, 256px"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content on Right Side */}
                  <div className="w-1/2">
                    <div className="max-w-2xl">
                      <span className="bg-black/20 text-white px-8 py-2  rounded-full font-semibold text-xl mb-10">
                        Founder's Story
                      </span>

                      <p className="text-white text-[13px] xl:text-sm mt-5">
                        I'm Abhishek Singh, founder of Amata Farms, but my story
                        starts much before my name was ever on a label. I was
                        born in Jamadoba, Dhanbad, Jharkhand, into a family that
                        valued purity over convenience.
                        <br />
                        <br />
                        Back in the 1980s, my father moved to Mumbai for work.
                        Like every newcomer to the city, he dreamt of a better
                        life for his family. But there was one thing he couldn't
                        compromise on – the purity of milk and ghee that we were
                        used to in our hometown.
                        <br />
                        <br />
                        The challenge in Mumbai was real. Packaged milk lacked
                        taste, freshness, and the wholesome goodness he had
                        grown up with. Ghee available in markets had no aroma,
                        no grainy texture, and no assurance of purity. And my
                        father knew – food is not just food, it's the foundation
                        of health.
                      </p>
                      <Link href={"/about"}>
                        <Button className="mt-12 px-3 py-5 text-sm text-white font-medium transition-colors">
                          Read More
                        </Button>
                      </Link>
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

export default Banner9;
