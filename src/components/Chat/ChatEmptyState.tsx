"use client";

import { MessageCircle } from "lucide-react";

export function ChatEmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center p-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <MessageCircle className="h-8 w-8 text-primary" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-slate-800">
          Suas mensagens
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Selecione uma conversa para começar
        </p>
      </div>
    </div>
  );
}
