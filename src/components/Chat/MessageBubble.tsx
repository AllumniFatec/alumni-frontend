"use client";

import { format } from "date-fns";
import { CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/models/chat";

interface MessageBubbleProps {
  message: ChatMessage;
  isMe: boolean;
  /** ID do outro participante — usado para checar read status */
  otherUserId: string;
}

export function MessageBubble({
  message,
  isMe,
  otherUserId,
}: MessageBubbleProps) {
  const time = format(new Date(message.created_at), "HH:mm");
  const isRead = message.read_by.includes(otherUserId);

  return (
    <div
      className={cn("flex w-full", isMe ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[75%] rounded-xl px-4 py-2.5 shadow-sm",
          isMe
            ? "bg-slate-100 text-foreground rounded-br-sm"
            : "bg-primary text-primary-foreground rounded-bl-sm",
        )}
      >
        <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
          {message.content}
        </p>
        <div
          className={cn(
            "mt-1 flex items-center justify-end gap-1",
            isMe ? "text-slate-400" : "text-primary-foreground/70",
          )}
        >
          <span className="text-[10px]">{time}</span>
          {isMe && (
            <CheckCheck
              className={cn(
                "h-3.5 w-3.5",
                isRead ? "text-blue-500" : "text-slate-400",
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}
