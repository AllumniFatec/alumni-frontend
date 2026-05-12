"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useChats } from "@/hooks/useChat";
import { Spinner } from "@/components/ui/spinner";
import { ErrorState } from "@/components/ErrorState";
import { ChatListItemCard } from "./ChatListItem";
import { cn } from "@/lib/utils";

export function ChatList() {
  const pathname = usePathname();
  const { user } = useAuth();
  const {
    chats,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useChats();
  const [search, setSearch] = useState("");
  const sentinelRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeChatId = useMemo(() => {
    const match = pathname.match(/^\/messages\/(.+)$/);
    return match?.[1] ?? null;
  }, [pathname]);

  const filteredChats = useMemo(() => {
    if (!search.trim()) return chats;
    const term = search.trim().toLowerCase();
    return chats.filter((chat) =>
      chat.participants.some(
        (p) =>
          p.user.user_id !== user?.id &&
          p.user.name.toLowerCase().includes(term),
      ),
    );
  }, [chats, search, user?.id]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    const container = scrollContainerRef.current;
    if (!sentinel || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: container, rootMargin: "200px", threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex h-full flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-4">
        <h2 className="text-lg font-bold text-slate-800">Mensagens</h2>
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar conversas..."
            className={cn(
              "w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm",
              "placeholder:text-slate-400 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20",
            )}
          />
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-2 py-1 scrollbar-none"
      >
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner className="size-6 text-primary" />
          </div>
        ) : isError ? (
          <div className="p-4">
            <ErrorState
              title="Erro ao carregar conversas"
              description="Tente novamente."
              onRetry={() => refetch()}
            />
          </div>
        ) : filteredChats.length === 0 ? (
          <p className="py-12 text-center text-sm text-slate-400">
            {search.trim()
              ? "Nenhuma conversa encontrada."
              : "Você ainda não tem conversas."}
          </p>
        ) : (
          <>
            {filteredChats.map((chat) => (
              <ChatListItemCard
                key={chat.chat_id}
                chat={chat}
                currentUserId={user?.id ?? ""}
                isActive={activeChatId === chat.chat_id}
                unreadCount={chat.unreadCount ?? 0}
              />
            ))}
            {isFetchingNextPage && (
              <div className="flex justify-center py-3">
                <Spinner className="size-5 text-primary" />
              </div>
            )}
            <div ref={sentinelRef} className="h-1" />
          </>
        )}
      </div>
    </div>
  );
}
