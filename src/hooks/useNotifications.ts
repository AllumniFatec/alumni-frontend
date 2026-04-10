import {
  type InfiniteData,
  type QueryClient,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { NotificationApi } from "@/apis/notifications";
import type { NotificationsListResponse } from "@/models/notification";

export const NOTIFICATIONS_QUERY_KEY = ["notifications", "list"] as const;

const PAGE_SIZE = 10;

function markReadInCache(qc: QueryClient, id: string) {
  qc.setQueryData<InfiniteData<NotificationsListResponse>>(
    NOTIFICATIONS_QUERY_KEY,
    (old) => {
      if (!old) return old;
      return {
        ...old,
        pages: old.pages.map((page) => ({
          ...page,
          notifications: page.notifications.map((n) =>
            n.notification_id === id ? { ...n, is_read: true } : n,
          ),
        })),
      };
    },
  );
}

export function useNotifications(enabled: boolean) {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: NOTIFICATIONS_QUERY_KEY,
    queryFn: ({ pageParam = 1 }) =>
      NotificationApi.getNotifications(pageParam as number, PAGE_SIZE),
    initialPageParam: 1,
    enabled,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.page + 1
        : undefined,
  });

  const notifications =
    data?.pages.flatMap((p) => p.notifications) ?? [];

  const hasUnread = notifications.some((n) => !n.is_read);

  return {
    notifications,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    hasUnread,
  };
}

export function useMarkNotificationRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => NotificationApi.markAsRead(id),
    onMutate: (id) => {
      markReadInCache(qc, id);
    },
    onError: () => {
      qc.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
    },
  });
}
