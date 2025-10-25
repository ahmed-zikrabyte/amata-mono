import axiosInstance from "../axios";


export const categoryApi = {
  getAll : () => axiosInstance.get('/category')
}