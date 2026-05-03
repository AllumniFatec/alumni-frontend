import axios from "axios";

const API_BASE_URL = "http://localhost:3001"; // URL do json-server local

export class MockPostApi {
  static async getPosts(): Promise<unknown[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getPostById(postId: number): Promise<unknown> {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/${postId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async createPost(title: string, body: string): Promise<unknown> {
    try {
      const response = await axios.post(`${API_BASE_URL}/posts`, {
        title,
        body,
        userId: 1,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updatePost(
    postId: number,
    title: string,
    body: string,
  ): Promise<unknown> {
    try {
      const response = await axios.put(`${API_BASE_URL}/posts/${postId}`, {
        id: postId,
        title,
        body,
        userId: 1,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deletePost(postId: number): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/posts/${postId}`);
    } catch (error) {
      throw error;
    }
  }
}
