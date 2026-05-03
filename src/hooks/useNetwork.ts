import { useQuery } from "@tanstack/react-query";
import { WorkplacesApi } from "@/apis/workplaces";

export function useWorkplaces() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["workplaces", "list"],
    queryFn: () => WorkplacesApi.getWorkplaces(),
  });

  return { data, isLoading, isError, refetch };
}
