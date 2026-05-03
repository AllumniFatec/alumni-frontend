import { apiBase } from "@/lib/axiosInstance";
import type {
  CreatePostResponse,
  PostContentPayload,
  PostsListResponse,
  UpdatePostResponse,
  Post,
} from "@/models/posts";

export class PostsApi {
  static async updatePostLike(postId: string): Promise<string> {
    try {
      const response = await apiBase.post<string>(`post/like/${postId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async createPost(
    payload: PostContentPayload,
  ): Promise<CreatePostResponse> {
    try {
      const response = await apiBase.post<CreatePostResponse>("/post", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getPostById(id: string): Promise<Post> {
    try {
      const response = await apiBase.get<Post>(`/post/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getPostsByUserId(
    userId: string,
    page: number = 1,
  ): Promise<PostsListResponse> {
    try {
      const response = await apiBase.get<PostsListResponse>(`/post/user/${userId}`, {
        params: { page },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updatePost(
    payload: PostContentPayload,
  ): Promise<UpdatePostResponse> {
    try {
      const response = await apiBase.patch<UpdatePostResponse>(
        `/post/${payload.post_id}`,
        payload,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deletePost(postId: string): Promise<string> {
    try {
      const response = await apiBase.delete<string>(`/post/${postId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
