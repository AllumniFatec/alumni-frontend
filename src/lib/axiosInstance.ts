import axios from "axios";
import { config } from "@/config/env";
import { AuthStorage } from "@/store/auth";
import { ApiRoutes, AuthRoutes } from "@/config/routes";

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

const AUTH_ROUTES = [
  ApiRoutes.Login,
  ApiRoutes.Register,
  ApiRoutes.Logout,
  ApiRoutes.Me,
];

apiBase.interceptors.response.use(
  (response) => response,
  async (error) => {
    const requestUrl = error.config?.url ?? "";
    const isAuthRoute = AUTH_ROUTES.some((route) => requestUrl.includes(route));

    if (
      error.response?.status === 401 &&
      !isAuthRoute &&
      typeof window !== "undefined"
    ) {
      AuthStorage.removeToken();
      // Limpa o cookie httpOnly do servidor
      await axios
        .post(`${config.api.baseUrl}/auth/logout`, null, {
          withCredentials: true,
        })
        .catch(() => {});
      window.location.href = AuthRoutes.SignIn;
    }
    return Promise.reject(error);
  },
);
