import ProductCarousel from "./productCarousel";
import { Product } from "@/lib/types/product";

interface YouMayAlsoLikeProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onShopNow: (product: Product) => void;
  onViewAll?: () => void;
  title?: string;
  buttonText?: string;
  backgroundColor?: string;
  padding?: string;
  currentProductId?: number;
}

const YouMayAlsoLike = ({
  products,
  onAddToCart,
  onShopNow,
  onViewAll,
  title = "You May Also Like",
  buttonText = "View All",
  backgroundColor = "#fff",
  padding = "py-20 px-4 sm:px-8 lg:px-20",
  currentProductId
}: YouMayAlsoLikeProps) => {
  // Filter out current product if provided
  const filteredProducts = currentProductId 
    ? products.filter(product => product.id !== currentProductId)
    : products;

  if (!filteredProducts || filteredProducts.length === 0) {
    return null;
  }

  return (
    <div
      className={`relative min-h-96 w-full z-0 ${padding}`}
      style={{
        backgroundColor,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-black font-bold">
            {title}
          </h1>
          {onViewAll && (
            <button 
              className="py-2 px-4 bg-[#613815] text-white rounded-md hover:bg-green-700 transition-colors text-sm"
              onClick={onViewAll}
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>

      <div className="mt-10 lg:mt-20">
        <ProductCarousel
          products={filteredProducts.slice(0, 8)} // Limit to 8 products
          onAddToCart={onAddToCart}
          onShopNow={onShopNow}
        />
      </div>
    </div>
  );
};

export default YouMayAlsoLike;