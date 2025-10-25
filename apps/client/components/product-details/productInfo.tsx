"use client";
import React, { useState, useEffect, act } from "react";
import { Star, Minus, Plus, SquarePen, Circle, Images } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@workspace/ui/components/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { useParams } from "next/navigation";
import AmtRefund from "../../assets/AmtRefund.png";
import Box from "../../assets/Box.png";
import Box2 from "../../assets/Box2.png";
import Cook from "../../assets/Cook.png";
import Cow from "../../assets/cow.png";
import DiscountLogo from "../../assets/DiscountLogo.png";
import Drop from "../../assets/Drop.png";
import ProductCor1 from "../../assets/ProductCorsoul1.png";
import ProductCor2 from "../../assets/ProductCorsoul2.png";
import ProductCor3 from "../../assets/ProductCorsoul3.png";
import ProductHero from "../../../assets/ProductHeroSection.png";
import Tag from "../../assets/Tag.png";
import Image from "next/image";
import TestAyu1 from "../../../assets/TestmonialsAyu1.png";
import TestAyu2 from "../../../assets/TestmonialsAyu2.png";
import TestAyu3 from "../../../assets/TestmonialsAyu3.png";
import TestAyu4 from "../../../assets/TestmonialsAyu4.png";
import topView from "../../../assets/Soup-bowl.png";
import fav1 from "../../assets/Vector.png";
import fav2 from "../../assets/bowllogo.png";
import fav3 from "../../assets/muscle.png";
import fav4 from "../../assets/Grouplogo.png";
import rich1 from "../../assets/rich1.png";
import rich2 from "../../assets/rich2.png";
import rich3 from "../../assets/rich3.png";
import rich4 from "../../assets/rich4.png";
import colorful from "../../../assets/colorful.png";
import bgSecCover from "../../../assets/bgSecCover.png";
import bgSec from "../../../assets/bgSecImg.png";
import check from "../../../assets/check.png";
import Sec2Bnr1 from "../../../assets/Sec2Banner1.png";
import Sec2Bnr2 from "../../../assets/Sec2Banner2.png";
import Frequent from "../../../assets/FAQs.png";
import review1 from "../../../assets/Review1.png";
import review2 from "../../../assets/Review2.png";
import review3 from "../../../assets/Review3.png";
import productCorsoul1 from "../../assets/ProductCorsolImg1.png";
import productCorsoul2 from "../../assets/ProdutCorsolImg2.png";
import { productApi } from "../../lib/api/productApi";
import { Product } from "../../lib/types/product";
import { useApi } from "../../hooks/useApi";
import { updateCart, CartItem, addToCart } from "@/lib/api/cartApi";
import { toast } from "sonner";
import { useAddToCart } from "../../hooks/useAddToCart";
import Link from "next/link";

// Define the API response type based on your API structure
interface ApiProduct {
  _id: string;
  name: string;
  description: string;
  slug: string;
  variants: Array<{
    size: number;
    price: number;
    _id: string;
  }>;
  category: string;
  ingredients: string;
  images: string[];
  isDeleted: boolean;
  isActive: boolean;
  nutritionInformation: string;
  storageInfo: string;
  suggestedUse: string;
  whyYouShouldUseThis: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: ApiProduct;
}

const ProductInfo = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const [activeImageFlavour, setActiveImageFlavour] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const slug = params.slug as string;

  console.log("Slug from params:", slug);

  const { data: productResponse, error, execute } = useApi<ApiResponse>();
  const product = productResponse?.data;

  console.log("All product data:", product);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const productImages = [
    ProductCor1,
    ProductCor2,
    ProductCor3,
    ProductCor2,
    ProductCor1,
    ProductCor3,
  ];
  const features = [
    {
      icon: Cow,
      description:
        "Made from fresh A2 cow milk using the traditional Bilona method for a rich, golden, and aromatic ghee",
    },
    {
      icon: Cook,
      description:
        "Hand-churned with care – pure, natural, and full of traditional goodness in every spoon.",
    },
    {
      icon: Drop,
      description:
        "Slow-cooked from cultured butter to preserve the authentic taste and natural aroma of pure cow ghee.",
    },
    {
      icon: Box2,
      description:
        "A spoonful of purity – traditional Bilona ghee crafted from grass-fed cow's milk.",
    },
    {
      icon: Box,
      description:
        "Experience the golden richness of handcrafted cow ghee, made the old-fashioned way for pure perfection",
    },
  ];

  const sizes = [
    {
      size: "5 Ltr",
      discount: "25",
      original: "Rs. 10,308.00",
      discounted: "Rs. 4,673.00",
    },
    {
      size: "2 Ltr",
      discount: "15",
      original: "Rs. 5,498.00",
      discounted: "Rs. 2,474.00",
    },
    {
      size: "5 Ltr",
      discount: "25",
      original: "Rs. 2,749.00",
      discounted: "Rs. 2,474.00",
    },
    {
      size: "500 Ml",
      discount: "25",
      original: "Rs. 10,308.00",
      discounted: "Rs. 10,308.00",
    },
    {
      size: "250 Ml",
      discount: "",
      original: "Rs. 10,308.00",
      discounted: "",
    },
  ];

  interface ButtonData {
    id: number;
    title: string;
    icon: any;
    image: any;
  }

  const buttonData: ButtonData[] = [
    {
      id: 0,
      title: "Rich Flavour & Aroma",
      icon: fav1,
      image: rich1,
    },
    {
      id: 1,
      title: "Traditional Bilona Method",
      icon: fav2,
      image: rich2,
    },
    {
      id: 2,
      title: "Support Easy Digestion",
      icon: fav4,
      image: rich3,
    },
    {
      id: 3,
      title: "Full Body Nourishment",
      icon: fav3,
      image: rich4,
    },
  ];

  const faqs = [
    {
      question: "What is Gir Cow A2 Bilona Ghee?",
      answer:
        "Gir Cow A2 Bilona Ghee is a traditional, hand-churned ghee made from the milk of indigenous Gir cows. It contains the A2 beta-casein protein, known for better digestion and multiple health benefits.",
    },
    {
      question: "How is it different from regular ghee?",
      answer:
        "Unlike commercially processed ghee, Bilona ghee is prepared using the ancient Vedic 'Bilona' method -- curd is churned to extract butter, which is then slowly simmered to produce pure ghee. This process retains essential nutrients and rich aroma.",
    },
    {
      question: "Is your ghee 100% pure and free from additives?",
      answer:
        "Yes, our Gir Cow A2 Bilona Ghee is made using 100% pure milk with no preservativesc, chemicals, or adulteration -- ensuring authentic quanlity in every jar.",
    },
    {
      question: "Can lactose-intolerant individuals consume it?",
      answer:
        "In most cases, Yes, A2 Bilona Ghee has minimal lactose and casein, making it suitable for people  who are mildly lactose intolerant. However, it's always best to consult your healthcare provider.",
    },
    {
      question: "What is the shelf life of Gir Cow A2 Bilona Ghee?",
      answer:
        "It typically lasts up to 9-12 months if stored properly under recommended conditions",
    },
  ];

  const productImagesCor = {
    ashwagandha: productCorsoul1,
    girCow: productCorsoul2,
    buffalo: productCorsoul1,
    brahmi: productCorsoul2,
  };

  interface LocalProduct {
    id: number;
    category: string;
    title: string;
    rating: number;
    price: string;
    image: any;
    badge: string;
  }
  const localProducts: LocalProduct[] = [
    {
      id: 1,
      category: "Category Approach",
      title: "Ashwagandha Vitality",
      rating: 4.3,
      price: "799/500ml",
      image: productImagesCor.ashwagandha,
      badge: "Approach",
    },
    {
      id: 2,
      category: "Category Traditional",
      title: "Gir Cow A2 Bilona Ghee",
      rating: 4.4,
      price: "849/500ml",
      image: productImagesCor.girCow,
      badge: "Traditional",
    },
    {
      id: 3,
      category: "Category Buffalo & Coal",
      title: "Buffalo A2 Cultured Ghee",
      rating: 4.3,
      price: "799/500ml",
      image: productImagesCor.buffalo,
      badge: "Buffalo & Coal",
    },
    {
      id: 4,
      category: "Category Aromatic",
      title: "Brahmi Herbal Ghee",
      rating: 4.3,
      price: "799/500ml",
      image: productImagesCor.brahmi,
      badge: "Aromatic",
    },
    {
      id: 5,
      category: "Category Approach",
      title: "Ashwagandha Vitality Pro",
      rating: 4.5,
      price: "899/500ml",
      image: productImagesCor.ashwagandha,
      badge: "Approach",
    },
  ];
  const [recommendedProducts] = useState<LocalProduct[]>(localProducts);
  useEffect(() => {
    if (slug) {
      execute(productApi.getBySlug(slug))
        .then((response) => {
          console.log("API Success:", response);
        })
        .catch((err) => {
          console.log("API Error details:", {
            message: err.message,
            response: err.response?.data,
            status: err.response?.status,
            url: err.config?.url,
          });
        });
    }
  }, [slug, execute]);

  useEffect(() => {
    if (product) {
      console.log("Product data:", product);
    }
  }, [product]);

  useEffect(() => {
    setQuantity(1);
  }, [selectedVariant]);

  const { handleAddToCart, loading } = useAddToCart();

//   const increment = () => setQuantity((q) => q + 1);
//   const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
//   const handleShopNow = (product: Product | LocalProduct) => {
//     console.log("Shop now:", product);
//   };

//   const handleViewAll = () => {
//     console.log("View all products");
//   };

  const handleQuantity = async (
    productId: string,
    variantId: string,
    action: "increment" | "decrement",
    cartItems: CartItem[],
    setCart: (items: CartItem[]) => void
  ) => {
    try {
      const itemInCart = cartItems.find(
        (item) => item.product._id === productId && item.variant === variantId
      );

      if (!itemInCart) {
        // If item not in cart, always add it first
        const res = await addToCart(productId, variantId);
        if (res.success) {
          setCart(res.data.items);
          toast.success("Item added to cart");
        } else {
          toast.error(res.message);
        }
        return;
      }

      // Otherwise update quantity
      const res = await updateCart(productId, variantId, action);
      if (res.success) {
        setCart(res.data.items);
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      console.error("Cart error:", error);
      toast.error(error?.message || "Something went wrong");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Loading products...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-red-500 text-lg">Error: {error}</div>
      </div>
    );
  return (
    <div className='max-w-screen'>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-4 sm:py-6 mt-16">
        {/* Breadcrumb */}
        <div className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
          <Link href={"/"}>Home</Link> &gt; {product?.category?.name} &gt;{" "}
          {product?.name}
        </div>

        {/* Section -1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12 relative max-w-full">
          {/* Left side section */}
          <div className="relative">
            {/* Hero Section - Main Product Image */}
            <div className="top-0 sticky space-y-4 lg:space-y-6">
              <div className="flex justify-center lg:justify-start">
                <Image
                  src={activeImage || product?.images?.[0]}
                  alt="Cow Ghee Hero"
                  className="w-full max-w-sm sm:max-w-md lg:max-w-full h-auto object-cover rounded-md"
                  width={600}
                  height={600}
                />
              </div>

              {/* Carousel Section */}
              {product?.images && product.images.length > 0 && (
                <div className="w-full max-w-sm sm:max-w-md lg:max-w-full mx-auto lg:mx-0">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {product.images.map((img: string, idx: number) => (
                        <CarouselItem
                          key={idx}
                          className="basis-1/3 sm:basis-1/3 lg:basis-1/4 pl-1"
                        >
                          <div className="pl-1">
                            <div
                              className={`flex aspect-square items-center justify-center rounded-md border p-1 cursor-pointer transition-all duration-200 ${
                                activeImage === img
                                  ? "border-red-600"
                                  : "bg-white"
                              }`}
                              onClick={() => setActiveImage(img)}
                            >
                              <Image
                                src={img}
                                alt={`Cow Ghee ${idx + 1}`}
                                className="w-full h-full object-contain"
                                width={100}
                                height={100}
                              />
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-1 sm:left-2 size-5 sm:size-6 lg:size-8" />
                    <CarouselNext className="right-1 sm:right-2 size-5 sm:size-6 lg:size-8" />
                  </Carousel>
                </div>
              )}
            </div>
          </div>

          {/* Right Side Section */}
          <div className="relative w-full pl-0 lg:pl-4 xl:pl-5">
            <div className="w-full">
              {/* Product Title and Rating */}
              <div className="mb-4 sm:mb-5 lg:mb-6">
                <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-red-700 mb-2 sm:mb-3">
                  {product?.name}
                </h1>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  {[...Array(5)].map((item, index) => (
                    <Star
                      key={index}
                      className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="text-xs sm:text-sm lg:text-base xl:text-xl pl-2 sm:pl-3 lg:pl-5 text-gray-600">
                    12 Reviews
                  </span>
                </div>
              </div>

              <hr className="my-3 sm:my-4 lg:my-5" />

              {/* Features Section */}
              <div className="space-y-3 sm:space-y-4 bg-gray-100 rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 my-3 sm:my-4 lg:my-6">
                {features.map((feat, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 sm:gap-3 lg:gap-4"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <Image
                        src={feat.icon}
                        alt="features-icons"
                        className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8"
                        width={32}
                        height={32}
                      />
                    </div>
                    <p className="text-xs sm:text-sm lg:text-base text-gray-700 flex-1 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>

              <hr className="my-3 sm:my-4 lg:my-5" />

              {/* Size Section */}
              <div className="space-y-3 sm:space-y-4 my-3 sm:my-4 lg:my-6">
                <h1 className="text-xs sm:text-sm lg:text-base text-gray-400 font-semibold">
                  Size
                </h1>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                  {product?.variants.map((variant: any) => {
                    const isSelected = selectedVariant === variant._id;

                    return (
                      <div
                        key={variant._id}
                        onClick={() => setSelectedVariant(variant._id)}
                        className={`rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-3 text-center cursor-pointer transition-all duration-200 border
            ${
              isSelected
                ? "border-amber-700 bg-amber-100 text-amber-900 shadow-md scale-[1.02]"
                : "border-gray-300 bg-gray-50 text-gray-900 hover:bg-amber-50 hover:border-amber-600"
            }`}
                      >
                        <div className="font-semibold text-xs sm:text-sm lg:text-base">
                          {variant.size} ml
                        </div>
                        <div className="text-xs sm:text-sm lg:text-base font-bold mt-1">
                          ₹{variant.price}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <hr className="my-3 sm:my-4 lg:my-5" />

              {/* Stock and Tax Info */}
              <div className="space-y-2 sm:space-y-3 lg:space-y-4 my-3 sm:my-4 lg:my-6">
                <h2 className="text-xs sm:text-sm lg:text-base text-gray-700">
                  Tax included. Shipping is calculated at checkout
                </h2>
                <div className="border bg-amber-100 outline-none font-light px-3 sm:px-4 lg:px-5 py-2 rounded-lg sm:rounded-xl lg:rounded-2xl text-xs sm:text-sm lg:text-base">
                  {product?.isActive ? "In Stock" : "Out of Stock"}
                </div>
              </div>

              {/* Quantity and Buttons */}
              <div className="my-3 sm:my-4 lg:my-6">
                <h2 className="text-sm sm:text-base lg:text-lg font-medium mb-2 sm:mb-3">
                  Quantity
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                  {/* Quantity Selector */}
                  <div className="border border-green-900 rounded-md sm:rounded-lg sm:col-span-1">
                    <div className="flex justify-between items-center px-2 sm:px-3 lg:px-4 py-2 sm:py-3 h-10 sm:h-12 lg:h-14">
                      <button
                        onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                        disabled={!selectedVariant || quantity <= 1}
                        className={`border border-green-900 w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 flex items-center justify-center rounded text-xs sm:text-sm ${
                          !selectedVariant || quantity <= 1
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-[#613815] hover:text-white"
                        }`}
                      >
                        <Minus className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
                      </button>

                      <span className="mx-1 sm:mx-2 text-sm sm:text-base lg:text-lg font-medium">
                        {quantity}
                      </span>

                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        disabled={!selectedVariant}
                        className={`border border-green-900 w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 flex items-center justify-center rounded text-xs sm:text-sm ${
                          !selectedVariant
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-[#613815] hover:text-white"
                        }`}
                      >
                        <Plus className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    onClick={() => {
                      if (!selectedVariant) {
                        toast.error("Please select a size first.");
                        return;
                      }
                      handleAddToCart({
                        ...product,
                        variants: product?.variants?.filter(
                          (v: { _id: string }) => v._id === selectedVariant
                        ),
                      } as any);
                    }}
                    disabled={!selectedVariant || loading === product?._id}
                    className={`w-full h-10 sm:h-12 lg:h-14 border border-green-900 bg-white text-red-800 hover:text-white hover:bg-red-800 rounded-md transition-colors font-medium text-xs sm:text-sm lg:text-base sm:col-span-1 flex items-center justify-center ${
                      !selectedVariant ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading === product?._id ? "Adding..." : "Add to Cart"}
                  </Button>

                  {/* Check out Button */}
                  <Button className="w-full h-10 sm:h-12 lg:h-14 border border-green-900 bg-[#613815] text-white hover:bg-green-700 rounded-md transition-colors font-medium text-xs sm:text-sm lg:text-base sm:col-span-1 flex items-center justify-center">
                    Check out
                  </Button>
                </div>
              </div>

              {/* Benefits Section */}
              <div className="flex flex-row justify-between items-center gap-2 sm:gap-4 lg:gap-6 xl:gap-8 py-3 sm:py-4 lg:py-6 border-t border-gray-200 pt-4 sm:pt-6">
                <div className="flex flex-col items-center text-center flex-1">
                  <Image
                    src={Tag}
                    alt="Tag"
                    className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 mb-1"
                    width={32}
                    height={32}
                  />
                  <p className="text-[10px] xs:text-xs sm:text-sm lg:text-base font-medium text-gray-700 leading-tight">
                    Extra 2% Off on Prepaid
                  </p>
                </div>

                <div className="h-8 sm:h-10 lg:h-12 xl:h-16 w-px bg-gray-300 flex-shrink-0"></div>

                <div className="flex flex-col items-center text-center flex-1">
                  <Image
                    src={DiscountLogo}
                    alt="Discount"
                    className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 mb-1"
                    width={32}
                    height={32}
                  />
                  <p className="text-[10px] xs:text-xs sm:text-sm lg:text-base font-medium text-gray-700 leading-tight">
                    5% Off on First Order
                  </p>
                </div>

                <div className="h-8 sm:h-10 lg:h-12 xl:h-16 w-px bg-gray-300 flex-shrink-0"></div>

                <div className="flex flex-col items-center text-center flex-1">
                  <Image
                    src={AmtRefund}
                    alt="Cash"
                    className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 mb-1"
                    width={32}
                    height={32}
                  />
                  <p className="text-[10px] xs:text-xs sm:text-sm lg:text-base font-medium text-gray-700 leading-tight">
                    Cash on delivery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo