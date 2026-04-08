import { useQuery } from "@tanstack/react-query";
import { apiBase } from "@/lib/axiosInstance";

type CourseItem = {
  course_id: string;
  name: string;
  abbreviation: string;
};

type WorkplaceItem = {
  workplace_id: string;
  company: string;
};

export function useCourses() {
  const { data: courses } = useQuery<CourseItem[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await apiBase.get<CourseItem[]>("/course");
      return response.data;
    },
  });

  return courses;
}

export function useWorkplaces() {
  const { data: workplaces } = useQuery<WorkplaceItem[]>({
    queryKey: ["workplaces"],
    queryFn: async () => {
      const response = await apiBase.get<WorkplaceItem[]>("/workplace");
      return response.data;
    },
  });

  return workplaces;
}
