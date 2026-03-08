/**
 * Utilitários para gerenciar autenticação e tokens via cookie
 *
 * O token é armazenado em um cookie acessível ao JS (não-HttpOnly) para
 * que o interceptor Axios consiga lê-lo e injetá-lo no header Authorization.
 * O servidor também pode configurar um cookie HttpOnly separado para o
 * refresh token, que é enviado automaticamente pelo browser.
 */

const TOKEN_COOKIE = "alumni_auth_token";
// Expiração padrão: 1 dia
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24;

// ──────────────────────────────────────────────
// Helpers de cookie
// ──────────────────────────────────────────────
function setCookie(name: string, value: string, maxAge: number): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Strict`;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

function deleteCookie(name: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; max-age=0`;
}

// ──────────────────────────────────────────────

export interface StoredUser {
  id: number;
  name: string;
  email: string;
  userType: string;
}

export class AuthStorage {
  /**
   * Salva o token de autenticação em cookie.
   * Chamado manualmente após login quando o token vem no body da resposta.
   * Se o servidor já define o cookie via Set-Cookie, esta chamada é opcional.
   */
  static setToken(token: string): void {
    setCookie(TOKEN_COOKIE, token, COOKIE_MAX_AGE_SECONDS);
  }

  /**
   * Recupera o token de autenticação do cookie.
   * Retorna null se não estiver no browser ou o cookie não existir.
   */
  static getToken(): string | null {
    return getCookie(TOKEN_COOKIE);
  }

  /**
   * Remove o token de autenticação do cookie. Vai ser usado para fazer logout.
   */
  static removeToken(): void {
    deleteCookie(TOKEN_COOKIE);
  }
}
