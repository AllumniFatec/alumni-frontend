"use client";

import { Bell, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
  useMarkNotificationRead,
  useNotifications,
} from "@/hooks/useNotifications";
import { useNotificationSocket } from "@/hooks/useNotificationSocket";
import type { NotificationItem } from "@/models/notification";
import Link from "next/link";

export function NotificationBell() {
  const { user } = useAuth();
  const enabled = !!user;

  const {
    notifications,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    hasUnread,
  } = useNotifications(enabled);

  const { mutate: markNotificationRead } = useMarkNotificationRead();

  useNotificationSocket(enabled);

  function handleNotificationClick(notification: NotificationItem) {
    if (notification.is_read) return;
    markNotificationRead(notification.notification_id);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          aria-label="Notificações"
        >
          <Bell className="size-5" />
          {hasUnread ? (
            <span
              className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500 border-2 border-white dark:border-slate-900"
              aria-hidden
            />
          ) : null}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[min(100vw-2rem,22rem)] p-0"
      >
        <DropdownMenuLabel className="px-3 py-2 font-semibold border-b border-slate-200 dark:border-slate-800">
          Notificações
        </DropdownMenuLabel>
        <div className="max-h-80 overflow-y-auto py-1">
          {isLoading ? (
            <div className="flex justify-center py-8 text-slate-500">
              <Loader2
                className="size-6 animate-spin"
                aria-label="Carregando"
              />
            </div>
          ) : isError ? (
            <p className="px-3 py-6 text-center text-sm text-slate-500">
              Não foi possível carregar as notificações.
            </p>
          ) : notifications.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-slate-500">
              Nenhuma notificação.
            </p>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.notification_id}
                asChild
                className={cn(
                  "flex cursor-pointer flex-col items-stretch gap-1 rounded-none px-3 py-2.5 whitespace-normal border-b border-slate-100 dark:border-slate-800 last:border-b-0",
                  notification.is_read
                    ? "bg-white dark:bg-slate-900 focus:bg-slate-50 dark:focus:bg-slate-800"
                    : "bg-red-50 dark:bg-red-950/30 focus:bg-red-100 dark:focus:bg-red-950/40",
                )}
              >
                <Link
                  href={notification.link ? notification.link : ""}
                  className="outline-none"
                  onClick={() => handleNotificationClick(notification)}
                >
                  <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                    {notification.title}
                  </span>
                  <span className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                    {notification.message}
                  </span>
                </Link>
              </DropdownMenuItem>
            ))
          )}
        </div>
        {hasNextPage ? (
          <>
            <DropdownMenuSeparator className="my-0" />
            <div className="p-1">
              <button
                type="button"
                className="w-full rounded-sm px-2 py-2 text-sm font-medium text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
                disabled={isFetchingNextPage}
                onClick={() => fetchNextPage()}
              >
                {isFetchingNextPage ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <Loader2 className="size-4 animate-spin" />
                    Carregando…
                  </span>
                ) : (
                  "Carregar mais"
                )}
              </button>
            </div>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
