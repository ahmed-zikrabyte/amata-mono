import axiosInstance from "../lib/axios";

export const getAllProducts = async (page: number, search: string) => {
  try {
    const response = await axiosInstance.get(
      `/admin/products?page=${page}&search=${search}`
    );
    return response.data;
  } catch (error: any) {
    return error?.response.data;
  }
};

export const getOneProduct = async (slug: string) => {
  try {
    const response = await axiosInstance.get(`/admin/products/${slug}`);
    return response.data;
  } catch (error: any) {
    return error?.response.data;
  }
};

export const createProduct = async (data: any) => {
  try {
    const response = await axiosInstance.post(`/admin/products/create`, data);
    return response.data;
  } catch (error: any) {
    return error?.response.data;
  }
};

export const updateProduct = async (slug: string, data: any) => {
  try {
    const response = await axiosInstance.put(`/admin/products/edit/${slug}`, data);
    return response.data;
  } catch (error: any) {
    return error?.response.data;
  }
};

export const toggleProductStatus = async (slug: string) => {
  try {
    const response = await axiosInstance.patch(
      `/admin/products/toggle-status/${slug}`
    );
    return response.data;
  } catch (error: any) {
    return error?.response.data;
  }
};

export const deleteProduct = async (slug: string) => {
  try {
    const response = await axiosInstance.delete(
      `/admin/products/delete/${slug}`
    );
    return response.data;
  } catch (error: any) {
    return error?.response.data;
  }
};
