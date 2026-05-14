"use client";

import { useParams } from "next/navigation";
import { ChatPanel } from "@/components/Chat/ChatPanel";

export default function ChatPage() {
  const params = useParams();
  const chatId = typeof params?.chatId === "string" ? params.chatId : null;

  if (!chatId) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-slate-500">Chat inválido.</p>
      </div>
    );
  }

  return <ChatPanel chatId={chatId} />;
}
