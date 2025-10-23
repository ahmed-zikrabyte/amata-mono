import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;

export interface CartItem {
  _id: string;
  product: string;
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

// ✅ Create a pre-configured axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleResponse = <T>(promise: Promise<{ data: T }>): Promise<T> =>
  promise
    .then((res) => res.data)
    .catch((error) => {
      console.error("API Error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: "Something went wrong",
        }
      );
    });

export const getCart = (): Promise<CartResponse> =>
  handleResponse(api.get("/cart"));

export const addToCart = (
  productId: string,
  variantId: string
): Promise<CartResponse> =>
  handleResponse(
    api.post("/cart/add-to-cart", {
      productId,
      variantId,
    })
  );

export const updateCart = (
  productId: string,
  variantId: string,
  action: "increment" | "decrement"
): Promise<CartResponse> =>
  handleResponse(
    api.put("/cart/update-cart", {
      productId,
      variantId,
      action,
    })
  );

export const removeFromCart = (
  productId: string,
  variantId: string
): Promise<CartResponse> =>
  handleResponse(
    api.delete("/cart/remove", {
      data: { productId, variantId },
    })
  );
