import api from "@/lib/axios";

export const getBlogs = async () => {
  try {
    const response = await api.get("/admin/blogs");
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getOneBlog = async (id: string) => {
  try {
    const response = await api.get(`/admin/blogs/${id}`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const createBlog = async (data: any) => {
  try {
    const response = await api.post(`/admin/blogs/create`, data);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const updateBlog = async (id: string, data: any) => {
  try {
    const response = await api.get(`/admin/blogs/update/${id}`, data);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const toggleBlogStatus = async (id: string) => {
  try {
    const response = await api.patch(`/admin/blogs/toggle-status/${id}`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const deleteBlog = async (id: string) => {
  try {
    const response = await api.delete(`/admin/blogs/${id}`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
