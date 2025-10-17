import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@workspace/ui/components/carousel";
import ProductCard from "./productCard";

interface Product {
  id: number;
  image: any;
  category: string;
  title: string;
  rating: number;
  price: string;
  badge?: string;
}

interface ProductCarouselProps {
  products: Product[];
  onAddToCart: (productId: number) => void;
  onShopNow: (productId: number) => void;
}

const ProductCarousel = ({ products, onAddToCart, onShopNow }: ProductCarouselProps) => {
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
      
      <CarouselPrevious className="left-2 bg-white border-amber-200 text-amber-700" />
      <CarouselNext className="right-2 bg-white border-amber-200 text-amber-700" />
    </Carousel>
  );
};

export default ProductCarousel;