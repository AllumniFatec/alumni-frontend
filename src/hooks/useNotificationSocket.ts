"use client";

import { useEffect } from "react";
import { useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { io } from "socket.io-client";
import { getSocketOrigin } from "@/lib/socketOrigin";
import { NOTIFICATIONS_QUERY_KEY } from "@/hooks/useNotifications";
import { chatQueryKeys } from "@/hooks/useChat";
import type { ChatsListResponse } from "@/models/chat";

interface UnreadCountUpdatePayload {
  total: number;
  chatId: string;
  chatUnread: number;
}

export function useNotificationSocket(enabled: boolean) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const socket = io(getSocketOrigin(), {
      withCredentials: true,
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      socket.emit("register-user");
    });

    socket.on("new_notification", () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
    });

    socket.on("unread-count-update", (payload: UnreadCountUpdatePayload) => {
      queryClient.setQueryData<number>(chatQueryKeys.unread, payload.total);

      queryClient.setQueryData<InfiniteData<ChatsListResponse>>(
        chatQueryKeys.list,
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              chats: page.chats.map((chat) =>
                chat.chat_id === payload.chatId
                  ? { ...chat, unreadCount: payload.chatUnread }
                  : chat,
              ),
            })),
          };
        },
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [enabled, queryClient]);
}
