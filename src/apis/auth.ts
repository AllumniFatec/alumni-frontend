import { AuthResponse, LoginInUser, NewUser } from "@/models/users";
import axios from "axios";
import { AuthStorage } from "@/store/auth";

const API_BASE_URL = "https://scot-nonanaemic-gracia.ngrok-free.dev";

export class AuthApi {
  static async signIn(loginInUser: LoginInUser): Promise<AuthResponse> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/login`,
        loginInUser
      );
      const authData: AuthResponse = response.data;

      if (authData.token) {
        AuthStorage.setToken(authData.token);
      }

      console.info(`USER AUTHENTICATED: ${loginInUser.email}`);
      return authData;
    } catch (error) {
      console.error("signIn error", error);
      throw error;
    }
  }

  static async signUp(
    newUser: NewUser
  ): Promise<{ userId: number; message: string }> {
    try {
      console.warn("antes de fazer o post", newUser);
      console.warn("URL completa:", `${API_BASE_URL}/user/register`);
      const response = await axios.post(
        `${API_BASE_URL}/user/register`,
        newUser
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
      const response = await axios.post(`${API_BASE_URL}/user/confirm-code`, {
        code,
      });
      return response.data;
    } catch (error) {
      console.error("confirmCode error", error);
      throw error;
    }
  }

  static async forgotPassword(email: string): Promise<{ message: string }> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/password/forgot-password`,
        {
          email,
        }
      );
      return response.data;
    } catch (error) {
      console.error("forgotPassword error", error);
      throw error;
    }
  }

  static async resetPassword(
    newPassword: string,
    token: string
  ): Promise<{ message: string }> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/password/reset-password`,
        {
          newPassword,
          token, // Enviando o token no body
        }
      );
      return response.data;
    } catch (error) {
      console.error("resetPassword error", error);
      throw error;
    }
  }
}
