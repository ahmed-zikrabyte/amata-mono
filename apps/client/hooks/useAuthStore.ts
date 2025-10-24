import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  checkAuth: () => void;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: null,

  // Check for token in localStorage and update auth state
  checkAuth: () => {
    if (typeof window === "undefined") return; // Prevent SSR issues
    const token = localStorage.getItem("token");
    set({ isAuthenticated: !!token, token });
  },

  // Save token to localStorage and mark as authenticated
  login: (token: string) => {
    localStorage.setItem("token", token);
    set({ isAuthenticated: true, token });
  },

  // Clear token and mark as logged out
  logout: () => {
    localStorage.removeItem("token");
    set({ isAuthenticated: false, token: null });
  },
}));
