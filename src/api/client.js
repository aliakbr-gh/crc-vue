import axios from "axios";

import router from "@/router";
import { useAuthStore } from "@/stores/auth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const REFRESH_TOKEN_PATH = "/refresh-token";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

const hardLogout = (message = "Session expired. Please login again.") => {
  const authStore = useAuthStore();

  authStore.user = null;
  authStore.token = null;

  localStorage.removeItem("crc_user");
  localStorage.removeItem("crc_token");

  router.push("/login");
};

/*
|--------------------------------------------------------------------------
| Request Interceptor
|--------------------------------------------------------------------------
*/

api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();

    const token = authStore.token;

    if (token && !config.url.includes("/login")) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);

/*
|--------------------------------------------------------------------------
| Response Interceptor
|--------------------------------------------------------------------------
*/

api.interceptors.response.use(
  (response) => response.data,

  async (error) => {
    const originalRequest = error.config;

    const isUnauthorized = error.response?.status === 401;

    const isLoginRequest = originalRequest?.url?.includes("/login");

    const isRefreshRequest = originalRequest?.url?.includes(REFRESH_TOKEN_PATH);

    /*
    |--------------------------------------------------------------------------
    | Ignore Non-401 Errors
    |--------------------------------------------------------------------------
    */

    if (
      !isUnauthorized ||
      originalRequest._retry ||
      isLoginRequest ||
      isRefreshRequest
    ) {
      return Promise.reject(error);
    }

    /*
    |--------------------------------------------------------------------------
    | Queue Requests During Refresh
    |--------------------------------------------------------------------------
    */

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })

        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;

          return api(originalRequest);
        })

        .catch((err) => Promise.reject(err));
    }

    /*
    |--------------------------------------------------------------------------
    | Start Refresh Process
    |--------------------------------------------------------------------------
    */

    isRefreshing = true;

    originalRequest._retry = true;

    try {
      const authStore = useAuthStore();

      const token = authStore.token;

      if (!token) {
        throw new Error("No token found");
      }

      /*
      |--------------------------------------------------------------------------
      | Refresh Token API
      |--------------------------------------------------------------------------
      */

      const refreshResponse = await axios.get(
        `${BASE_URL}${REFRESH_TOKEN_PATH}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newToken = refreshResponse?.data?.token;

      if (!newToken) {
        throw new Error("No token returned");
      }

      /*
      |--------------------------------------------------------------------------
      | Update Store + LocalStorage
      |--------------------------------------------------------------------------
      */

      authStore.token = newToken;

      localStorage.setItem("crc_token", newToken);

      api.defaults.headers.common.Authorization = `Bearer ${newToken}`;

      /*
      |--------------------------------------------------------------------------
      | Retry Failed Requests
      |--------------------------------------------------------------------------
      */

      processQueue(null, newToken);

      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);

      hardLogout();

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
