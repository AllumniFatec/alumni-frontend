import axios from "axios";
const API_BASE_URL = "https://jsonplaceholder.typicode.com/";

export class MockPostApi {
  static async getPosts() {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts`);
      return response.data;
    } catch (error) {
      console.error("getPosts error", error);
    }
  }

  static async getPostById(postId: number) {
    try {
      const response = await axios.post(`${API_BASE_URL}/posts/${postId}`);
      return response.data;
    } catch (error) {
      console.error("getPostById error", error);
    }
  }
  static async createPost(title: string, body: string) {
    try {
      const response = await axios.post(`${API_BASE_URL}/posts`, {
        title,
        body,
      });
      return response.data;
    } catch (error) {
      console.error("createPost error", error);
    }
  }

  static async updatePost(postId: number) {
    try {
      const response = await axios.put(`${API_BASE_URL}/posts/${postId}`);
      return response.data;
    } catch (error) {
      console.error("updatePost error", error);
    }
  }

  static async deletePost(postId: number) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/posts/${postId}`);
      return response.data;
    } catch (error) {
      console.error("deletePost error", error);
    }
  }
}
