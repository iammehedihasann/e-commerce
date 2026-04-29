import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api/v1";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export function getApiErrorMessage(error) {
  return error?.response?.data?.message ?? error?.message ?? "Something went wrong";
}
