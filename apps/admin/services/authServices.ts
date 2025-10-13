import axios from "axios";
import api from "../lib/axios";

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/admin/auth/login", {
      email,
      password,
    });

    return response.data
  } catch (error) {
    if(axios.isAxiosError(error)) {
      return error.response?.data
    }
  }
};
