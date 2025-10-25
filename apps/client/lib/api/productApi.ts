import axiosInstance from "../axios";
import { Product, ApiResponse } from "../types/product";

export const productApi = {
  // Get all products
  getAll: (params: {category: string, search: string}): Promise<ApiResponse<any>> => axiosInstance.get(`/products`, {params}),

  //get product by slug
  getBySlug: (slug: string): Promise<ApiResponse<any>> => 
    axiosInstance.get(`/products/${slug}`),

  // Get product by ID
  getById: (id: string): Promise<ApiResponse<Product>> =>
    axiosInstance.get(`/products/${id}`),

  // Create new product
  create: (data: Omit<Product, "id">): Promise<ApiResponse<Product>> =>
    axiosInstance.post("/products", data),

  // Update product
  update: (id: string, data: Partial<Product>): Promise<ApiResponse<Product>> =>
    axiosInstance.put(`/products/${id}`, data),

  // Delete product
  delete: (id: string): Promise<ApiResponse<void>> =>
    axiosInstance.delete(`/products/${id}`),

  // Get products by category
  getByCategory: (category: string): Promise<ApiResponse<Product[]>> =>
    axiosInstance.get(`/products/category/${category}`),
};
