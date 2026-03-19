import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { JobApi } from "@/apis/jobs";
import { JobPayload } from "@/models/job";

const JOB_PAGE_SIZE = 20;

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
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === JOB_PAGE_SIZE ? allPages.length + 1 : undefined,
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
    onSuccess: () => qc.invalidateQueries({ queryKey: ["jobs", "list"] }),
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
    },
  });

  return { mutateAsync, isPending };
}

export function useDeleteJob() {
  const qc = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id: string) => JobApi.deleteJob(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["jobs", "list"] }),
  });

  return { mutateAsync, isPending };
}
