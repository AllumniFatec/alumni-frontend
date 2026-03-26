import { apiBase } from "@/lib/axiosInstance";

export class PostsApi {
  static async updatePostLike(postId: string): Promise<string> {
    try {
      console.log("Updating post:", postId);
      const response = await apiBase.post<string>(`post/like/${postId}`); 
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  }
}
