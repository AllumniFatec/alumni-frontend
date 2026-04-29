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
  /* removido por enquanto, token é enviado no cookie httpOnly
  const token = AuthStorage.getToken();

  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  }
  */

  /**
   * A instância define `Content-Type: application/json` por padrão. Para `FormData`,
   * o motor (XHR/fetch) precisa definir `multipart/form-data` **com** o `boundary`;
   * se mandarmos `application/json`, o servidor (ex.: Multer) não recebe arquivo.
   */
  if (requestConfig.data instanceof FormData) {
    requestConfig.headers.delete("Content-Type");
  }

  return requestConfig;
});

const AUTH_ROUTES = [
  ApiRoutes.Login,
  ApiRoutes.Register,
  ApiRoutes.Logout,
  ApiRoutes.Me,
  ApiRoutes.Reactivate,
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
      // AuthStorage.removeToken(); // removido por enquanto, token é enviado no cookie httpOnly
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
