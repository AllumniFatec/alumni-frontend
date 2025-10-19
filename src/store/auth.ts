/**
 * Utilitários para gerenciar autenticação e tokens no localStorage
 */

const TOKEN_KEY = "alumni_auth_token";

export interface StoredUser {
  id: number;
  name: string;
  email: string;
  userType: string;
}

export class AuthStorage {
  /**
   * Salva o token de autenticação no localStorage
   */
  static setToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, token);
    }
  }

  /**
   * Recupera o token de autenticação do localStorage
   */
  static getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  }

  /**
   * Remove o token de autenticação do localStorage
   */
  static removeToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      console.log("🗑️ Token removido do localStorage");
    }
  }
}
