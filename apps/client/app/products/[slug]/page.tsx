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
import AmtRefund from "../../../assets/AmtRefund.png";
import Box from "../../../assets/Box.png";
import Box2 from "../../../assets/Box2.png";
import Cook from "../../../assets/Cook.png";
import Cow from "../../../assets/cow.png";
import DiscountLogo from "../../../assets/DiscountLogo.png";
import Drop from "../../../assets/Drop.png";
import ProductCor1 from "../../../assets/ProductCorsoul1.png";
import ProductCor2 from "../../../assets/ProductCorsoul2.png";
import ProductCor3 from "../../../assets/ProductCorsoul3.png";
import ProductHero from "../../../assets/ProductHeroSection.png";
import Tag from "../../../assets/Tag.png";
import Image from "next/image";
import TestAyu1 from "../../../assets/TestmonialsAyu1.png";
import TestAyu2 from "../../../assets/TestmonialsAyu2.png";
import TestAyu3 from "../../../assets/TestmonialsAyu3.png";
import TestAyu4 from "../../../assets/TestmonialsAyu4.png";
import topView from "../../../assets/Soup-bowl.png";
import fav1 from "../../../assets/Vector.png";
import fav2 from "../../../assets/bowllogo.png";
import fav3 from "../../../assets/muscle.png";
import fav4 from "../../../assets/Grouplogo.png";
import rich1 from "../../../assets/rich1.png";
import rich2 from "../../../assets/rich2.png";
import rich3 from "../../../assets/rich3.png";
import rich4 from "../../../assets/rich4.png";
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
import productCorsoul1 from "../../../assets/ProductCorsolImg1.png";
import productCorsoul2 from "../../../assets/ProdutCorsolImg2.png";
import { productApi } from "../../../lib/api/productApi";
import { Product } from "../../../lib/types/product";
import { useApi } from "../../../hooks/useApi";
import { updateCart, CartItem, addToCart } from "@/lib/api/cartApi";
import { toast } from "sonner";
import { useAddToCart } from "../../../hooks/useAddToCart";
import Link from "next/link";
import ProductInfo from "../../../components/product-details/productInfo"

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

const Page = () => {
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

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const handleShopNow = (product: Product | LocalProduct) => {
    console.log("Shop now:", product);
  };

  const handleViewAll = () => {
    console.log("View all products");
  };

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
    <div className="min-h-screen">
      <ProductInfo/>

      {/* Ayurvedic Superfood Banner */}
      <div className="sticky top-0 h-96 sm:h-64 lg:h-80 xl:h-96 shadow-lg transition-all duration-500 bg-gradient-to-r from-yellow-950 via-amber-800 to-orange-950 text-white py-4 sm:py-6 lg:py-8">
        <h2 className="sm:text-2xl font-bold mb-5 pt-5 text-center">
          The Golden Ayurvedic Superfood
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 space-y-6 sm:gap-6 lg:gap-8 xl:gap-12 px-8 py-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Image
              src={TestAyu1}
              alt="Nutritional Benefits"
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 mx-auto"
              width={112}
              height={112}
            />
            <div className="text-xs sm:text-sm lg:text-base xl:text-lg font-semibold mt-1 sm:mt-2 line-clamp-2">
              Nutritional Benefits
            </div>
          </div>

          <div className="text-center">
            <Image
              src={TestAyu4}
              alt="Ancient Tradition"
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 mx-auto"
              width={112}
              height={112}
            />
            <div className="text-xs sm:text-sm lg:text-base xl:text-lg font-semibold mt-1 sm:mt-2 line-clamp-2">
              Ancient Tradition
            </div>
          </div>

          <div className="text-center">
            <Image
              src={TestAyu3}
              alt="Pure & Natural"
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 mx-auto"
              width={112}
              height={112}
            />
            <div className="text-xs sm:text-sm lg:text-base xl:text-lg font-semibold mt-1 sm:mt-2 line-clamp-2">
              Pure & Natural
            </div>
          </div>

          <div className="text-center">
            <Image
              src={TestAyu2}
              alt="Culinary Versatility"
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 mx-auto"
              width={112}
              height={112}
            />
            <div className="text-xs sm:text-sm lg:text-base xl:text-lg font-semibold mt-1 sm:mt-2 line-clamp-2">
              Culinary Versatility
            </div>
          </div>
        </div>
        
        {/* Cow Ghee Banner */}
        <div className="mb-5">
          <Image src={topView} alt="second banner" className="mb-0" />
        </div>
        <div className="mt-8 text-center">
          <h1 className="uppercase text-base sm:text-2xl font-bold text-red-900">
            Why use a2 gir cow ghee?
          </h1>
          <p className="text-black font-semibold tracking-tight text-[8px] sm:text-[15px] px-10">
            A2 Gir Cow Ghee is more than just a cooking ingredient -- it's a
            natural source of nourishment and wellness. Made from the mlik of
            native Gir cows using the traditional Bilona method, this ghee
            retains its authentic aroma, grainy texture, and rich nutrients
          </p>
        </div>

        {/* Flavour Changes */}
        <div className="w-full bg-[#613815] overflow-hidden mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 xl:py-16">
            {/* Buttons Section - Left Side */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="space-y-5 sm:space-y-4 lg:space-y-6 bg-red-950/30 rounded-xl lg:rounded-tr-2xl lg:rounded-br-2xl p-4 sm:p-6 lg:p-8">
                {buttonData.map((btn, index) => (
                  <button
                    key={btn.id}
                    onClick={() => setActiveImageFlavour(index)}
                    className={`w-full max-w-xs sm:max-w-sm mx-auto lg:mx-0 lg:w-full py-2 sm:py-3 rounded-full transition-all duration-300 border-none ${
                      activeImageFlavour === index
                        ? "bg-amber-700 scale-95 shadow-lg"
                        : "bg-amber-800 hover:bg-amber-700 hover:scale-102"
                    }`}
                  >
                    <div className="flex items-center justify-center md:justify-center lg:justify-center space-x-4 sm:space-x-4 lg:space-x-6 px-2 sm:px-4">
                      <Image
                        src={btn.icon}
                        alt={btn.title}
                        className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 object-contain flex-shrink-0"
                        width={48}
                        height={48}
                      />
                      <h4 className="text-xs sm:text-lg lg:text-base font-semibold text-white text-center lg:text-left">
                        {btn.title}
                      </h4>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Image Section - Right Side */}
            <div className="lg:col-span-7 xl:col-span-8 flex items-center justify-center">
              <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl h-48 sm:h-64 lg:h-80 xl:h-96">
                <Image
                  src={buttonData[activeImageFlavour]?.image || ""}
                  alt={buttonData[activeImageFlavour]?.title || "Product image"}
                  className="object-contain transition-all duration-500 ease-in-out"
                  fill
                  sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* What makes Amata unique */}
        <div className="relative overflow-hidden">
          {/* Background */}
          <div className="relative h-[500px] sm:h-[600px] lg:h-[700px]">
            <Image
              src={colorful}
              alt="banner_section"
              className="w-full h-full object-cover"
              fill
              priority
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          {/* Content */}
          <div className="absolute inset-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Left Content */}
              <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-6 py-12">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  What Makes
                  <br />
                  <span>Amata Ghee</span>
                  <br />
                  Unique?
                </h1>
              </div>

              {/* Right Content */}
              <div className="flex items-center justify-center lg:justify-between mb-5">
                <div className="bg-[#5e5b49] backdrop-blur-sm rounded-2xl p-4 sm:p-8 max-w-lg border-none border-amber-500  shadow-2xl">
                  <div className="space-y-6 text-white">
                    <p className="leading-relaxed">
                      Amata sources milk from A2 Gir cows using traditional
                      methods. Our <strong>Bilona process</strong> ensures
                      authentic texture and preserves natural nutrients.
                    </p>
                    <p className="leading-relaxed">
                      The distinctive <em>"danedar"</em> texture and rich aroma
                      reflect our commitment to quality. Pure, natural, and free
                      from additives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nutrition Details*/}
        <div
          className="relative w-full z-0 min-h-[500px] sm:min-h-[600px] lg:min-h-[700px]"
          style={{
            backgroundImage: `url(${bgSecCover.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Overlay for better readability */}
          <div className="absolute inset-0 z-10"></div>

          <div className="relative z-20 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
              {/* Left Column - Image */}
              <div className="flex items-center justify-center lg:justify-start order-2 lg:order-1">
                <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl">
                  <div className="relative h-64 sm:h-80 lg:h-96 xl:h-[500px]">
                    <Image
                      src={bgSec}
                      alt="hero-section"
                      fill
                      className="object-contain drop-shadow-2xl"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Buttons */}
              <div className="flex items-center justify-center lg:justify-end order-1 lg:order-2">
                <div className="w-full max-w-md lg:max-w-lg">
                  {/* Buttons Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
                    {/* Nutrition Information */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="bg-white text-gray-800 py-4 sm:py-5 px-6 w-full border-2 border-gray-300 hover:border-red-300 transition-all duration-300"
                        >
                          <div className="flex items-center justify-center space-x-3">
                            <span className="font-semibold text-sm sm:text-base">
                              Nutrition Information
                            </span>
                          </div>
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-md sm:max-w-lg lg:max-w-2xl bg-white p-0 overflow-hidden rounded-2xl">
                        <DialogHeader className="p-0 sticky top-0 z-10">
                          <DialogTitle className="text-white bg-gradient-to-r from-red-700 to-red-800 px-6 py-5 w-full text-lg sm:text-xl font-bold shadow-lg">
                            Nutrition Information
                          </DialogTitle>
                        </DialogHeader>

                        <div className="p-6 sm:p-8 overflow-y-auto max-h-[70vh] sm:max-h-[80vh]">
                          {product?.nutritionInformation ? (
                            <div className="mb-6">
                              <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md">
                                <thead>
                                  <tr className="bg-gradient-to-r from-red-600 to-red-700">
                                    <th className="text-left py-4 px-4 sm:px-6 font-semibold text-white text-sm sm:text-base uppercase tracking-wide">
                                      Nutrient
                                    </th>
                                    <th className="text-right py-4 px-4 sm:px-6 font-semibold text-white text-sm sm:text-base uppercase tracking-wide">
                                      Value
                                    </th>
                                  </tr>
                                </thead>
                                <tbody
                                  dangerouslySetInnerHTML={{
                                    __html: product.nutritionInformation,
                                  }}
                                />
                              </table>
                            </div>
                          ) : (
                            <p className="text-gray-500 text-center">
                              No nutrition information available
                            </p>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Ingredients */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="bg-white hover:text-green-700 text-gray-800 py-4 sm:py-5 px-6 w-full  border-2 border-gray-300 hover:border-red-300 transition-all duration-300"
                        >
                          <div className="flex items-center justify-center space-x-3">
                            <span className="font-semibold text-sm sm:text-base">
                              Ingredients
                            </span>
                          </div>
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-md sm:max-w-lg lg:max-w-2xl bg-white p-0 overflow-hidden rounded-2xl">
                        <DialogHeader className="p-0 sticky top-0 z-10">
                          <DialogTitle className="text-white bg-gradient-to-r from-red-700 to-red-800 px-6 py-5 w-full text-lg sm:text-xl font-bold shadow-lg">
                            Ingredients
                          </DialogTitle>
                        </DialogHeader>

                        <div className="p-6 sm:p-8 overflow-y-auto max-h-[70vh] sm:max-h-[80vh] flex gap-2 items-center">
                          <Image
                            src={check}
                            alt="check"
                            className="w-7 h-7 object-contain"
                          />
                          {product?.ingredients ? (
                            <div
                              className="prose prose-sm sm:prose-base max-w-none"
                              dangerouslySetInnerHTML={{
                                __html: product.ingredients,
                              }}
                            />
                          ) : (
                            <p className="text-gray-500 text-center">
                              No ingredients information available
                            </p>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Suggested Use */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="bg-white  hover:text-red-700 text-gray-800 py-4 sm:py-5 px-6 w-full border-2 border-gray-300 hover:border-red-300 transition-all duration-300 "
                        >
                          <div className="flex items-center justify-center space-x-3">
                            <span className="font-semibold text-sm sm:text-base">
                              Suggested Use
                            </span>
                          </div>
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-md sm:max-w-lg lg:max-w-2xl bg-white p-0 overflow-hidden rounded-2xl">
                        <DialogHeader className="p-0 sticky top-0 z-10">
                          <DialogTitle className="text-white bg-red-700 px-6 py-5 w-full text-lg sm:text-xl font-bold shadow-lg">
                            Suggested Use
                          </DialogTitle>
                        </DialogHeader>

                        <div className="border rounded-lg bg-[#f2f2f2] h-32 m-10 text-center pt-5 ">
                          {product?.suggestedUse ? (
                            <div
                              className="prose prose-sm sm:prose-base max-w-none"
                              dangerouslySetInnerHTML={{
                                __html: product.suggestedUse,
                              }}
                            />
                          ) : (
                            <p className="text-gray-500 text-center">
                              No suggested use information available
                            </p>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Storage Information */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="bg-white hover:text-red-700 text-gray-800 py-4 sm:py-5 px-6 w-full border-2 border-gray-300 hover:border-red-300 transition-all duration-300"
                        >
                          <div className="flex items-center justify-center space-x-3">
                            <span className="font-semibold text-sm sm:text-base">
                              Storage Information
                            </span>
                          </div>
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-md sm:max-w-lg lg:max-w-2xl bg-white p-0 overflow-hidden rounded-2xl">
                        <DialogHeader className="p-0 sticky top-0 z-10">
                          <DialogTitle className="text-white bg-red-700 px-6 py-5 w-full text-lg sm:text-xl font-bold shadow-lg">
                            Storage Information
                          </DialogTitle>
                        </DialogHeader>

                        <div className="border rounded-lg bg-[#f2f2f2] h-32 m-10 text-center pt-5">
                          {product?.storageInfo ? (
                            <div
                              className="prose prose-sm sm:prose-base max-w-none"
                              dangerouslySetInnerHTML={{
                                __html: product.suggestedUse,
                              }}
                            />
                          ) : (
                            <p className="text-gray-500 text-center">
                              No suggested use information available
                            </p>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Who Should Use This */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="bg-white hover:bg-red-50 hover:text-orange-700 text-gray-800 py-4 sm:py-5 px-6 w-full border-2 border-gray-300 hover:border-red-300 transition-all duration-300 "
                        >
                          <div className="flex items-center justify-center space-x-3">
                            <span className="font-semibold text-sm sm:text-base">
                              Who Should Use This?
                            </span>
                          </div>
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-md sm:max-w-lg lg:max-w-2xl bg-white p-0 overflow-hidden rounded-2xl">
                        <DialogHeader className="p-0 sticky top-0 z-10">
                          <DialogTitle className="text-white bg-red-700 px-6 py-5 w-full text-lg sm:text-xl font-bold shadow-lg">
                            Who Should Use This?
                          </DialogTitle>
                        </DialogHeader>

                        <div className="border rounded-lg bg-[#f2f2f2] h-32 m-10 text-center pt-5">
                          {product?.whyYouShouldUseThis ? (
                            <div
                              className="prose prose-sm sm:prose-base max-w-none"
                              dangerouslySetInnerHTML={{
                                __html: product.suggestedUse,
                              }}
                            />
                          ) : (
                            <p className="text-gray-500 text-center">
                              No suggested use information available
                            </p>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Not All Ghee Is Created Equal */}
        <div
          className="relative min-h-96 w-full z-0 py-8 sm:py-12 md:py-16"
          style={{
            backgroundColor: "#f2f2f2",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Heading */}
            <div className="relative z-40 flex h-full items-center justify-center mb-6 sm:mb-8 lg:mb-12">
              <h1 className="text-[#613815] uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center px-4">
                Not All Ghee Is Created Equal
              </h1>
            </div>

            {/* Comparison Table */}
            <div className="relative z-40 bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] sm:min-w-full border-collapse">
                  <thead>
                    <tr className="bg-[#613815]">
                      <th className="w-2/5 py-3 sm:py-4 px-4 sm:px-6 text-white font-semibold text-sm sm:text-base text-left">
                        Features
                      </th>
                      <th className="w-1/5 py-3 sm:py-4 px-2 sm:px-4 text-white font-semibold text-sm sm:text-base text-center border-l border-white/20">
                        AOF A2 Gir Cow Ghee
                      </th>
                      <th className="w-1/5 py-3 sm:py-4 px-2 sm:px-4 text-white font-semibold text-sm sm:text-base text-center border-l border-white/20">
                        Regular Ghee (A1 Milk)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 sm:py-4 px-4 sm:px-6 text-gray-700 font-medium text-sm sm:text-base">
                        Made from Indigenous Gir Cow Milk
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-center border-l bg-red-800">
                        <div className="flex justify-center">
                          <span className="text-white font-bold text-lg sm:text-xl">
                            ✓
                          </span>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-center border-gray-200">
                        <div className="flex justify-center">
                          <span className="text-red-600 font-bold text-lg sm:text-xl">
                            ✗
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 sm:py-4 px-4 sm:px-6 text-gray-700 font-medium text-sm sm:text-base">
                        Prepared Using Traditional Bilona Method
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-center border-l bg-red-800">
                        <div className="flex justify-center">
                          <span className="text-white font-bold text-lg sm:text-xl">
                            ✓
                          </span>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-center border-l border-gray-200">
                        <div className="flex justify-center">
                          <span className="text-red-600 font-bold text-lg sm:text-xl">
                            ✗
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 sm:py-4 px-4 sm:px-6 text-gray-700 font-medium text-sm sm:text-base">
                        Easier to Digest (A2 Beta-Casein)
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-center border-l bg-red-800">
                        <div className="flex justify-center">
                          <span className="text-white font-bold text-lg sm:text-xl">
                            ✓
                          </span>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-center border-l border-gray-200">
                        <div className="flex justify-center">
                          <span className="text-red-600 font-bold text-lg sm:text-xl">
                            ✗
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 sm:py-4 px-4 sm:px-6 text-gray-700 font-medium text-sm sm:text-base">
                        Made from curd, not cream
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-center border-l bg-red-800">
                        <div className="flex justify-center">
                          <span className="text-white font-bold text-lg sm:text-xl">
                            ✓
                          </span>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-center border-l border-gray-200">
                        <div className="flex justify-center">
                          <span className="text-red-600 font-bold text-lg sm:text-xl">
                            ✗
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 sm:py-4 px-4 sm:px-6 text-gray-700 font-medium text-sm sm:text-base">
                        Naturally Aromatic & Flavourful
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-center border-l bg-red-800">
                        <div className="flex justify-center">
                          <span className="text-white font-bold text-lg sm:text-xl">
                            ✓
                          </span>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-center border-l border-gray-200">
                        <div className="flex justify-center">
                          <span className="text-red-600 font-bold text-lg sm:text-xl">
                            ✗
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 sm:py-4 px-4 sm:px-6 text-gray-700 font-medium text-sm sm:text-base">
                        No Additives or Preservatives
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-center border-l bg-red-800">
                        <div className="flex justify-center">
                          <span className="text-white font-bold text-lg sm:text-xl">
                            ✓
                          </span>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-center border-l border-gray-200">
                        <div className="flex justify-center">
                          <span className="text-red-600 font-bold text-lg sm:text-xl">
                            ✗
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Enjoy your Ghee */}
        <div
          className="relative min-h-96 w-full z-0 py-16 sm:py-20 md:py-24"
          style={{
            backgroundColor: "#ffffff",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="relative z-40 flex h-full items-center justify-center mb-8 sm:mb-10">
            <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl px-4 sm:px-6 lg:px-8 gap-8 md:gap-0">
              {/* Mobile & Tablet: Stack vertically, Desktop: Side by side */}
              <div className="w-full md:w-1/2 flex justify-center order-2 md:order-1">
                <Image
                  src={Sec2Bnr1}
                  alt="Banner-Section"
                  className="w-full max-w-md md:max-w-full md:w-full object-contain"
                />
              </div>

              {/* Mobile & Tablet: Stack vertically, Desktop: Overlapping */}
              <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2 md:-ml-40 lg:-ml-48 xl:-ml-56">
                <Image
                  src={Sec2Bnr2}
                  alt="Banner-Section"
                  // className="w-full object-contain h-56"
                  className="w-full max-w-full md:max-w-full md:w-full h-56 sm:h-40 md:h-36 xl:h-56 object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div
          className="relative w-full z-0 py-12 sm:py-16 md:py-20 lg:py-24"
          style={{
            backgroundImage: `url(${Frequent.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
        >
          {/* Overlay for better readability */}
          <div className="absolute inset-0 bg-black/50 z-10"></div>

          <div className="relative z-40">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Left side - Heading (Fixed position to prevent movement) */}
              <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-start">
                <div className="mb-6 sm:mb-8">
                  {" "}
                  {/* Added sticky to prevent movement */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-widest text-white mb-4">
                    Frequently Asked
                  </h1>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-widest text-white  mb-4">
                    Questions About
                  </h1>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-widest text-white leading-tight">
                    Product
                  </h1>
                </div>

                <button className="border-none py-3 px-8 sm:px-10 text-sm sm:text-base font-semibold mt-6 cursor-pointer bg-white text-green-900 hover:bg-green-800 hover:text-white transition-all duration-300 rounded-lg shadow-lg">
                  {" "}
                  {/* Added sticky */}
                  View all
                </button>
              </div>

              {/* Right Side - FAQ Dropdowns (No scrollbar) */}
              <div className="lg:col-span-7 xl:col-span-8">
                <div className="space-y-3 sm:space-y-4">
                  {" "}
                  {/* Removed max-height and overflow */}
                  {faqs.map((feq, index) => (
                    <div
                      key={index}
                      className="rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 hover:border-white/50 transition-all duration-300"
                    >
                      <div
                        className="flex justify-between items-center p-4 sm:p-6 cursor-pointer hover:bg-white/10 transition-colors w-full"
                        onClick={() =>
                          setOpenIndex(openIndex === index ? -1 : index)
                        }
                      >
                        <span className="font-medium text-white text-sm sm:text-base lg:text-lg pr-4 text-left flex-1">
                          {feq.question}
                        </span>
                        <span
                          className={`text-white text-lg sm:text-xl transition-transform duration-300 flex-shrink-0 ${openIndex === index ? "rotate-90" : ""}`}
                        >
                          ▼
                        </span>
                      </div>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          openIndex === index
                            ? "max-h-48 sm:max-h-56 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="p-4 sm:p-6 pt-0 sm:pt-0">
                          <p className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed sm:leading-loose">
                            {feq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Review */}
        <div className="relative w-full z-0 py-12 sm:py-16 lg:py-20 bg-[#fffff6]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
            <div className="relative">
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black text-center sm:text-left">
                  Customer Reviews
                </h1>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="flex justify-between items-center gap-3 cursor-pointer">
                      <SquarePen className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                      <span className="text-xs sm:text-sm lg:text-base text-black font-medium">
                        Write a Review
                      </span>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="w-[95vw] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px]p-4 sm:p-6 rounded-lg mx-2 sm:mx-0">
                    {/* Review form - Responsive */}
                    <div className="space-y-4 sm:space-y-6">
                      {/* Header */}
                      <div className="text-center">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">
                          Write a Review
                        </h2>
                      </div>

                      {/* Rating Section */}
                      <div className="space-y-3 sm:space-y-4">
                        <h3 className="text-sm sm:text-base font-medium text-black">
                          Rating
                        </h3>
                        <div className="flex space-x-1 justify-center sm:justify-start mb-2">
                          {[...Array(5)].map((str, index) => {
                            const starVal = index + 1;
                            return (
                              <Star
                                key={index}
                                onClick={() => setRating(starVal)}
                                className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 cursor-pointer transition-colors duration-200 ${
                                  starVal <= rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            );
                          })}
                        </div>

                        {/* Name and Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="space-y-2">
                            <label className="text-sm sm:text-base font-normal text-black">
                              Your Name
                            </label>
                            <Input
                              placeholder="Enter your name"
                              className="bg-white border border-gray-300 text-black h-10 sm:h-12"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm sm:text-base font-normal text-black">
                              Email ID
                            </label>
                            <Input
                              placeholder="Enter your Email"
                              className="bg-white border border-gray-300 text-black h-10 sm:h-12"
                            />
                          </div>
                        </div>

                        {/* Review Text */}
                        <div className="space-y-2">
                          <label className="text-sm sm:text-base font-normal text-black">
                            Write a Review
                          </label>
                          <Textarea
                            placeholder="Share your experience..."
                            className="bg-white border border-gray-300 text-black min-h-[120px] sm:min-h-[140px] resize-none"
                          />
                        </div>

                        {/* Upload image */}
                        <div className="space-y-2">
                          <label className="text-sm sm:text-base font-normal text-black">
                            Upload images{" "}
                            <span className="text-xs text-gray-500">
                              (Optional)
                            </span>
                          </label>
                          <div className="w-full h-20 sm:h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                            <div className="text-center">
                              <Images className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-1" />
                              <span className="text-xs sm:text-sm text-gray-500">
                                Upload images
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4">
                          <Button
                            variant="outline"
                            className="bg-white border-red-800 text-red-950 hover:bg-red-700 hover:text-white transition-all duration-200 order-2 sm:order-1"
                          >
                            Cancel
                          </Button>
                          <Button className="bg-red-700 hover:bg-green-700 text-white order-1 sm:order-2">
                            Submit Review
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <hr className="my-6 sm:my-8 border-gray-300" />

              {/* Rating Overview - Grid System */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-8">
                {/* Overall Rating - Left Section */}
                <div className="lg:col-span-4 xl:col-span-3 relative">
                  <div className="flex flex-col items-center text-center p-6">
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-2">
                      4.5
                    </div>
                    <div className="flex justify-center gap-1 mb-3">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={`text-xl sm:text-2xl ${index < 4 ? "text-yellow-400" : "text-gray-300"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <div className="text-sm sm:text-base text-gray-600">
                      (10k ratings)
                    </div>
                  </div>

                  {/* Vertical Line for Desktop */}
                  <div className="hidden lg:block absolute top-1/2 right-0 transform -translate-y-1/2 h-32 w-px bg-gray-300"></div>

                  {/* Horizontal Line for Mobile */}
                  <div className="lg:hidden w-full h-px bg-gray-300 mt-4"></div>
                </div>

                {/* Rating Bars - Middle Section */}
                <div className="lg:col-span-5 xl:col-span-6 relative">
                  <div className="rounded-2xl p-6 h-full">
                    <div className="space-y-3 sm:space-y-4">
                      {[
                        { rating: 5, count: "7.5k", width: "90%" },
                        { rating: 4, count: "1.5k", width: "70%" },
                        { rating: 3, count: "1k", width: "50%" },
                        { rating: 2, count: "0.4k", width: "30%" },
                        { rating: 1, count: "0.1k", width: "10%" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="flex items-center gap-2 w-16 sm:w-20">
                            <span className="text-black text-sm sm:text-base font-medium">
                              {item.rating}
                            </span>
                            <span className="text-yellow-400 text-lg sm:text-xl">
                              ★
                            </span>
                          </div>
                          <div className="flex-1 bg-gray-200 rounded-full h-2 sm:h-3">
                            <div
                              className="bg-red-950 h-2 sm:h-3 rounded-full transition-all duration-500"
                              style={{ width: item.width }}
                            ></div>
                          </div>
                          <span className="text-xs sm:text-sm text-gray-600 w-12 sm:w-16 text-right">
                            {item.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vertical Line for Desktop */}
                  <div className="hidden lg:block absolute top-1/2 right-0 transform -translate-y-1/2 h-32 w-px bg-gray-300"></div>

                  {/* Horizontal Line for Mobile */}
                  <div className="lg:hidden w-full h-px bg-gray-300 mt-4"></div>
                </div>

                {/* Star Summary - Right Section */}
                <div className="lg:col-span-3 xl:col-span-3">
                  <div className="rounded-2xl p-6 h-full">
                    <div className="space-y-3">
                      {[
                        { stars: "5.0", reviews: "7.5k reviews" },
                        { stars: "4.0", reviews: "1.5k reviews" },
                        { stars: "3.0", reviews: "1k reviews" },
                        { stars: "2.0", reviews: "0.4k reviews" },
                        { stars: "1.0", reviews: "0.1k reviews" },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm sm:text-base text-gray-700">
                            ⭐ {item.stars}
                          </span>
                          <span className="text-sm sm:text-base font-medium text-gray-900">
                            {item.reviews}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-0 sm:space-y-8 mt-8 sm:mt-12">
                <div className="space-y-0">
                  {/* Review 1 */}
                  <div className="flex items-start gap-4 sm:gap-6 p-4 sm:p-6 border-b border-gray-300 lg:border-none">
                    <div className="flex-shrink-0">
                      <Image
                        src={review1}
                        alt="Review1"
                        className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-cover rounded-full"
                        width={56}
                        height={56}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                        <div className="font-semibold text-black text-base sm:text-lg">
                          Priya Menon - Bengaluru
                        </div>
                        <div className="flex text-yellow-400 text-base sm:text-lg">
                          {"★".repeat(5)}
                        </div>
                      </div>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        "The Gir Cow A2 Bilona Ghee tastes just like the one my
                        grandmother used to make. Rich aroma, authentic flavor,
                        and amazing quality -- I won't go back to any other
                        brand."
                      </p>
                    </div>
                  </div>

                  {/* Review 2 */}
                  <div className="flex items-start gap-4 sm:gap-6 p-4 sm:p-6 border-b border-gray-300 lg:border-none">
                    <div className="flex-shrink-0">
                      <Image
                        src={review2}
                        alt="Review2"
                        className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-cover rounded-full"
                        width={56}
                        height={56}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                        <div className="font-semibold text-black text-base sm:text-lg">
                          Rajesh Kumar - Mumbai
                        </div>
                        <div className="flex text-yellow-400 text-base sm:text-lg">
                          {"★".repeat(5)}
                        </div>
                      </div>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        "The Gir Cow A2 Bilona Ghee tastes just like the one my
                        grandmother used to make. Rich aroma, authentic flavor,
                        and amazing quality -- I won't go back to any other
                        brand."
                      </p>
                    </div>
                  </div>

                  {/* Review 3 */}
                  <div className="flex items-start gap-4 sm:gap-6 p-4 sm:p-6 border-b border-gray-300 lg:border-none">
                    <div className="flex-shrink-0">
                      <Image
                        src={review3}
                        alt="Review3"
                        className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-cover rounded-full"
                        width={56}
                        height={56}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                        <div className="font-semibold text-black text-base sm:text-lg">
                          Anjali Sharma - Delhi
                        </div>
                        <div className="flex text-yellow-400 text-base sm:text-lg">
                          {"★".repeat(5)}
                        </div>
                      </div>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        "The Gir Cow A2 Bilona Ghee tastes just like the one my
                        grandmother used to make. Rich aroma, authentic flavor,
                        and amazing quality -- I won't go back to any other
                        brand."
                      </p>
                    </div>
                  </div>

                  {/* Read More */}
                  <div className="text-left pt-10">
                    <div className="text-red-700 text-base sm:text-lg font-semibold cursor-pointer hover:underline">
                      Read all reviews
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
