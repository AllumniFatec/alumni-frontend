import { apiBase } from "@/lib/axiosInstance";
import type {
  AdminDashboardResponse,
  AdminMutationMessage,
  AdminPendingUsersApiRawResponse,
  AdminPendingUsersResponse,
  AdminUserSearchResult,
  AdminUsersListResponse,
} from "@/models/admin";

export class AdminApi {
  static async getDashboard(): Promise<AdminDashboardResponse> {
    try {
      const response =
        await apiBase.get<AdminDashboardResponse>("/admin/dashboard");
      return response.data;
    } catch (error) {
      console.error("Error fetching admin dashboard:", error);
      throw error;
    }
  }

  static async getUsersInAnalysis(
    page: number = 1,
  ): Promise<AdminPendingUsersResponse> {
    try {
      const response = await apiBase.get<AdminPendingUsersApiRawResponse>(
        "/admin/dashboard",
        {
          params: { page },
        },
      );

      const raw = response.data;
      const users = raw.users ?? raw.usersInAnalysis ?? [];
      //const rawPagination = raw.pagination;
      const pagination = raw.pagination;
      if (pagination) {
        return {
          users,
          pagination,
        };
      }

      const totalItems = raw.countUsersInAnalysis ?? users.length;
      const limit = users.length || 10;
      const totalPages = Math.ceil(totalItems / limit) || 1;

      return {
        users,
        pagination: {
          page,
          limit,
          totalItems,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      };
    } catch (error) {
      console.error("Error listing users in analysis:", page, error);
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
      const response = await apiBase.get<AdminUsersListResponse>(
        "/admin/users",
        {
          params: { page },
        },
      );
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
