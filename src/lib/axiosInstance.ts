import axios from "axios";
import { config } from "@/config/env";
import { AuthStorage } from "@/store/auth";

export const apiBase = axios.create({
  baseURL: config.api.baseUrl,
  timeout: config.api.timeout,
  headers: {
    "Content-Type": "application/json",
  },
  // Envia o cookie httpOnly `access_token` automaticamente em toda requisição
  withCredentials: true,
});

apiBase.interceptors.request.use((requestConfig) => {
  const token = AuthStorage.getToken();

  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  }

  return requestConfig;
});
