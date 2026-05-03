import { apiBase } from "@/lib/axiosInstance";
import { Course } from "@/models/course";

export type AdminCourseMutationBody = {
  courseName: string;
  courseAbbreviation: string;
};

export type AdminCourseMutationResponse = {
  message: string;
};

export class CoursesApi {
  static async getCourses(): Promise<Course[]> {
    const response = await apiBase.get<Course[]>("/course");
    return response.data;
  }

  static async createCourse(
    body: AdminCourseMutationBody,
  ): Promise<AdminCourseMutationResponse> {
    const response = await apiBase.post<AdminCourseMutationResponse>(
      "/admin/courses",
      body,
    );
    return response.data;
  }

  static async updateCourse(
    courseId: string,
    body: AdminCourseMutationBody,
  ): Promise<AdminCourseMutationResponse> {
    const response = await apiBase.put<AdminCourseMutationResponse>(
      `/admin/courses/${courseId}`,
      body,
    );
    return response.data;
  }
}
