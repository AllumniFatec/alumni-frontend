import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { AdminApi } from "@/apis/admin";

function adminMutationErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { error?: string; message?: string }
      | undefined;
    if (data?.error) return data.error;
    if (data?.message) return data.message;
    return error.message;
  }
  if (error instanceof Error) return error.message;
  return "Não foi possível concluir a operação.";
}

const toastSuccessOpts = {
  duration: 5000,
  position: "top-right" as const,
  className:
    "!bg-green-500 !text-white !border-green-600 [&_[data-description]]:!text-white",
};

const toastErrorOpts = {
  duration: 5000,
  position: "top-right" as const,
  className:
    "!bg-red-500 !text-white !border-red-600 [&_[data-description]]:!text-white",
};

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
  return useMutation({
    mutationFn: (userId: string) => AdminApi.approveUser(userId),
    onSuccess: (data) => {
      toast.success("Usuário aprovado", {
        description: data.message,
        ...toastSuccessOpts,
      });
      qc.invalidateQueries({ queryKey: ADMIN_DASHBOARD_QUERY_KEY });
      qc.invalidateQueries({ queryKey: ADMIN_USERS_LIST_QUERY_KEY });
    },
    onError: (error) => {
      toast.error("Erro ao aprovar usuário", {
        description: adminMutationErrorMessage(error),
        ...toastErrorOpts,
      });
    },
  });
}

export function useRefuseUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => AdminApi.refuseUser(userId),
    onSuccess: (data) => {
      toast.success("Usuário recusado", {
        description: data.message,
        ...toastSuccessOpts,
      });
      qc.invalidateQueries({ queryKey: ADMIN_DASHBOARD_QUERY_KEY });
      qc.invalidateQueries({ queryKey: ADMIN_USERS_LIST_QUERY_KEY });
    },
    onError: (error) => {
      toast.error("Erro ao recusar usuário", {
        description: adminMutationErrorMessage(error),
        ...toastErrorOpts,
      });
    },
  });
}
