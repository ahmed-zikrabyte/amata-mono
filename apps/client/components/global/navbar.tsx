"use client";
import React, { useState } from "react";
import logoIcon from "../../assets/Group.png";
import Image from "next/image";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[rgb(223,215,208)]">
      <nav className="w-full py-3 px-4 md:px-8 lg:px-24 h-20">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href={"/"}>
            <div className="flex items-center">
              <Image
                src={logoIcon}
                alt="Amata logo"
                className="h-10 w-14 md:h-12 md:w-16 lg:h-14 lg:w-20 object-contain"
              />
            </div>
          </Link>

          {/* Nav-link Section - Desktop */}
          <div className="hidden lg:flex justify-center flex-1 mx-8">
            <ul className="flex items-center space-x-14">
              <Link href={"/products"}>
                <li className="text-gray-800 hover:text-gray-600 transition-colors font-medium text-sm cursor-pointer">
                  Shop
                </li>
              </Link>
              <Link href={"/our-process"}>
                <li className="text-gray-800 hover:text-gray-600 transition-colors font-medium text-sm cursor-pointer">
                  Our Process
                </li>
              </Link>
              <Link href={"/about"}>
                <li className="text-gray-800 hover:text-gray-600 transition-colors font-medium text-sm cursor-pointer">
                  About Us
                </li>
              </Link>
              <Link href={"/lab-report"}>
                <li className="text-gray-800 hover:text-gray-600 transition-colors font-medium text-sm cursor-pointer">
                  Lab Report
                </li>
              </Link>
            </ul>
          </div>

          {/* Search and Actions Section - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center bg-white rounded-lg px-3 py-1 border border-gray-300">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-black font-medium px-2 py-1 w-32"
              />
            </div>

            {/* Cart icon Section */}
            <div className="flex items-center">
              <Link href={"/cart"}>
                <div className="text-gray-800 hover:text-gray-600 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                </div>
              </Link>
            </div>

            {/* Button Section */}
            <div className="flex items-center">
              <Link href={"/signup"}>
                <div className="bg-[#613815] text-white px-6 py-2 rounded-lg hover:bg-[#7A6348] transition-colors text-sm font-medium">
                  Sign In
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile Search and Cart */}
          <div className="flex lg:hidden items-center space-x-4">
            <button className="text-gray-800 hover:text-gray-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-gray-800 hover:text-gray-600 transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              className="text-gray-800 hover:text-gray-600 transition-colors"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden w-full bg-[#dfd7d0] border-t border-gray-300 transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100 visible"
              : "max-h-0 opacity-0 invisible"
          }`}
        >
          <div className="px-4 py-4">
            {/* Mobile Search Bar */}
            <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-gray-300 mb-4">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-black font-medium px-2 py-1 w-full"
              />
            </div>

            {/* Mobile Navigation Links */}
            <ul className="space-y-3 mb-4">
              <Link href={"/products"}>
                <li className="text-gray-800 hover:text-gray-600 transition-colors font-medium text-base cursor-pointer py-2 border-b border-gray-300">
                  Products
                </li>
              </Link>
              <Link href={"/about"}>
                <li className="text-gray-800 hover:text-gray-600 transition-colors font-medium text-base cursor-pointer py-2 border-b border-gray-300">
                  About Us
                </li>
              </Link>
              <Link href={"/contact"}>
                <li className="text-gray-800 hover:text-gray-600 transition-colors font-medium text-base cursor-pointer py-2 border-b border-gray-300">
                  Contact
                </li>
              </Link>
            </ul>

            {/* Mobile Sign In Button */}
            <div className="pt-2">
              <Link href={"/signup"}>
                <button className="bg-[#613815] text-white w-full py-3 rounded-lg hover:bg-[#7A6348] transition-colors text-base font-medium">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
