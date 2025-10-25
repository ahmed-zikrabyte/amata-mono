"use client";
import React, { useEffect, useState } from "react";
import logoIcon from "../../assets/Group.png";
import Image from "next/image";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "../../hooks/useAuthStore";
import { usePathname } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { useApi } from "../../hooks/useApi";
import { productApi } from "../../lib/api/productApi";
import { Product } from "../../lib/types/product";
import ProductCard from "../products/productCard";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, checkAuth } = useAuthStore();
  const pathname = usePathname();
  const [activePage, setActivePage] = useState<
    "home" | "products" | "about" | "contact"
  >("home");

  const [searchProducts, setSearchProducts] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const { execute } = useApi();
  const [showMobileSearch, setShowMobileSearch] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    checkAuth();
    setIsMenuOpen(false);
    setSearchProducts("");
    setShowMobileSearch(false);
    console.log(pathname);
    if (pathname === "/") {
      setActivePage("home");
    } else if (pathname.startsWith("/products")) {
      setActivePage("products");
    } else if (pathname.startsWith("/about")) {
      setActivePage("about");
    } else if (pathname.startsWith("/contact")) {
      setActivePage("contact");
    }
  }, [pathname]);

  const fetchProducts = async () => {
    try {
      const response: any = await execute(
        productApi.getAll({ category: "", search: searchProducts })
      ).then((res) => res.data);
      console.log({ response });
      setProducts(response?.data.products);
    } catch (error: any) {
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    // Skip fetching when input is empty
    if (!searchProducts.trim()) {
      setProducts([]);
      return;
    }

    // Debounce API call (wait 500ms after last keystroke)
    const handler = setTimeout(() => {
      fetchProducts();
    }, 500);

    // Cleanup timeout on re-render
    return () => {
      clearTimeout(handler);
    };
  }, [searchProducts]);

  // Filter products for search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchProducts.toLowerCase())
  );

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
            <ul className="flex items-center justify-between space-x-5 xl:space-x-14">
              {[
                { href: "/", label: "Home", key: "home" },
                { href: "/products", label: "Products", key: "products" },
                { href: "/about", label: "About Us", key: "about" },
                { href: "/contact", label: "Contact Us", key: "contact" },
              ].map(({ href, label, key }) => (
                <Link key={key} href={href}>
                  <li
                    className={`relative font-medium text-sm cursor-pointer transition-all duration-300
          ${activePage === key ? "text-primary" : "text-gray-700 hover:text-primary"}
        `}
                  >
                    {label}
                    {/* underline animation */}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] bg-primary transition-all duration-300
            ${activePage === key ? "w-full" : "w-0 group-hover:w-full"}
          `}
                    />
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          {/* Search and Actions Section - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center bg-white rounded-lg px-3 py-1 border border-gray-300 w-56 xl:w-64">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-black font-medium px-2 py-1 w-full"
                onChange={(e) => setSearchProducts(e.target.value)}
                value={searchProducts}
              />

              {/* Search Dropdown with Product Cards */}
              {searchProducts && filteredProducts.length > 0 && (
                <div className="absolute top-full md:left-20 md:right-20 w-auto bg-white border border-gray-300 rounded-md mt-1 overflow-y-auto shadow-lg z-50 p-4 grid lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-[500px]">
                  {filteredProducts.map((product: Product, key: number) => (
                    <div key={key} className="w-[300px] flex-shrink-0">
                      <ProductCard
                        product={product}
                        onShopNow={() => setSearchProducts("")}
                      />
                    </div>
                  ))}
                </div>
              )}

              {searchProducts && filteredProducts.length === 0 && (
                <div className="absolute top-full md:left-20 md:right-20 w-auto bg-white border border-gray-300 rounded-md mt-1 p-4 text-gray-500 shadow-lg z-50">
                  No products found
                </div>
              )}
            </div>

            {/* Button Section */}
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  {/* Cart icon Section */}
                  <div className="flex items-center">
                    <Link href={"/cart"}>
                      <div className="text-gray-800 hover:text-gray-600 transition-colors">
                        <ShoppingCart className="w-5 h-5" />
                      </div>
                    </Link>
                  </div>
                  <Link href={"/profile"}>
                    <Avatar>
                      <AvatarImage
                        src={`https://www.freepik.com/free-photos-vectors/profile`}
                        alt="pfp"
                      />
                      <AvatarFallback>pfp</AvatarFallback>
                    </Avatar>
                  </Link>
                </>
              ) : (
                <Link href={"/signup"} onClick={() => setIsMenuOpen(false)}>
                  <div className="bg-[#613815] text-white px-6 py-2 rounded-lg hover:bg-[#7A6348] transition-colors text-sm font-medium">
                    Sign In
                  </div>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Search and Cart */}
          <div className="flex lg:hidden items-center space-x-4">
            <button
              className="text-gray-800 hover:text-gray-600 transition-colors"
              onClick={() => setShowMobileSearch((prev) => !prev)}
            >
              <Search className="w-5 h-5" />
            </button>
            {isAuthenticated && (
              <Link href={"/cart"} onClick={() => setIsMenuOpen(false)}>
                <div className="h-full flex items-center justify-center cursor-pointer">
                  <button className="text-gray-800 hover:text-gray-600 transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </Link>
            )}

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
          {/* Mobile Search Input */}
          {showMobileSearch && (
            <div className="absolute md:hidden top-full left-5 right-5 bg-white border border-gray-300 rounded-md mt-2 p-2 z-50">
              <input
                type="text"
                value={searchProducts}
                onChange={(e) => setSearchProducts(e.target.value)}
                placeholder="Search products..."
                className="w-full px-3 py-2 border rounded-md outline-none text-black"
              />

              {searchProducts && filteredProducts.length > 0 && (
                <div className="mt-2 h-[400px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {filteredProducts.map((product) => (
                    <div
                      key={product._id}
                      className="w-[300px] h-[400px] overflow-hidden flex-shrink-0"
                    >
                      <ProductCard
                        product={product}
                        onShopNow={() => {
                          setSearchProducts("");
                          setShowMobileSearch(false);
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {searchProducts && filteredProducts.length === 0 && (
                <div className="mt-2 text-gray-500">No products found</div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden w-full bg-[#dfd7d0] border-gray-300 rounded-b-md transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100 visible"
              : "max-h-0 opacity-0 invisible"
          }`}
        >
          <div className="px-4 py-4">
            {/* Mobile Navigation Links */}
            <ul className="space-y-3 mb-4">
              <Link href={"/products"} onClick={() => setIsMenuOpen(false)}>
                <li className="text-gray-800 hover:text-gray-600 transition-colors font-medium text-base cursor-pointer py-2 border-gray-300">
                  Products
                </li>
              </Link>
              <Link href={"/about"} onClick={() => setIsMenuOpen(false)}>
                <li className="text-gray-800 hover:text-gray-600 transition-colors font-medium text-base cursor-pointer py-2 border-gray-300">
                  About Us
                </li>
              </Link>
              <Link href={"/contact"} onClick={() => setIsMenuOpen(false)}>
                <li className="text-gray-800 hover:text-gray-600 transition-colors font-medium text-base cursor-pointer py-2 border-gray-300">
                  Contact
                </li>
              </Link>
              {isAuthenticated && (
                <Link href={"/profile"} onClick={() => setIsMenuOpen(false)}>
                  <li className="text-gray-800 hover:text-gray-600 transition-colors font-medium text-base cursor-pointer py-2 border-gray-300">
                    Profile
                  </li>
                </Link>
              )}
            </ul>

            {/* Mobile Sign In Button */}
            <div className="pt-2">
              {!isAuthenticated && (
                <Link href={"/signup"} onClick={() => setIsMenuOpen(false)}>
                  <button className="bg-[#613815] text-white w-full py-3 rounded-lg hover:bg-[#7A6348] transition-colors text-base font-medium">
                    Sign In
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
