import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { AdminApi } from "@/apis/admin";
import type { AdminUsersListResponse } from "@/models/admin";
import type { BanReason } from "@/models/admin";
import type { UserType } from "@/models/users";

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
export const ADMIN_PENDING_USERS_QUERY_KEY = [
  "admin",
  "users",
  "analysis",
] as const;

export const ADMIN_USERS_LIST_QUERY_KEY = ["admin", "users", "list"] as const;

export function adminUsersSearchQueryKey(term: string) {
  return ["admin", "users", "search", term] as const;
}

export function useAdminDashboard() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ADMIN_DASHBOARD_QUERY_KEY,
    queryFn: () => AdminApi.getDashboard(),
  });

  return { data, isLoading, isError, error, refetch };
}

export function useAdminPendingUsers() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ADMIN_PENDING_USERS_QUERY_KEY,
    queryFn: ({ pageParam = 1 }) =>
      AdminApi.getUsersInAnalysis(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.hasNextPage) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
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
    isFetching,
  };
}

export function useAdminSearchUsers(search: string) {
  const trimmed = search.trim();
  const enabled = trimmed.length > 0;

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: adminUsersSearchQueryKey(trimmed),
    queryFn: async ({ pageParam = 1 }) => {
      const res = await AdminApi.searchUsers({
        search: trimmed,
        page: pageParam as number,
      });
      return Array.isArray(res)
        ? ({
            users: res,
            pagination: {
              page: 1,
              limit: res.length || 1,
              totalPages: 1,
              totalItems: res.length,
              hasNextPage: false,
              hasPreviousPage: false,
            },
          } satisfies AdminUsersListResponse)
        : res;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.page + 1
        : undefined,
    enabled,
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
    isFetching,
  };
}

export function useAdminUsers(options?: { enabled?: boolean }) {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ADMIN_USERS_LIST_QUERY_KEY,
    queryFn: ({ pageParam = 1 }) => AdminApi.getUsers(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.page + 1
        : undefined,
    enabled: options?.enabled ?? true,
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
    isFetching,
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
      qc.invalidateQueries({ queryKey: ADMIN_PENDING_USERS_QUERY_KEY });
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
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
      qc.invalidateQueries({ queryKey: ADMIN_PENDING_USERS_QUERY_KEY });
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
    },
    onError: (error) => {
      toast.error("Erro ao recusar usuário", {
        description: adminMutationErrorMessage(error),
        ...toastErrorOpts,
      });
    },
  });
}

export function useChangeUserType() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { userId: string; type: UserType }) =>
      AdminApi.changeUserType(vars.userId, vars.type),
    onSuccess: (data) => {
      toast.success("Tipo de usuário alterado", {
        description: data.message,
        ...toastSuccessOpts,
      });
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
      qc.invalidateQueries({ queryKey: ADMIN_USERS_LIST_QUERY_KEY });
      qc.invalidateQueries({ queryKey: ["admin", "users", "search"] });
    },
    onError: (error) => {
      toast.error("Erro ao alterar tipo de usuário", {
        description: adminMutationErrorMessage(error),
        ...toastErrorOpts,
      });
    },
  });
}

export function useBanUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: {
      userId: string;
      reason: BanReason;
      description: string;
    }) =>
      AdminApi.banUser(vars.userId, {
        reason: vars.reason,
        description: vars.description,
      }),
    onSuccess: (data) => {
      toast.success("Usuário banido", {
        description: data.message,
        ...toastSuccessOpts,
      });
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
      qc.invalidateQueries({ queryKey: ADMIN_USERS_LIST_QUERY_KEY });
      qc.invalidateQueries({ queryKey: ["admin", "users", "search"] });
    },
    onError: (error) => {
      toast.error("Erro ao banir usuário", {
        description: adminMutationErrorMessage(error),
        ...toastErrorOpts,
      });
    },
  });
}
