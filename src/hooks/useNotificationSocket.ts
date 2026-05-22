"use client";

import { useEffect } from "react";
import { useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { io } from "socket.io-client";
import { getSocketOrigin } from "@/lib/socketOrigin";
import { NOTIFICATIONS_QUERY_KEY } from "@/hooks/useNotifications";
import { chatQueryKeys } from "@/hooks/useChat";
import type { ChatsListResponse } from "@/models/chat";
import { toast } from "sonner";

interface UnreadCountUpdatePayload {
  total: number;
  chatId: string;
  chatUnread: number;
}

export function useNotificationSocket(enabled: boolean) {
  const queryClient = useQueryClient();

  function toastNotification(notification: any) {
    toast.success(notification.title, {
      duration: 5000,
      position: "top-right",
      className:
        "!bg-blue-500 !text-white !border-blue-600 [&_[data-description]]:!text-white",
    });
  }

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const socket = io(getSocketOrigin(), {
      withCredentials: true,
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      socket.emit("register-user");
    });

    socket.on("new_notification", (notification) => {
      toastNotification(notification);
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
