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
      const response = await apiBase.get<AdminDashboardResponse>(
        "/admin/dashboard",
      );
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
      const rawPagination = raw.pagination;
      const pagination =
        rawPagination && "pagination" in rawPagination
          ? rawPagination.pagination
          : rawPagination;

      if (pagination) {
        return {
          users,
          pagination,
        };
      }

      return {
        users,
        pagination: {
          page: 1,
          limit: users.length || 10,
          totalItems: raw.countUsersInAnalysis ?? users.length,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
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
