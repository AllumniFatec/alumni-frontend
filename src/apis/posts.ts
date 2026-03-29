import { apiBase } from "@/lib/axiosInstance";
import type {
  CreatePostResponse,
  PostContentPayload,
  UpdatePostResponse,
} from "@/models/posts";

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

  static async createPost(
    payload: PostContentPayload,
  ): Promise<CreatePostResponse> {
    try {
      console.log("Creating post:", payload);
      const response = await apiBase.post<CreatePostResponse>("/post", payload);
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }

  static async updatePost(
    payload: PostContentPayload,
  ): Promise<UpdatePostResponse> {
    try {
      console.log("Updating post:", payload.post_id);
      const response = await apiBase.patch<UpdatePostResponse>(
        `/post/${payload.post_id}`,
        payload,
      );
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  }

  static async deletePost(postId: string): Promise<string> {
    try {
      console.log("Deleting post:", postId);
      const response = await apiBase.delete<string>(`/post/${postId}`);
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  }
}
