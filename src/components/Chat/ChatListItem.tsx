"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { format, isToday, isYesterday } from "date-fns";
import { cn, getUserInitials } from "@/lib/utils";
import type { ChatListItem as ChatListItemModel } from "@/models/chat";

interface ChatListItemProps {
  chat: ChatListItemModel;
  currentUserId: string;
  isActive: boolean;
  unreadCount?: number;
}

function formatLastMessageTime(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isToday(d)) return format(d, "HH:mm");
  if (isYesterday(d)) return "Ontem";
  return format(d, "dd/MM");
}

function ChatListItemComponent({
  chat,
  currentUserId,
  isActive,
  unreadCount = 0,
}: ChatListItemProps) {
  const otherUser = useMemo(() => {
    const other = chat.participants.find(
      (p) => p.user.user_id !== currentUserId,
    );
    return other?.user ?? chat.participants[0]?.user ?? null;
  }, [chat.participants, currentUserId]);

  if (!otherUser) return null;

  const hasUnread = unreadCount > 0;
  const photoUrl = otherUser.perfil_photo?.url ?? null;
  const time = formatLastMessageTime(chat.last_message_at);

  return (
    <Link
      href={`/messages/${chat.chat_id}`}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-slate-50",
        isActive && "bg-slate-100 hover:bg-slate-100",
        hasUnread && !isActive && "bg-red-50 dark:bg-red-950/30",
      )}
    >
      <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={otherUser.name}
            width={44}
            height={44}
            className="h-full w-full object-cover"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary/10 text-sm font-bold text-primary">
            {getUserInitials(otherUser.name)}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className={cn(
            "truncate text-sm text-slate-800",
            hasUnread ? "font-bold" : "font-semibold",
          )}>
            {otherUser.name}
          </p>
          {time && (
            <span className={cn(
              "shrink-0 text-[11px]",
              hasUnread ? "text-red-500 font-semibold" : "text-slate-400",
            )}>{time}</span>
          )}
        </div>
        {chat.last_message && (
          <p className={cn(
            "mt-0.5 truncate text-xs",
            hasUnread ? "text-slate-700 font-medium" : "text-slate-500",
          )}>
            {chat.last_message}
          </p>
        )}
      </div>

      {hasUnread && (
        <div className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
          {unreadCount > 99 ? "99+" : unreadCount}
        </div>
      )}
    </Link>
  );
}

export const ChatListItemCard = memo(ChatListItemComponent);
