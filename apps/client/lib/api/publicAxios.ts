// lib/api/publicAxios.ts
import axios from "axios";

const ServerUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const publicAxios = axios.create({
  baseURL: ServerUrl,
});

// No authentication interceptors for public routes
publicAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Public API Error:', error);
    return Promise.reject(error);
  }
);