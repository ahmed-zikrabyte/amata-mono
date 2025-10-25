"use client";

import Image from "next/image";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Star } from "lucide-react";
import Link from "next/link";
import { Product } from "@/lib/types/product";
import { useAddToCart } from "@/hooks/useAddToCart";
import { formatToRupee } from "../../lib/utils/formatToRupee";

interface ProductCardProps {
  product: Product;
  onShopNow?: (product: Product) => void;
}

const ProductCard = ({ product, onShopNow }: ProductCardProps) => {
  const { handleAddToCart, loading } = useAddToCart();

  if (!product) return null;

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="p-5 border bg-[#E8E3DF] hover:bg-[#f5cdab] shadow-lg rounded-2xl overflow-hidden mx-2 duration-500 group -space-y-2">
        {/* Product Image */}
        <div className="relative aspect-4/3 w-full bg-amber-50 overflow-hidden rounded-md">
          <Image
            src={product.images[0] || ""}
            alt={product.name}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute top-2 right-2 text-[11px] bg-[#E8E3DF] text-black group-hover:bg-primary group-hover:text-white duration-300 rounded-full px-3 py-1">
            Sale
          </div>
        </div>

        {/* Card Content */}
        <CardContent className="p-1 space-y-3">
          <span className="text-[10px] font-sm text-gray-500 mt-10">
            Category: {product.category?.name}
          </span>

          <div className="flex justify-between items-center gap-2">
            <h3 className="font-medium text-lg text-gray-900 line-clamp-2 truncate">
              {product.name}
            </h3>
            <div className="flex items-center gap-1">
              <p className="text-xs">
                {4.8}
              </p>
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
              className="flex-1 w-1/2 bg-[#E8E3DF] text-primary hover:bg-primary hover:text-white group-hover:bg-[#f5cdab] duration-500"
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart(product);
              }}
              disabled={loading === product._id}
            >
              {loading ? "Adding..." : "Add to cart"}
            </Button>

            {/* Shop Now */}
            <Button
              className="flex-1 w-1/2"
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
