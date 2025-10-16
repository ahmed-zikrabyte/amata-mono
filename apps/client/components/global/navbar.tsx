import React from "react";
import logoIcon from "../../assets/Group.png";
import Image from "next/image";
import { Search, ShoppingCart } from "lucide-react";

const Navbar = () => {
  return (
    <div>
      <div className="container">
        <nav className="bg-[#dfd7d0] py-3 px-24">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center">
              <Image src={logoIcon} alt="Amata logo" className="h-14 w-20 object-contain" />
            </div>

            {/* Nav-link Section */}
            <div className="flex justify-center">
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

            {/* Search Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white rounded-lg px-3 py-1 border border-gray-300">
                <Search className="w-8 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-transparent outline-none text-black font-bold px-2 py-1 w-full"
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
                <button className="bg-[#613815] text-white px-6 py-3 rounded-lg hover:bg-[#7A6348] transition-colors text-sm font-medium">
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
