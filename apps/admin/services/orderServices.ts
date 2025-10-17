import axiosInstance from "../lib/axios";

export const getAllOrders = async (
  page: number,
  limit: number,
  search: string,
  fromDate: string,
  toDate: string
) => {
  try {
    const response = await axiosInstance.get(
      `/admin/orders?page=${page}&limit=${limit}&search=${search}&fromDate=${fromDate}&toDate=${toDate}`
    );

    return response.data;
  } catch (error: any) {
    return error?.response.data;
  }
};
