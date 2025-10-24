import Image from "next/image";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Star } from "lucide-react";
import { Product } from "@/lib/types/product";
import Link from "next/link";
import { formatToRupee } from "../../lib/utils/formatToRupee";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onShopNow: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart, onShopNow }: ProductCardProps) => {
  if (!product) {
    return;
  }
  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="p-5 border bg-[#e8e3df] shadow-lg rounded-2xl overflow-hidden mx-2">
        <div className="relative h-40 w-full bg-amber-50">
          <Image
            src={product.images[0] || ""}
            alt={product.name}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {/* {product?.badge && (
          <div className="absolute top-3 right-3">
            <span className="text-[10px] font-semibold text-amber-900 bg-[#ecc09a] hover:bg-red-800 hover:text-white transition-colors px-3 py-1 rounded-full">
            {product.badge}
            </span>
            </div>
        )} */}
        </div>
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
              {/* <span className="text-[10px] text-gray-600">{product.rating}</span> */}
            </div>
          </div>

          <div className="text-[15px] font-bold text-amber-900">
            {formatToRupee(product.variants[0]?.price || 0)}
          </div>
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              className="flex-1 border-amber-700 text-amber-700 hover:bg-red-700 hover:text-white text-xs"
              onClick={() => onAddToCart(product)}
            >
              Add to cart
            </Button>
            <Button
              className="flex-1 bg-amber-700 hover:bg-amber-800 text-xs"
              onClick={() => onShopNow(product)}
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
