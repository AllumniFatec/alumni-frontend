import { User } from "@/models/users";
import { AuthStorage } from "@/store/auth";
import axios from "axios";
const API_BASE_URL = "http://localhost:3001";

export class UserApi {
  static async getUsers(): Promise<User[]> {
    try {
      //must improve this one
      const token = AuthStorage.getToken();
      const response = await axios.get(`${API_BASE_URL}/list-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.info(`users loaded: ${response.data.length}`);
      return response.data;
    } catch (error) {
      console.error("getUsers error", error);
      throw error;
    }
  }
}
