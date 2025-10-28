// lib/apiClient.ts
import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";
import { store } from "@/redux/store";
import { refreshAccessToken, signOut } from "@/redux/slices/authSlice";
import {
  getToken,
  isAccessTokenExpired,
  isRefreshTokenExpired,
} from "./storage";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
});

// Request interceptor
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Ensure headers exist
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    // Handle token
    if (isAccessTokenExpired()) {
      if (!isRefreshTokenExpired()) {
        try {
          const res = await store.dispatch(refreshAccessToken()).unwrap();
          if (res.token) {
            (config.headers as AxiosHeaders).set(
              "Authorization",
              `Bearer ${res.token}`
            );
          }
        } catch (err) {
          store.dispatch(signOut());
          return Promise.reject(err);
        }
      } else {
        store.dispatch(signOut());
        return Promise.reject(
          new Error("Session expired. Please login again.")
        );
      }
    } else {
      const token = getToken();
      if (token) {
        (config.headers as AxiosHeaders).set(
          "Authorization",
          `Bearer ${token}`
        );
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (
    error: AxiosError & {
      config?: InternalAxiosRequestConfig & { _retry?: boolean };
    }
  ) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (!isRefreshTokenExpired()) {
        try {
          const res = await store.dispatch(refreshAccessToken()).unwrap();
          if (res.token && originalRequest.headers) {
            (originalRequest.headers as AxiosHeaders).set(
              "Authorization",
              `Bearer ${res.token}`
            );
            return api(originalRequest);
          }
        } catch (err) {
          store.dispatch(signOut());
          return Promise.reject(err);
        }
      } else {
        store.dispatch(signOut());
        return Promise.reject(
          new Error("Session expired. Please login again.")
        );
      }
    }

    return Promise.reject(error);
  }
);

export default api;
