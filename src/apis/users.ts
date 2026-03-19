"use-client";
import { User } from "@/models/users";
import { apiBase } from "@/lib/axiosInstance";

export class UserApi {
  static async getUsers(): Promise<User[]> {
    try {
      const response = await apiBase.get<User[]>("/feed");
      // const response = await axios.get(`${API_BASE_URL}/user/list-users`, {});

      // console.info(
      //   `TO AQUI :   users loaded: ${response.data.length} users from API`
      // );
      return response.data;
    } catch (error) {
      console.error("getUsers error", error);
      throw error;
    }
  }
  static async getUserById(userId: number): Promise<User> {
    try {
      const response = await apiBase.get<User>(`/user/${userId}`);
      console.info(`user loaded: ${response.data.name}`);
      return response.data;
    } catch (error) {
      console.error("getUserById error", error);
      throw error;
    }
  }
}
