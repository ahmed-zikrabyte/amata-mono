import ProductCarousel from "./productCarousel";

interface Product {
  id: number;
  image: any;
  category: string;
  title: string;
  rating: number;
  price: string;
  badge?: string;
}

interface YouMayAlsoLikeProps {
  products: Product[];
  onAddToCart: (productId: number) => void;
  onShopNow: (productId: number) => void;
  onViewAll?: () => void;
  title?: string;
  buttonText?: string;
  backgroundColor?: string;
  padding?: string;
}

const YouMayAlsoLike = ({
  products,
  onAddToCart,
  onShopNow,
  onViewAll,
  title = "You May Also Like",
  buttonText = "View All",
  backgroundColor = "#fff",
  padding = "py-20 px-4 sm:px-8 lg:px-20"
}: YouMayAlsoLikeProps) => {
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
              className="py-2 px-4 bg-[#613815] text-white rounded-md hover:bg-green-700 transition-colors"
              onClick={onViewAll}
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>

      <div className="mt-10 lg:mt-20">
        <ProductCarousel
          products={products}
          onAddToCart={onAddToCart}
          onShopNow={onShopNow}
        />
      </div>
    </div>
  );
};

export default YouMayAlsoLike;