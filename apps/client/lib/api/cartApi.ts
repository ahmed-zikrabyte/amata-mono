import axiosInstance from "../axios"; 

export interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    images?: string[];
    category?: string;
    variants?: {
      _id: string;
      size?: number;
      price?: number;
    }[];
  };
  variant: string;
  quantity: number;
  price?: number;
}



export interface CartResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    userId: string;
    items: CartItem[];
    __v: number;
  };
}

const handleResponse = async <T>(promise: Promise<{ data: T }>): Promise<T> => {
  try {
    const res = await promise;
    return res.data;
  } catch (error: any) {
    console.error("Cart API Error:", error);
    throw error.response?.data || {
      success: false,
      message: "Something went wrong",
    };
  }
};

// Get cart
export const getCart = async (): Promise<CartResponse> =>
  handleResponse(axiosInstance.get("/cart"));

// Add item to cart
export const addToCart = async (
  productId: string,
  variantId: string
): Promise<CartResponse> =>
  handleResponse(
    axiosInstance.post("/cart/add-to-cart", {
      productId,
      variantId,
    })
  );

// Update cart item quantity
export const updateCart = async (
  productId: string,
  variantId: string,
  action: "increment" | "decrement"
): Promise<CartResponse> =>
  handleResponse(
    axiosInstance.put("/cart/update-cart", {
      productId,
      variantId,
      action,
    })
  );

// Remove item from cart
export const removeFromCart = async (
  productId: string,
  variantId: string
): Promise<CartResponse> =>
  handleResponse(
    axiosInstance.delete("/cart/remove", {
      data: { productId, variantId },
    })
  );
