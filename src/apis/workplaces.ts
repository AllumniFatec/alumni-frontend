import { apiBase } from "@/lib/axiosInstance";
import { Workplace } from "@/models/workplace";

export class WorkplacesApi {
  static async getWorkplaces(): Promise<Workplace[]> {
    const response = await apiBase.get<Workplace[]>("/workplace");
    return response.data;
  }
}
