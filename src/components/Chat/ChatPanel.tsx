"use client";

import { useRef, useCallback, useEffect, useMemo, ComponentRef } from "react";
import { format, isToday, isYesterday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAuth } from "@/context/AuthContext";
import { useChatMessages, useChats } from "@/hooks/useChat";
import { useChatSocket } from "@/hooks/useChatSocket";
import { Spinner } from "@/components/ui/spinner";
import { ErrorState } from "@/components/ErrorState";
import { ChatPanelHeader } from "./ChatPanelHeader";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import type { ChatParticipantUser, ChatMessage } from "@/models/chat";

interface ChatPanelProps {
  chatId: string;
}

function formatDateSeparator(dateStr: string): string {
  const d = new Date(dateStr);
  if (isToday(d)) return "Hoje";
  if (isYesterday(d)) return "Ontem";
  return format(d, "dd/MM/yyyy", { locale: ptBR });
}

function groupMessagesByDate(
  messages: ChatMessage[],
): { date: string; label: string; messages: ChatMessage[] }[] {
  const groups: { date: string; label: string; messages: ChatMessage[] }[] = [];
  let currentDate = "";

  for (const msg of messages) {
    const d = format(new Date(msg.created_at), "yyyy-MM-dd");
    if (d !== currentDate) {
      currentDate = d;
      groups.push({
        date: d,
        label: formatDateSeparator(msg.created_at),
        messages: [msg],
      });
    } else {
      groups[groups.length - 1].messages.push(msg);
    }
  }

  return groups;
}

export function ChatPanel({ chatId }: ChatPanelProps) {
  const { user } = useAuth();
  const {
    messages,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useChatMessages(chatId);
  const { sendMessage, emitTyping, typingUsers } = useChatSocket({
    chatId,
    enabled: true,
  });
  const { chats } = useChats();

  // Refs do DOM para controle direto do scroll
  const scrollContainerRef = useRef<ComponentRef<"div">>(null);
  // Elemento invisível fixado no topo da lista — detectado pelo observer para paginar mensagens antigas
  const topAnchorRef = useRef<ComponentRef<"div">>(null);
  // Flag para diferenciar a primeira carga (rola ao fundo) das atualizações subsequentes
  const isFirstLoad = useRef(true);

  // Reseta a flag de primeira carga quando o chat muda, antes de qualquer efeito rodar
  const prevChatIdRef = useRef(chatId);
  if (prevChatIdRef.current !== chatId) {
    prevChatIdRef.current = chatId;
    isFirstLoad.current = true;
  }

  const otherUser: ChatParticipantUser | null = useMemo(() => {
    const chat = chats.find((c) => c.chat_id === chatId);
    if (!chat || !user) return null;
    const other = chat.participants.find((p) => p.user.user_id !== user.id);
    return other?.user ?? null;
  }, [chats, chatId, user]);

  const otherUserId = otherUser?.user_id ?? "";
  const groups = useMemo(() => groupMessagesByDate(messages), [messages]);

  const isOtherTyping = otherUserId ? typingUsers[otherUserId] : false;

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || messages.length === 0) return;

    // Na primeira carga do chat, rola direto ao fundo para exibir as mensagens mais recentes
    if (isFirstLoad.current) {
      container.scrollTop = container.scrollHeight;
      isFirstLoad.current = false;
      return;
    }

    // Nas atualizações em tempo real, só rola ao fundo se o usuário já estava próximo
    // (evita interromper quem está lendo mensagens antigas)
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      120;
    if (isNearBottom) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const anchor = topAnchorRef.current;
    const container = scrollContainerRef.current;
    if (!anchor || !container) return;

    // Observa o elemento âncora fixado no topo da lista.
    // Quando ele entra na viewport (usuário subiu até o topo), carrega a página anterior de mensagens.
    // Após carregar, ajusta o scrollTop para preservar a posição visual do usuário.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          const prevHeight = container.scrollHeight;
          fetchNextPage().then(() => {
            requestAnimationFrame(() => {
              container.scrollTop += container.scrollHeight - prevHeight;
            });
          });
        }
      },
      { root: container, rootMargin: "200px 0px 0px 0px", threshold: 0 },
    );

    observer.observe(anchor);
    return () => observer.disconnect();
    // isFetchingNextPage é lido dentro do callback no momento certo — não precisa recriar o observer
  }, [hasNextPage, fetchNextPage]);

  const handleSend = useCallback(
    (content: string) => {
      sendMessage(content);
    },
    [sendMessage],
  );

  const handleTyping = useCallback(
    (isTyping: boolean) => {
      emitTyping(isTyping);
    },
    [emitTyping],
  );

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col">
        <ChatPanelHeader otherUser={otherUser} />
        <div className="flex flex-1 items-center justify-center">
          <Spinner className="size-8 text-primary" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-1 flex-col">
        <ChatPanelHeader otherUser={otherUser} />
        <div className="flex flex-1 items-center justify-center p-4">
          <ErrorState
            title="Não foi possível carregar as mensagens"
            description="Verifique sua conexão ou tente novamente."
            onRetry={() => refetch()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col min-h-0">
      <ChatPanelHeader otherUser={otherUser} />

      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-1 scrollbar-none"
      >
        <div ref={topAnchorRef} className="h-1" />

        {isFetchingNextPage && (
          <div className="flex justify-center py-2">
            <Spinner className="size-5 text-primary" />
          </div>
        )}

        {groups.map((group) => (
          <div key={group.date}>
            <div className="flex items-center justify-center py-3">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                {group.label}
              </span>
            </div>
            <div className="space-y-1.5">
              {group.messages.map((msg) => (
                <MessageBubble
                  key={msg.message_id}
                  message={msg}
                  isMe={msg.sender_id === user?.id}
                  otherUserId={otherUserId}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {isOtherTyping && (
        <div className="border-t border-slate-100 px-4 py-1.5 text-xs text-primary animate-pulse">
          digitando...
        </div>
      )}
      <MessageInput onSend={handleSend} onTyping={handleTyping} />
    </div>
  );
}
