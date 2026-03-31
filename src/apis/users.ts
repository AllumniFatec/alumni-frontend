"use client";

import { apiBase } from "@/lib/axiosInstance";
import type { PublicUserListItem, UserPublicProfileDetail } from "@/models/userPublic";

const USERS_PAGE_SIZE = 40;

export class UserApi {
  /** `GET /user?page=` — até 40 itens por página (backend). */
  static async getUsersPage(page: number = 1): Promise<PublicUserListItem[]> {
    try {
      const response = await apiBase.get<PublicUserListItem[]>("/user", {
        params: { page },
      });
      return response.data;
    } catch (error) {
      console.error("UserApi.getUsersPage", error);
      throw error;
    }
  }

  /** `GET /user/search?search=` */
  static async searchUsers(search: string): Promise<PublicUserListItem[]> {
    const q = search.trim();
    if (!q) return [];
    try {
      const response = await apiBase.get<PublicUserListItem[]>("/user/search", {
        params: { search: q },
      });
      return response.data;
    } catch (error) {
      console.error("UserApi.searchUsers", error);
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
      console.error("UserApi.getUserById", error);
      throw error;
    }
  }

  static readonly PAGE_SIZE = USERS_PAGE_SIZE;
}
