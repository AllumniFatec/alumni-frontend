import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AdminApi } from "@/apis/admin";

export const ADMIN_DASHBOARD_QUERY_KEY = ["admin", "dashboard"] as const;

export const ADMIN_USERS_LIST_QUERY_KEY = ["admin", "users", "list"] as const;

export function useAdminDashboard() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ADMIN_DASHBOARD_QUERY_KEY,
    queryFn: () => AdminApi.getDashboard(),
  });

  return { data, isLoading, isError, error, refetch };
}

export function useAdminSearchUsers(search: string, page: number = 1) {
  const trimmed = search.trim();
  const enabled = trimmed.length > 0;

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["admin", "users", "search", trimmed, page] as const,
    queryFn: () =>
      AdminApi.searchUsers({ search: trimmed, page }),
    enabled,
  });

  return { data, isLoading, isError, error, refetch, enabled };
}

export function useAdminUsers() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ADMIN_USERS_LIST_QUERY_KEY,
    queryFn: ({ pageParam = 1 }) =>
      AdminApi.getUsers(pageParam as number),
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
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}

export function useApproveUser() {
  const qc = useQueryClient();
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (userId: string) => AdminApi.approveUser(userId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ADMIN_DASHBOARD_QUERY_KEY });
      qc.invalidateQueries({ queryKey: ADMIN_USERS_LIST_QUERY_KEY });
    },
  });

  return { mutateAsync, isPending, isError, error };
}

export function useRefuseUser() {
  const qc = useQueryClient();
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (userId: string) => AdminApi.refuseUser(userId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ADMIN_DASHBOARD_QUERY_KEY });
      qc.invalidateQueries({ queryKey: ADMIN_USERS_LIST_QUERY_KEY });
    },
  });

  return { mutateAsync, isPending, isError, error };
}
