import { apiBase } from "@/lib/axiosInstance";
import type {
  AdminDashboardResponse,
  AdminMutationMessage,
  AdminUserSearchResult,
  AdminUsersListResponse,
} from "@/models/admin";

export class AdminApi {
  static async getDashboard(): Promise<AdminDashboardResponse> {
    try {
      const response = await apiBase.get<AdminDashboardResponse>(
        "/admin/dashboard",
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching admin dashboard:", error);
      throw error;
    }
  }

  static async approveUser(userId: string): Promise<AdminMutationMessage> {
    try {
      const response = await apiBase.post<AdminMutationMessage>(
        `/admin/approve/${userId}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error approving user:", userId, error);
      throw error;
    }
  }

  static async refuseUser(userId: string): Promise<AdminMutationMessage> {
    try {
      const response = await apiBase.post<AdminMutationMessage>(
        `/admin/refuse/${userId}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error refusing user:", userId, error);
      throw error;
    }
  }

  static async getUsers(page: number = 1): Promise<AdminUsersListResponse> {
    try {
      const response = await apiBase.get<AdminUsersListResponse>("/admin/users", {
        params: { page },
      });
      return response.data;
    } catch (error) {
      console.error("Error listing admin users:", page, error);
      throw error;
    }
  }

  static async searchUsers(params: {
    search?: string;
    page?: number;
  }): Promise<AdminUserSearchResult> {
    try {
      const response = await apiBase.get<AdminUserSearchResult>(
        "/admin/users/search",
        { params },
      );
      return response.data;
    } catch (error) {
      console.error("Error searching admin users:", params, error);
      throw error;
    }
  }
}
