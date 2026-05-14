"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { io, type Socket } from "socket.io-client";
import { toast } from "sonner";
import { getSocketOrigin } from "@/lib/socketOrigin";
import { useAuth } from "@/context/AuthContext";
import { ChatApi } from "@/apis/chat";
import { chatQueryKeys } from "@/hooks/useChat";
import type {
  ChatMessage,
  ChatMessagesResponse,
  ChatsListResponse,
} from "@/models/chat";

interface UseChatSocketOptions {
  chatId: string | null;
  enabled?: boolean;
}

interface TypingState {
  userId: string;
  isTyping: boolean;
}

interface UnreadCountUpdatePayload {
  total: number;
  chatId: string;
  chatUnread: number;
}

export function useChatSocket({
  chatId,
  enabled = true,
}: UseChatSocketOptions) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const socketRef = useRef<Socket | null>(null);
  const currentChatRef = useRef<string | null>(null);
  const [typingUsers, setTypingUsers] = useState<Record<string, boolean>>({});

  currentChatRef.current = chatId;

  useEffect(() => {
    if (!enabled || typeof window === "undefined" || !user) return;

    const socket = io(getSocketOrigin(), {
      withCredentials: true,
      transports: ["websocket"],
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("register-user");
      const pendingChat = currentChatRef.current;
      if (pendingChat) {
        socket.emit("join-chat", pendingChat);
      }
    });

    socket.on(
      "receive-message",
      (payload: { message: ChatMessage; authorId: string }) => {
        const { message, authorId } = payload;
        const activeChatId = currentChatRef.current;

        if (activeChatId === message.chat_id) {
          queryClient.setQueryData<InfiniteData<ChatMessagesResponse>>(
            chatQueryKeys.messages(message.chat_id),
            (old) => {
              if (!old) return old;
              const firstPage = old.pages[0];
              if (!firstPage) return old;
              const alreadyExists = firstPage.messages.some(
                (m) => m.message_id === message.message_id,
              );
              if (alreadyExists) return old;
              return {
                ...old,
                pages: [
                  {
                    ...firstPage,
                    messages: [message, ...firstPage.messages],
                  },
                  ...old.pages.slice(1),
                ],
              };
            },
          );

          if (authorId !== user.id && !message.read_by.includes(user.id)) {
            ChatApi.markAsRead(message.chat_id).catch(() => {});
          }
        }

        queryClient.setQueryData<InfiniteData<ChatsListResponse>>(
          chatQueryKeys.list,
          (old) => {
            if (!old) return old;
            return {
              ...old,
              pages: old.pages.map((page) => ({
                ...page,
                chats: page.chats.map((chat) =>
                  chat.chat_id === message.chat_id
                    ? {
                        ...chat,
                        last_message: message.content,
                        last_message_at: message.created_at,
                      }
                    : chat,
                ),
              })),
            };
          },
        );
      },
    );

    socket.on(
      "unread-count-update",
      (payload: UnreadCountUpdatePayload) => {
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
      },
    );

    socket.on(
      "messages-read",
      (payload: { chatId: string; userId: string }) => {
        queryClient.setQueryData<InfiniteData<ChatMessagesResponse>>(
          chatQueryKeys.messages(payload.chatId),
          (old) => {
            if (!old) return old;
            return {
              ...old,
              pages: old.pages.map((page) => ({
                ...page,
                messages: page.messages.map((m) =>
                  m.read_by.includes(payload.userId)
                    ? m
                    : { ...m, read_by: [...m.read_by, payload.userId] },
                ),
              })),
            };
          },
        );
      },
    );

    socket.on("typing", (payload: TypingState) => {
      setTypingUsers((prev) => ({
        ...prev,
        [payload.userId]: payload.isTyping,
      }));
    });

    socket.on(
      "send-message-error",
      (payload: { chatId: string; error: string }) => {
        toast.error("Erro ao enviar mensagem", {
          description: payload.error,
          position: "top-right",
        });
      },
    );

    socket.on(
      "join-chat-error",
      (payload: { chatId: string; error: string }) => {
        toast.error("Erro ao entrar no chat", {
          description: payload.error,
          position: "top-right",
        });
      },
    );

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [enabled, user, queryClient]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !socket.connected) return;

    if (chatId) {
      socket.emit("join-chat", chatId);

      queryClient.setQueryData<InfiniteData<ChatsListResponse>>(
        chatQueryKeys.list,
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              chats: page.chats.map((chat) =>
                chat.chat_id === chatId ? { ...chat, unreadCount: 0 } : chat,
              ),
            })),
          };
        },
      );
    }

    return () => {
      if (chatId) {
        socket.emit("leave-chat", chatId);
      }
    };
  }, [chatId, queryClient]);

  const sendMessage = useCallback(
    (content: string) => {
      const socket = socketRef.current;
      if (!socket || !chatId) return;
      socket.emit("send-message", chatId, content);
    },
    [chatId],
  );

  const emitTyping = useCallback(
    (isTyping: boolean) => {
      const socket = socketRef.current;
      if (!socket || !chatId) return;
      socket.emit("typing", chatId, { isTyping });
    },
    [chatId],
  );

  return { sendMessage, emitTyping, typingUsers };
}
