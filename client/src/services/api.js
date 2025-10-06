// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // important for cookies
});

// Request interceptor → attach access token
api.interceptors.request.use((config) => {
  debugger;
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor → refresh token when 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    debugger;
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/refresh",
          {
            withCredentials: true,
          }
        )
        localStorage.setItem("accessToken", response?.data?.data.accessToken);
        api.defaults.headers[
          "Authorization"
        ] = `Bearer ${response?.data?.data.accessToken}`;
        return api(originalRequest); // retry with new token
      } catch (err) {
        localStorage.removeItem("accessToken");
        window.location.href = "/"; // force logout
      }
    }
    return Promise.reject(error);
  }
);

export default api;
