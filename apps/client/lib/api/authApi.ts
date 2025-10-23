import axiosInstance from "../axios";

export const authApi = {
  register: (data: any) => axiosInstance.post("/auth/register", data),

  registerVerify: (data: any) =>
    axiosInstance.post("/auth/register-verify", data),

  login: (data: any) => axiosInstance.post("/auth/login", data),

  loginVerify: (data: any) => axiosInstance.post("/auth/login-verify", data),
};
