import { apiBase } from "@/lib/axiosInstance";
import type {
  AdminDashboardResponse,
  AdminMutationMessage,
  AdminPendingUsersApiRawResponse,
  AdminPendingUsersResponse,
  AdminUserSearchResult,
  AdminUsersListResponse,
  BanReason,
} from "@/models/admin";
import type { UserType } from "@/models/users";

export class AdminApi {
  static async getDashboard(): Promise<AdminDashboardResponse> {
    try {
      const response =
        await apiBase.get<AdminDashboardResponse>("/admin/dashboard");
      return response.data;
    } catch (error) {
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
      throw error;
    }
  }

  static async changeUserType(
    userId: string,
    type: UserType,
  ): Promise<AdminMutationMessage> {
    try {
      const response = await apiBase.patch<AdminMutationMessage>(
        `/admin/users/changeType/${userId}`,
        { type },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async banUser(
    userId: string,
    payload: { reason: BanReason; description: string },
  ): Promise<AdminMutationMessage> {
    try {
      const response = await apiBase.post<AdminMutationMessage>(
        `/admin/users/ban/${userId}`,
        payload,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
