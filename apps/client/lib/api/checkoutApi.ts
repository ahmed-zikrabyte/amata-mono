import axiosInstance from "../axios";

export const checkoutApi = {
  get: () => axiosInstance.get("/checkout"),
};
