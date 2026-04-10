"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { io } from "socket.io-client";
import { AuthStorage } from "@/store/auth";
import { getSocketOrigin } from "@/lib/socketOrigin";
import { NOTIFICATIONS_QUERY_KEY } from "@/hooks/useNotifications";

export function useNotificationSocket(enabled: boolean) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const token = AuthStorage.getToken();
    if (!token) return;

    const socket = io(getSocketOrigin(), {
      auth: { token },
      withCredentials: true,
      transports: ["websocket"],
    });

    socket.on("new_notification", () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
    });

    return () => {
      socket.disconnect();
    };
  }, [enabled, queryClient]);
}
