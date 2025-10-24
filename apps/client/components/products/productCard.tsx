"use client";

import Image from "next/image";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Star } from "lucide-react";
import Link from "next/link";
import { Product } from "@/lib/types/product";
import {useAddToCart} from "@/hooks/useAddToCart"
import { formatToRupee } from "../../lib/utils/formatToRupee";

interface ProductCardProps {
  product: Product;
  onShopNow?: (product: Product) => void;
}

const ProductCard = ({ product, onShopNow }: ProductCardProps) => {

  const {handleAddToCart, loading} = useAddToCart()

  if (!product) return null;

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="p-5 border bg-[#e8e3df] shadow-lg rounded-2xl overflow-hidden mx-2">
        {/* Product Image */}
        <div className="relative h-40 w-full bg-amber-50">
          <Image
            src={product.images[0] || ""}
            alt={product.name}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>

        {/* Card Content */}
        <CardContent className="p-1 space-y-3">
          <span className="text-[10px] font-sm text-amber-900 mt-10">
            Category: {product.category}
          </span>

          <div className="flex justify-between items-center gap-0">
            <h3 className="font-normal text-[11px] text-gray-900 line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-center gap-1">
              <Star className="text-yellow-400 fill-yellow-400 w-3 h-3" />
            </div>
          </div>

          <div className="text-[15px] font-bold text-amber-900">
            {formatToRupee(product.variants[0]?.price || 0)}
          </div>

          <div className="flex gap-2 pt-2">
            {/* Add to Cart */}
            <Button
              variant="outline"
              className="flex-1 border-amber-700 text-amber-700 hover:bg-red-700 hover:text-white text-xs"
             onClick={(e) => {
              e.preventDefault();
              handleAddToCart(product)
             }}
             disabled={loading === product._id}
            >
              {loading ? "Adding..." : "Add to cart"}
            </Button>

            {/* Shop Now */}
            <Button
              className="flex-1 bg-amber-700 hover:bg-amber-800 text-xs"
              onClick={(e) => {
                e.preventDefault();
                onShopNow?.(product);
              }}
            >
              Shop Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
