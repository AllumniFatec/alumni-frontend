import { apiBase } from "@/lib/axiosInstance";

export class CommentsApi {
  static async createComment(
    postId: string,
    content: string,
  ): Promise<{ message: string }> {
    const response = await apiBase.post<{ message: string }>(
      `/post/comment/${postId}`,
      { content },
    );
    return response.data;
  }
}
