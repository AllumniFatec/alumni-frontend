"use client";

import { apiBase } from "@/lib/axiosInstance";
import type { UserPublicProfileDetail, UsersListResponse } from "@/models/userPublic";

const USERS_PAGE_SIZE = 40;

export class UserApi {
  /** `GET /user?page=` — até 40 itens por página (backend). */
  static async getUsersPage(page: number = 1): Promise<UsersListResponse> {
    try {
      const response = await apiBase.get<UsersListResponse>("/user", {
        params: { page },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /** `GET /user/search?search=&page=` */
  static async searchUsers(
    search: string,
    page: number = 1,
  ): Promise<UsersListResponse> {
    const q = search.trim();
    if (!q) {
      return {
        users: [],
        pagination: {
          page: 1,
          limit: USERS_PAGE_SIZE,
          totalItems: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };
    }
    try {
      const response = await apiBase.get<UsersListResponse>("/user/search", {
        params: { search: q, page },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /** `GET /user/:userId` */
  static async getUserById(userId: string): Promise<UserPublicProfileDetail> {
    try {
      const response = await apiBase.get<UserPublicProfileDetail>(
        `/user/${userId}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static readonly PAGE_SIZE = USERS_PAGE_SIZE;
}
