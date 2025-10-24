import axiosInstance from "../axios";

export const addressApi = {
  getAddress: () => axiosInstance.get("/address"),

  addAddress: (data: any) => axiosInstance.post("/address/add", data),

  updateAddress: (id: string, data: any) =>
    axiosInstance.put(`/address/edit/${id}`, data),

  deleteAddress: (id: string) => axiosInstance.delete(`/address/delete/${id}`),
};
