export interface Product {
  _id: string;
  name: string;
  description: string;
  slug: string;
  variants: Array<{
    size: number;
    price: number;
    _id: string;
  }>;
  category: {
    name: string;
    _id: string;
  };
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

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  status: number;
}

export interface CartItem {
  productId: number;
  quantity: number;
  product?: Product;
}