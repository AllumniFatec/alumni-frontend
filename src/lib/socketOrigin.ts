import { config } from "@/config/env";

/** Origem do servidor (Socket.IO costuma escutar na raiz, não em /api). */
export function getSocketOrigin(): string {
  try {
    return new URL(config.api.baseUrl).origin;
  } catch {
    return config.api.baseUrl.replace(/\/$/, "");
  }
}
