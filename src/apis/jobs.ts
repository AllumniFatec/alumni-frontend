import { apiBase } from "@/lib/axiosInstance";
import { JobDetail, JobPayload, JobsListResponse } from "@/models/job";

export class JobApi {
  static async getJobs(page: number = 1): Promise<JobsListResponse> {
    const response = await apiBase.get<JobsListResponse>("/job", {
      params: { page },
    });
    return response.data;
  }

  static async getJobById(id: string): Promise<JobDetail> {
    const response = await apiBase.get<JobDetail>(`/job/${id}`);
    return response.data;
  }

  static async createJob(data: JobPayload): Promise<{ message: string }> {
    try {
      const response = await apiBase.post<{ message: string }>("/job", data);
      return response.data;
    } catch (error) {
      console.error("Error creating job:", error);
      throw error;
    }
  }

  static async updateJob(
    id: string,
    data: Partial<JobPayload>,
  ): Promise<{ message: string }> {
    const response = await apiBase.put<{ message: string }>(`/job/${id}`, data);
    return response.data;
  }

  static async deleteJob(id: string): Promise<{ message: string }> {
    const response = await apiBase.delete<{ message: string }>(`/job/${id}`);
    return response.data;
  }
}
