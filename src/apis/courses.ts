import { apiBase } from "@/lib/axiosInstance";
import { Course } from "@/models/course";

export class CoursesApi {
  static async getCourses(): Promise<Course[]> {
    const response = await apiBase.get<Course[]>("/course");
    return response.data;
  }
}
