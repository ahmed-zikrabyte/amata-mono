import axiosInstance from "../axios";


export const profileApi = {
  getData: () => axiosInstance.get("/profile"),
}