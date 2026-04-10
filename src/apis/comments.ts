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

  static async updateComment(
    commentId: string,
    content: string,
  ): Promise<{ message: string }> {
    const response = await apiBase.patch<{ message: string }>(
      `/post/comment/${commentId}`,
      { content },
    );
    return response.data;
  }

  static async deleteComment(commentId: string): Promise<string> {
    const response = await apiBase.delete<string>(
      `/post/comment/${commentId}`,
    );
    return response.data;
  }
}
