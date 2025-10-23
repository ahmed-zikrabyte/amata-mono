import axios from "axios";

const ServerUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const axiosInstance = axios.create({
  baseURL: ServerUrl,
});

// Safe localStorage access for SSR
const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage?.getItem("token");
  }
  return null;
};

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    
    // Better error handling
    if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
      console.error('Network error - check if backend server is running');
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;