"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { getUserInitials } from "@/lib/utils";
import type { ChatParticipantUser } from "@/models/chat";

interface ChatPanelHeaderProps {
  otherUser: ChatParticipantUser | null;
}

export function ChatPanelHeader({ otherUser }: ChatPanelHeaderProps) {
  const isMobile = useIsMobile();

  return (
    <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3">
      {isMobile && (
        <Link
          href="/messages"
          className="mr-1 flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Voltar para conversas"
        >
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </Link>
      )}

      {otherUser ? (
        <>
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
            {otherUser.perfil_photo?.url ? (
              <Image
                src={otherUser.perfil_photo.url}
                alt={otherUser.name}
                width={40}
                height={40}
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
            <p className="truncate text-sm font-semibold text-slate-800">
              {otherUser.name}
            </p>
          </div>
        </>
      ) : (
        <div className="h-10" />
      )}
    </div>
  );
}
