import axiosInstance from "../lib/axios";

export const getAllCategories = async (page: number, search: string) => {
  try {
    const response = await axiosInstance.get(
      `/admin/categories?page=${page}&search=${search}`
    );
    return response.data
  } catch (error: any) {
    return error?.response.data;
  }
};

export const getOneCategory = async (slug: string) => {
  try {
    const response = await axiosInstance.get(`/admin/categories/${slug}`);
    return response.data;
  } catch (error: any) {
    return error?.response.data;
  }
};

export const createCategory = async (data: any) => {
  try {
    const response = await axiosInstance.post(`/admin/categories/create`, data);
    return response.data;
  } catch (error: any) {
    return error?.response.data;
  }
};

export const updateCategory = async (slug: string, data: any) => {
  try {
    const response = await axiosInstance.put(
      `/admin/categories/edit/${slug}`,
      data
    );
    return response.data;
  } catch (error: any) {
    return error?.response.data;
  }
};

export const toggleCategoryStatus = async (slug: string) => {
  try {
    const response = await axiosInstance.patch(
      `/admin/categories/toggle-status/${slug}`
    );
    return response.data;
  } catch (error: any) {
    return error?.response.data;
  }
};

export const deleteCategory = async (slug: string) => {
  try {
    const response = await axiosInstance.delete(
      `/admin/categories/delete/${slug}`
    );
    return response.data;
  } catch (error: any) {
    return error?.response.data;
  }
};
