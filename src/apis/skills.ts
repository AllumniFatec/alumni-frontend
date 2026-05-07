import { apiBase } from "@/lib/axiosInstance";
import { Skill } from "@/models/skill";

export class SkillsApi {
  static async getSkills(): Promise<Skill[]> {
    const response = await apiBase.get<Skill[]>("/skill");
    return response.data;
  }
}
