"use client";

import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChatList } from "./ChatList";

interface ChatLayoutProps {
  children: React.ReactNode;
}

export function ChatLayout({ children }: ChatLayoutProps) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const isInChat = pathname !== "/messages";

  if (isMobile) {
    return (
      <div className="flex h-full flex-col">
        {isInChat ? (
          <div className="flex h-full flex-col">{children}</div>
        ) : (
          <ChatList />
        )}
      </div>
    );
  }

  return (
    <div className="grid h-full grid-cols-[320px_1fr]">
      <ChatList />
      <div className="flex flex-col min-h-0">{children}</div>
    </div>
  );
}
