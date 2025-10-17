"use client"
import React, { useState } from "react";
import logoIcon from "../../assets/Group.png";
import Image from "next/image";
import { Search, ShoppingCart, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-16">
      <div className="container">
        <nav className="bg-[#dfd7d0] py-3 px-4 md:px-8 lg:px-24 relative">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center">
              <Image 
                src={logoIcon} 
                alt="Amata logo" 
                className="h-10 w-14 md:h-12 md:w-16 lg:h-14 lg:w-20 object-contain" 
              />
            </div>

            {/* Nav-link Section - Desktop */}
            <div className="hidden lg:flex justify-center">
              <ul className="flex items-center space-x-14">
                <li className="text-gray-800 hover:text-gray-600 transition-colors font-medium text-sm cursor-pointer">
                  Products
                </li>
                <li className="text-gray-800 hover:text-gray-600 transition-colors font-medium text-sm cursor-pointer">
                  About Us
                </li>
                <li className="text-gray-800 hover:text-gray-600 transition-colors font-medium text-sm cursor-pointer">
                  Contact
                </li>
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
                <button className="text-gray-800 hover:text-gray-600 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>

              {/* Button Section */}
              <div className="flex items-center">
                <button className="bg-[#613815] text-white px-6 py-2 rounded-lg hover:bg-[#7A6348] transition-colors text-sm font-medium">
                  Sign In
                </button>
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
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden absolute top-full left-0 right-0 bg-[#dfd7d0] border-t border-gray-300 transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100 visible' : 'max-h-0 opacity-0 invisible'
          }`}>
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
                <li className="text-gray-800 hover:text-gray-600 transition-colors font-medium text-base cursor-pointer py-2 border-b border-gray-300">
                  Products
                </li>
                <li className="text-gray-800 hover:text-gray-600 transition-colors font-medium text-base cursor-pointer py-2 border-b border-gray-300">
                  About Us
                </li>
                <li className="text-gray-800 hover:text-gray-600 transition-colors font-medium text-base cursor-pointer py-2 border-b border-gray-300">
                  Contact
                </li>
              </ul>

              {/* Mobile Sign In Button */}
              <div className="pt-2">
                <button className="bg-[#613815] text-white w-full py-3 rounded-lg hover:bg-[#7A6348] transition-colors text-base font-medium">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;