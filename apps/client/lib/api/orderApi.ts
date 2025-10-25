import axiosInstance from "../axios";

export const orderApi = {
  createOrder: (params: { addressId: string }) =>
    axiosInstance.post("/order/create-order", params),
};
