import { useQuery } from "@tanstack/react-query";
import { WorkplacesApi } from "@/apis/workplaces";
import { SkillsApi } from "@/apis/skills";

export function useWorkplaces() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["workplaces", "list"],
    queryFn: () => WorkplacesApi.getWorkplaces(),
  });

  return { data, isLoading, isError, refetch };
}

export function useSkills() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["skills", "list"],
    queryFn: () => SkillsApi.getSkills(),
  });

  return { data, isLoading, isError, refetch };
}
