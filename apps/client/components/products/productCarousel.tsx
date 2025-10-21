import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@workspace/ui/components/carousel";
import ProductCard from "./productCard";
import { Product } from "@/lib/types/product";

interface ProductCarouselProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onShopNow: (product: Product) => void;
}

const ProductCarousel = ({ products, onAddToCart, onShopNow }: ProductCarouselProps) => {
  if (!products || products.length === 0) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-gray-500">No products available</p>
      </div>
    );
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              onShopNow={onShopNow}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      
      <CarouselPrevious className="left-2 bg-white border-amber-200 text-amber-700 hover:bg-amber-50" />
      <CarouselNext className="right-2 bg-white border-amber-200 text-amber-700 hover:bg-amber-50" />
    </Carousel>
  );
};

export default ProductCarousel;