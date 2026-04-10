"use client";

import { useRouter } from "next/navigation";
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

function navigateFromLink(
  link: string | null | undefined,
  router: ReturnType<typeof useRouter>,
) {
  if (link == null || link === "") {
    return;
  }
  try {
    const url = link.startsWith("http")
      ? new URL(link)
      : new URL(link, window.location.origin);
    if (url.origin === window.location.origin) {
      router.push(`${url.pathname}${url.search}${url.hash}`);
    } else {
      window.location.href = url.href;
    }
  } catch {
    const path = link.startsWith("/") ? link : `/${link}`;
    router.push(path);
  }
}

export function NotificationBell() {
  const router = useRouter();
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

  const { mutateAsync: markAsRead } = useMarkNotificationRead();

  useNotificationSocket(enabled);

  async function handleNotificationClick(notification: NotificationItem) {
    try {
      if (!notification.is_read) {
        await markAsRead(notification.notification_id);
      }
    } catch {
      // Lista será reconciliada pelo onError da mutation se necessário
    }
    navigateFromLink(notification.link, router);
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
                className={cn(
                  "flex cursor-pointer flex-col items-stretch gap-1 rounded-none px-3 py-2.5 whitespace-normal border-b border-slate-100 dark:border-slate-800 last:border-b-0",
                  notification.is_read
                    ? "bg-white dark:bg-slate-900 focus:bg-slate-50 dark:focus:bg-slate-800"
                    : "bg-red-50 dark:bg-red-950/30 focus:bg-red-100 dark:focus:bg-red-950/40",
                )}
                onSelect={() => {
                  void handleNotificationClick(notification);
                }}
              >
                <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                  {notification.title}
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                  {notification.message}
                </span>
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
