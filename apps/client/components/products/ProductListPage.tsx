"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import ProductsListBanner from "../../components/products/productsListBanner";
import ProductCard from "../../components/products/productCard";
import { Product } from "../../lib/types/product";
import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { productApi } from "../../lib/api/productApi";
import JoinOurPureLivingCommunityBanner from "../global/join-our-pure-living-banner";
import FeatureCards from "../global/feature-cards";
import TestimonialCustomers from "../global/testimonial-customers";
import OurProductsBackgroundImg from "../../assets/images/background/background-img.png";
import SpecialOfferProductCard from "./SpecialOfferProductCard";

const ProductListPage = () => {
  const { execute, data } = useApi();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    execute(productApi.getAll());
  }, []);

  useEffect(() => {
    if (data) {
      console.log({ data: data });
      setProducts(data.data?.products);
    }
  }, [data]);

  const handleAddToCart = () => {
    console.log("add to cart");
  };

  const handleShopNow = (product: Product) => {
    console.log("Shop now:", product);
  };

  if (products.length === 0) {
    return;
  }

  return (
    <div className="flex flex-col w-full">
      {/* Banner */}
      <ProductsListBanner />

      {/* Section: Special Offers */}
      <section className="px-5 md:px-20 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Special Offers & Combos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {/* Replace this section with your actual product cards */}
          {products?.map((product, i) => (
            <SpecialOfferProductCard
              onShopNow={handleShopNow}
              product={product}
              key={i}
            />
          ))}
        </div>
      </section>

      {/* Section: Products */}
      <section
        className="px-5 md:px-20 py-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${OurProductsBackgroundImg.src})` }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-xl md:text-2xl font-semibold">Our Products</h2>

          {/* Sort and Filter */}
          <div className="flex flex-wrap items-center justify-between md:justify-end gap-4">
            <div className="flex items-center space-x-2">
              <p className="text-sm text-gray-700">Sort by:</p>
              <Select>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price_low_high">
                    Price: Low → High
                  </SelectItem>
                  <SelectItem value="price_high_low">
                    Price: High → Low
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" size="sm">
              Filter
            </Button>
          </div>
        </div>

        {/* Category Buttons */}
        <div className="w-full md:w-1/2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
          <Button className="rounded-full" variant="default">
            All Products
          </Button>
          <Button className="rounded-full" variant="outline">
            Ghee
          </Button>
          <Button className="rounded-full" variant="outline">
            Honey
          </Button>
          <Button className="rounded-full" variant="outline">
            Cold-Pressed Oils
          </Button>
        </div>

        {/* Product List Placeholder */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {/* Replace this section with your actual product cards */}
          {products?.map((product, i) => (
            <ProductCard
              onShopNow={handleShopNow}
              product={product}
              key={i}
            />
          ))}
        </div>

        <div className="w-full flex items-center justify-center py-6">
          <Button variant={"outline"} className="">
            Load more products
          </Button>
        </div>
      </section>
      <div className="px-5 md:px-20 py-8">
        <TestimonialCustomers />
      </div>
      <JoinOurPureLivingCommunityBanner />
      <FeatureCards />
    </div>
  );
};

export default ProductListPage;
