import { useQuery } from "@tanstack/react-query";
import { CoursesApi } from "@/apis/courses";
import { WorkplacesApi } from "@/apis/workplaces";

export function useCourses() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["courses", "list"],
    queryFn: () => CoursesApi.getCourses(),
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}

export function useWorkplaces() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["workplaces", "list"],
    queryFn: () => WorkplacesApi.getWorkplaces(),
  });

  return { data, isLoading, isError, refetch };
}
