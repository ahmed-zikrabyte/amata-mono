import axios from "axios";
import api from "../lib/axios";

export const getFaqs = async () => {
  try {
    const response = await api.get("/admin/faqs");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const getFaqId = async (id: string) => {
  try {
    const response = await api.get(`/admin/faqs/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const createFaqs = async ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  try {
    const response = await api.post("/admin/faqs/create", {
      question,
      answer,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const updateFaq = async (
  id: string,
  data: { question: string; answer: string }
) => {
  try {
    const response = await api.put(`/admin/faqs/update/${id}`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const deleteFaq = async (id: string) => {
  try {
    const response = await api.delete(`/admin/faqs/delete/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const toggleFaqStatus = async (id: string) => {
  try {
    const response = await api.patch(`/admin/faqs/toggle-status/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};
