import { AuthResponse, LoginInUser, NewUser } from "@/models/users";
import { apiBase } from "@/lib/axiosInstance";

export class AuthApi {
  static async signIn(loginInUser: LoginInUser): Promise<AuthResponse> {
    try {
      console.warn("loginInUser:", loginInUser);
      const response = await apiBase.post<AuthResponse>(
        "/auth/login",
        loginInUser,
      );
      // Log do usuário para depuração
      console.info(`USER AUTHENTICATED: ${loginInUser.email}`);
      return response.data;
    } catch (error) {
      console.error("signIn error", error);
      throw error;
    }
  }

  static async signUp(
    newUser: NewUser,
  ): Promise<{ userId: number; message: string }> {
    try {
      const response = await apiBase.post<{ userId: number; message: string }>(
        "/auth/register",
        newUser,
      );
      console.info(`USER REGISTERED: ${newUser.email}`);
      return response.data;
    } catch (error) {
      console.error("ERRO NO SIGNUP", error);
      throw error;
    }
  }

  static async confirmCode(code: string): Promise<{ message: string }> {
    try {
      const response = await apiBase.post<{ message: string }>(
        "/auth/confirm-code",
        { code },
      );
      return response.data;
    } catch (error) {
      console.error("confirmCode error", error);
      throw error;
    }
  }

  static async forgotPassword(email: string): Promise<{ message: string }> {
    try {
      const response = await apiBase.post<{ message: string }>(
        "/password/forgot-password",
        { email },
      );
      return response.data;
    } catch (error) {
      console.error("forgotPassword error", error);
      throw error;
    }
  }

  static async resetPassword(
    newPassword: string,
    token: string,
  ): Promise<{ message: string }> {
    try {
      const response = await apiBase.patch<{ message: string }>(
        `/password/reset-password/${token}`,
        { password: newPassword },
      );
      return response.data;
    } catch (error) {
      console.error("resetPassword error", error);
      throw error;
    }
  }
}
