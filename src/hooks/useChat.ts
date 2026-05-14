"use client";

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChatApi } from "@/apis/chat";
import type { ChatsListResponse, ChatMessagesResponse } from "@/models/chat";

export const chatQueryKeys = {
  list: ["chat", "list"] as const,
  messages: (chatId: string) => ["chat", "messages", chatId] as const,
  unread: ["chat", "unread"] as const,
};

export function useChats() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ChatsListResponse>({
    queryKey: chatQueryKeys.list,
    queryFn: ({ pageParam = 1 }) => ChatApi.getChats(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.page + 1
        : undefined,
  });

  const chats = data?.pages.flatMap((p) => p.chats) ?? [];

  return {
    data,
    chats,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}

export function useChatMessages(chatId: string | null) {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ChatMessagesResponse>({
    queryKey: chatQueryKeys.messages(chatId ?? ""),
    queryFn: ({ pageParam }) =>
      ChatApi.getMessages(chatId!, (pageParam as string) || null),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasMore ? lastPage.pagination.nextCursor : undefined,
    enabled: Boolean(chatId),
  });

  const messagesDesc = data?.pages.flatMap((p) => p.messages) ?? [];
  const messages = messagesDesc.slice().reverse();

  return {
    data,
    messages,
    messagesDesc,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}

export function useStartChat() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetUserId: string) => ChatApi.startChat(targetUserId),
    onSuccess: (chat) => {
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.list });
      router.push(`/messages/${chat.chat_id}`);
    },
    onError: () => {
      toast.error("Não foi possível iniciar a conversa", {
        description: "Tente novamente mais tarde.",
        position: "top-right",
      });
    },
  });
}

export function useMarkChatRead() {
  return useMutation({
    mutationFn: (chatId: string) => ChatApi.markAsRead(chatId),
  });
}

export function useUnreadCount(enabled = true) {
  return useQuery<number>({
    queryKey: chatQueryKeys.unread,
    queryFn: () => ChatApi.getUnreadCount(),
    initialData: 0,
    enabled,
    staleTime: 30_000,
  });
}
