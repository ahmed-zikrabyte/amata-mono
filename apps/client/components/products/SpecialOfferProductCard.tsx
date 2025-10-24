import Image from "next/image";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Star } from "lucide-react";
import { Product } from "@/lib/types/product";
import Link from "next/link";
import { Badge } from "@workspace/ui/components/badge";
import { formatToRupee } from "../../lib/utils/formatToRupee";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onShopNow: (product: Product) => void;
}

const SpecialOfferProductCard = ({
  product,
  onAddToCart,
  onShopNow,
}: ProductCardProps) => {
  if (!product) {
    return;
  }
  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="p-5 border-none bg-amber-200/40 rounded-2xl overflow-hidden mx-2 group hover:shadow-lg duration-150">
        <Badge className="rounded-full">20% off</Badge>
        <div className="relative h-50 w-full bg-amber-50 rounded-xl overflow-hidden">
          <Image
            src={product.images[0] || ""}
            alt={product.name}
            className="object-cover rounded-xl group-hover:scale-110 duration-150"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
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

          <div className="flex gap-2 pt-2">
            <div className="text-[15px] w-1/2 font-bold text-amber-900">
              {formatToRupee(product.variants[0]?.price || 0)}
            </div>
            <Button
              className="flex-1 bg-amber-900 hover:bg-amber-800 text-xs"
              size={"lg"}
              onClick={() => onShopNow(product)}
            >
              Grab Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SpecialOfferProductCard;
