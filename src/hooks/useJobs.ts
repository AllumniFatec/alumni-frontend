import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { JobApi } from "@/apis/jobs";
import { JobPayload } from "@/models/job";
import { PROFILE_QUERY_KEY } from "@/hooks/useProfile";

export function useJobs() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["jobs", "list"],
    queryFn: ({ pageParam = 1 }) => JobApi.getJobs(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.page + 1
        : undefined,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}

export function useJobById(id: string) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["jobs", "detail", id],
    queryFn: () => JobApi.getJobById(id),
    enabled: !!id,
  });

  return { data, isLoading, isError, refetch };
}

export function useCreateJob() {
  const qc = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: JobPayload) => JobApi.createJob(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["jobs", "list"] });
      qc.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
  });

  return { mutateAsync, isPending };
}

export function useUpdateJob(id: string) {
  const qc = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: Partial<JobPayload>) => JobApi.updateJob(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["jobs", "list"] });
      qc.invalidateQueries({ queryKey: ["jobs", "detail", id] });
      qc.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
  });

  return { mutateAsync, isPending };
}

export function useDeleteJob() {
  const qc = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (id: string) => {
      await JobApi.deleteJob(id);
      qc.removeQueries({ queryKey: ["jobs", "detail", id] });
      await qc.invalidateQueries({ queryKey: ["jobs", "list"] });
      await qc.refetchQueries({ queryKey: PROFILE_QUERY_KEY });
    },
  });

  return { mutateAsync, isPending };
}

export function useCloseJob() {
  const qc = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (id: string) => {
      await JobApi.closeJob(id);
      qc.invalidateQueries({ queryKey: ["jobs", "detail", id] });
      qc.invalidateQueries({ queryKey: ["jobs", "list"] });
    },
  });

  return { mutateAsync, isPending };
}
