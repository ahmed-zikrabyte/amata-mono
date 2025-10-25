"use client";

"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import GroupLogo from "../../assets/FooterLogo.png";
import fssaiLogo from "../../assets/fssaiLogo.png";
import instaLogo from "../../assets/instaLogo.png";
import fbLogo from "../../assets/fbLogo.png";
import whatsApp from "../../assets/whatappLogo.svg";
import twitter from "../../assets/Twitter.svg";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { usePathname } from "next/navigation";

const FooterSec = () => {
  const pathname = usePathname();
  useEffect(() => {
    console.log({ pathname });
  }, [pathname]);
  return (
    <footer className={`${pathname === "/profile" ? "hidden" : "w-full"} `}>
      <div
        className="relative w-full z-0"
        style={{
          backgroundColor: "#4d4034",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative z-20 h-full px-4 lg:px-20 xl:px-24">
          <div className="container py-10 sm:py-12 md:py-14 lg:py-16">
            <div className="w-full mx-auto">
              {/* Main Footer Content */}
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-20 mb-8 lg:mb-10">
                {/* Left Side */}
                <div className="lg:w-1/4 space-y-6 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-xl flex justify-center items-center">
                    <Image
                      src={GroupLogo}
                      alt="Amata Farms Logo"
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-white text-sm leading-relaxed text-center">
                    Welcome to our e-commerce company, where the future of Ghee
                    shopping has arrived. Experience seamless browsing,
                    effortless checkout, and premium products.
                  </p>
                  <div className="flex justify-center gap-4">
                    {[whatsApp, instaLogo, fbLogo, twitter].map((icon, i) => (
                      <a
                        key={i}
                        href="#"
                        className="w-10 h-10 rounded flex items-center justify-center"
                      >
                        <Image
                          src={icon}
                          alt="social icon"
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 lg:gap-10 xl:gap-12">
                  {/* Quick Links */}
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">
                      Quick Links
                    </h3>
                    <ul className="space-y-3">
                      <li>
                        <Link
                          href="/about"
                          className="text-white text-sm hover:text-amber-400 transition-colors flex items-center gap-2 group"
                        >
                          <span className="text-lg group-hover:translate-x-1 transition-transform">
                            ›
                          </span>
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/products"
                          className="text-white text-sm hover:text-amber-400 transition-colors flex items-center gap-2 group"
                        >
                          <span className="text-lg group-hover:translate-x-1 transition-transform">
                            ›
                          </span>
                          Products
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/contact"
                          className="text-white text-sm hover:text-amber-400 transition-colors flex items-center gap-2 group"
                        >
                          <span className="text-lg group-hover:translate-x-1 transition-transform">
                            ›
                          </span>
                          Contact Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/blogs"
                          className="text-white text-sm hover:text-amber-400 transition-colors flex items-center gap-2 group"
                        >
                          <span className="text-lg group-hover:translate-x-1 transition-transform">
                            ›
                          </span>
                          Blogs
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Help Center */}
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">
                      Help Center
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "FAQs",
                        "Terms & Conditions",
                        "Support",
                        "Privacy Policy",
                        "Shipping",
                        "Return/Refund",
                      ].map((link, index) => (
                        <li key={index}>
                          <Link
                            href="#"
                            className="text-white text-sm hover:text-amber-400 transition-colors flex items-center gap-2 group"
                          >
                            <span className="text-lg group-hover:translate-x-1 transition-transform">
                              ›
                            </span>
                            {link}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Newsletter */}
                  <div className="col-span-2 sm:col-span-3 lg:col-span-1">
                    <div className="space-y-5 text-center lg:text-left">
                      {/* Input + Button */}
                      <div className="rounded-lg overflow-hidden border border-white/30 flex flex-col sm:flex-row">
                        <Input
                          type="email"
                          placeholder="Email address"
                          className="bg-transparent text-center sm:text-start border-0 text-white placeholder:text-gray-300 text-sm focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-3 py-2"
                        />
                        <Button className="bg-amber-800 hover:bg-amber-900 text-white font-medium border-0 text-sm px-6 py-2 rounded-none sm:rounded-l-none sm:w-auto w-full mt-3 sm:mt-0">
                          Subscribe
                        </Button>
                      </div>

                      {/* Description */}
                      <p className="text-white text-sm leading-relaxed max-w-xs mx-auto lg:mx-0">
                        Get 10% off your first purchase and be the first to know
                        about new launches and exclusive deals!
                      </p>

                      {/* FSSAI Logo */}
                      <div className="pt-4 sm:pt-10 flex justify-center lg:justify-start">
                        <Image
                          src={fssaiLogo}
                          alt="FSSAI Certified"
                          width={120}
                          height={50}
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="border-t border-gray-600 pt-6">
                <p className="text-white text-sm text-center">
                  © Amata. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSec;
