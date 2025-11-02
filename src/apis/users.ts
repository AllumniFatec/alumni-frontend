"use-client";
import { User } from "@/models/users";
import { AuthStorage } from "@/store/auth";
import axios from "axios";
const API_BASE_URL = "https://scot-nonanaemic-gracia.ngrok-free.dev";

export class UserApi {
  static async getUsers(): Promise<User[]> {
    try {
      //must improve this one
      const token = AuthStorage.getToken();

      // const response = await axios.get(`${API_BASE_URL}/user/list-users`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     "Content-Type": "application/json",
      //     "ngrok-skip-browser-warning": "true",
      //   },
      // });
      const response = await axios.get(`${API_BASE_URL}/user/list-users`, {});

      console.info(
        `TO AQUI :   users loaded: ${response.data.length} users from API`
      );
      return response.data;
    } catch (error) {
      console.error("getUsers error", error);
      throw error;
    }
  }
  static async getUserById(userId: number): Promise<User> {
    try {
      //TODO: REMOVING NGROK SKIP HEADER AFTER TESTS
      const token = AuthStorage.getToken();
      const response = await axios.get(`${API_BASE_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });
      console.info(`user loaded: ${response.data.name}`);
      return response.data;
    } catch (error) {
      console.error("getUserById error", error);
      throw error;
    }
  }
}
