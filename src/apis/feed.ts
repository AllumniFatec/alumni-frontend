import { apiBase } from "@/lib/axiosInstance";
import { FeedResponse } from "@/models";

export class FeedApi {
  static async getFeed(page: number = 1): Promise<FeedResponse> {
    try {
      const response = await apiBase.get<FeedResponse>("/feed", {
        params: { page },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
