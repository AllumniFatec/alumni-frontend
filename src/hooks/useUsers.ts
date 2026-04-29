"use client";

import { useCallback, useEffect, useRef } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UserApi } from "@/apis/users";

export const usersQueryKeys = {
  list: ["users", "list"] as const,
  search: (term: string) => ["users", "search", term] as const,
  detail: (userId: string) => ["users", "detail", userId] as const,
};

export function useUsersList(options?: { enabled?: boolean }) {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: usersQueryKeys.list,
    queryFn: ({ pageParam = 1 }) => UserApi.getUsersPage(pageParam as number),
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
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  };
}

export function useUserSearch(search: string) {
  const trimmed = search.trim();
  const enabled = trimmed.length > 0;

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: usersQueryKeys.search(trimmed),
    queryFn: ({ pageParam = 1 }) =>
      UserApi.searchUsers(trimmed, pageParam as number),
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
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isSearchMode: enabled,
  };
}

export function useUserById(userId: string | undefined) {
  const router = useRouter();
  const hasHandledErrorRef = useRef(false);
  const { data, isLoading, isError, refetch, isFetching, error } = useQuery({
    queryKey: usersQueryKeys.detail(userId ?? ""),
    queryFn: () => UserApi.getUserById(userId!),
    enabled: Boolean(userId),
    retry: false,
  });

  useEffect(() => {
    if (!isError || hasHandledErrorRef.current) return;

    hasHandledErrorRef.current = true;

    const isAxiosRequestError = axios.isAxiosError(error);
    const isNotFound = isAxiosRequestError && error.response?.status === 404;
    const hasAnyRequestError = isAxiosRequestError || error instanceof Error;

    if (isNotFound || hasAnyRequestError) {
      toast.error("Usuário não encontrado", {
        duration: 5000,
        position: "top-right",
        className:
          "!bg-red-500 !text-white !border-red-600 [&_[data-description]]:!text-white",
      });
      router.back();
    }
  }, [error, isError, router]);

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
