"use client";

import { useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserApi } from "@/apis/users";

export const usersQueryKeys = {
  list: (page: number) => ["users", "list", page] as const,
  search: (term: string) => ["users", "search", term] as const,
  detail: (userId: string) => ["users", "detail", userId] as const,
};

export function useUsersPage(
  page: number,
  options?: { enabled?: boolean },
) {
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: usersQueryKeys.list(page),
    queryFn: () => UserApi.getUsersPage(page),
    enabled: options?.enabled ?? true,
  });

  const hasNextPage = useMemo(
    () => (data?.length ?? 0) >= UserApi.PAGE_SIZE,
    [data?.length],
  );

  return {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
    hasNextPage,
  };
}

export function useUserSearch(search: string) {
  const trimmed = search.trim();
  const enabled = trimmed.length > 0;

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: usersQueryKeys.search(trimmed),
    queryFn: () => UserApi.searchUsers(trimmed),
    enabled,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
    isSearchMode: enabled,
  };
}

export function useUserById(userId: string | undefined) {
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: usersQueryKeys.detail(userId ?? ""),
    queryFn: () => UserApi.getUserById(userId!),
    enabled: Boolean(userId),
  });

  const refetchUser = useCallback(() => {
    if (userId) refetch();
  }, [refetch, userId]);

  return {
    data,
    isLoading,
    isError,
    refetch: refetchUser,
    isFetching,
  };
}
