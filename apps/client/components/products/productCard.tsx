import Image from "next/image";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Star } from "lucide-react";

interface ProductCardProps {
  product: {
    id: number;
    image: any;
    category: string;
    title: string;
    rating: number;
    price: string;
    badge?: string;
  };
  onAddToCart: (productId: number) => void;
  onShopNow: (productId: number) => void;
}

const ProductCard = ({ product, onAddToCart, onShopNow }: ProductCardProps) => {
  return (
    <Card className="p-5 border bg-[#e8e3df] shadow-lg rounded-2xl overflow-hidden mx-2">
      <div className="relative h-40 w-full bg-amber-50">
        <Image
          src={product.image}
          alt={product.title}
          className="object-cover"
          fill
        />
        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-semibold text-amber-900 bg-[#ecc09a] hover:bg-red-800 hover:text-white transition-colors px-3 py-1 rounded-full">
            {"Sale"}
          </span>
        </div>
      </div>
      <CardContent className="p-1 space-y-3">
        <span className="text-[10px] font-sm text-amber-900 mt-10">
          Category: {product.category}
        </span>
        <div className="flex justify-between items-center gap-0">
          <h3 className="font-normal text-[11px] text-gray-900">
            {product.title}
          </h3>
          <div className="flex items-center">
            <span className="text-[10px] text-gray-600">
              {product.rating} *
            </span>
            <div className="flex text-yellow-400">
              <Star className="text-gray-300 fill-amber-400 w-3 h-3" />
            </div>
          </div>
        </div>

        <div className="text-[15px] font-bold text-amber-900">
          {product.price}
        </div>
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            className="flex-1 border-amber-700 text-amber-700 hover:bg-red-700 hover:text-white"
            onClick={() => onAddToCart(product.id)}
          >
            Add to cart
          </Button>
          <Button 
            className="flex-1 bg-amber-700 hover:bg-amber-800"
            onClick={() => onShopNow(product.id)}
          >
            Shop Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;