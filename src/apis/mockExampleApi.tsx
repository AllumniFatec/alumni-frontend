import axios from "axios";
import { Post } from "@/models/posts";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export class MockPostApi {
  static async getPosts(): Promise<Post[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts`);
      console.log(`✅ Posts carregados: ${response.data.length} posts da API`);
      return response.data;
    } catch (error) {
      console.error("getPosts error", error);
      throw error;
    }
  }

  static async getPostById(postId: number): Promise<Post> {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/${postId}`);
      console.log(`✅ Post carregado: ${response.data.title}`);
      return response.data;
    } catch (error) {
      console.error("getPostById error", error);
      throw error;
    }
  }

  static async createPost(title: string, body: string): Promise<Post> {
    try {
      const response = await axios.post(`${API_BASE_URL}/posts`, {
        title,
        body,
        userId: 1,
      });
      console.log(`✅ Post criado: ${response.data.title}`);
      return response.data;
    } catch (error) {
      console.error("createPost error", error);
      throw error;
    }
  }

  static async updatePost(
    postId: number,
    title: string,
    body: string
  ): Promise<Post> {
    try {
      const response = await axios.put(`${API_BASE_URL}/posts/${postId}`, {
        id: postId,
        title,
        body,
        userId: 1,
      });
      console.log(`✅ Post atualizado: ${response.data.title}`);
      return response.data;
    } catch (error) {
      console.error("updatePost error", error);
      throw error;
    }
  }

  static async deletePost(postId: number): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/posts/${postId}`);
      console.log(`✅ Post deletado: ${postId}`);
    } catch (error) {
      console.error("deletePost error", error);
      throw error;
    }
  }
}
