"use client";
import {
  ChefHat,
  Info,
  Leaf,
  Package,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Store,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { getOneProduct } from "@/services/productService";
import { ImageGalleryModal } from "../../../../../components/global/image-gallery";

// Updated interface to match the new data model
interface IProduct {
  _id: string;
  name: string;
  description: string;
  category: { _id: string; name: string };
  variants: { _id?: string; size: number; price: number }[];
  images: string[];
  ingredients: string;
  nutritionInformation: string;
  storageInfo: string;
  suggestedUse: string;
  whyYouShouldUseThis: string;
  isActive: boolean;
  createdAt: string;
}

const ProductDetailsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const [productData, setProductData] = useState<IProduct | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async (slug: string) => {
      try {
        const response = await getOneProduct(slug);
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching product by slug:", error);
      }
    };

    if (slug) {
      fetchProduct(slug);
    }
  }, [slug]);

  // Updated tabs array based on the new model
  const tabs = [
    {
      id: "description",
      label: "Description",
      icon: <Info className="w-4 h-4" />,
      content: productData?.description,
    },
    {
      id: "ingredients",
      label: "Ingredients",
      icon: <ChefHat className="w-4 h-4" />,
      content: productData?.ingredients,
    },
    {
      id: "nutrition",
      label: "Nutrition",
      icon: <Leaf className="w-4 h-4" />,
      content: productData?.nutritionInformation,
    },
    {
      id: "storage",
      label: "Storage",
      icon: <Store className="w-4 h-4" />,
      content: productData?.storageInfo,
    },
    {
      id: "usage",
      label: "Suggested Use",
      icon: <Sparkles className="w-4 h-4" />,
      content: productData?.suggestedUse,
    },
    {
      id: "why-this",
      label: "Why This?",
      icon: <ShieldCheck className="w-4 h-4" />,
      content: productData?.whyYouShouldUseThis,
    },
    {
      id: "variants",
      label: "Variants",
      icon: <ShoppingCart className="w-4 h-4" />,
      content: null, // Special handling for variants
    },
  ];

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!productData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading Product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 ">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {productData.name}
            </h1>
            {productData.isActive ? (
              <p className="bg-green-200 text-green-900 rounded-md font-medium px-3 py-1">
                Active
              </p>
            ) : (
              <p className="bg-red-200 text-red-900 rounded-md font-medium px-3 py-1">
                Inactive
              </p>
            )}
          </div>

          {/* Image Gallery */}
          {productData.images && productData.images.length > 0 ? (
            <>
              <div className="mb-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {productData.images.map((imageUrl, index) => (
                    <div
                      key={index}
                      className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md"
                      onClick={() => {
                        setSelectedImageIndex(index);
                        setIsOpen(true);
                      }}
                    >
                      <Image
                        src={imageUrl}
                        alt={`${productData.name} - Image ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        priority={index < 5}
                      />
                      <div className="absolute top-2 right-2 bg-black/90 text-white text-xs px-2 py-1 rounded-full">
                        {index + 1}
                      </div>
                      <div className="absolute inset-0 group-hover:bg-opacity-30 transition-all duration-300" />
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    {productData.images.length} image
                    {productData.images.length !== 1 ? "s" : ""} • Click to view
                    gallery
                  </p>
                </div>
              </div>
              <ImageGalleryModal
                images={productData.images}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                initialIndex={selectedImageIndex}
                alt={`${productData.name} Gallery`}
              />
            </>
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-6">
              <div className="text-center">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">No images available</p>
              </div>
            </div>
          )}
        </div>

        {/* Tabs Section */}
        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>
              Comprehensive information about {productData.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 md:grid-cols-7">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center gap-2"
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      {tab.icon}
                      {tab.label}
                    </h3>

                    {tab.id === "variants" ? (
                      <div className="space-y-4">
                        {productData.variants.map((variant) => (
                          <Card key={variant._id} className="p-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-600">
                                  Size (ml)
                                </span>
                                <span className="text-lg font-semibold">
                                  {variant.size}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-600">
                                  Price
                                </span>
                                <span className="text-lg font-semibold text-green-600">
                                  ₹{variant.price}
                                </span>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div
                        className="prose prose-gray max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: tab.content as string,
                        }}
                      />
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Created on: {formatDate(productData.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
