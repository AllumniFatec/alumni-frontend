"use client";

import { ChatLayout } from "@/components/Chat/ChatLayout";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden min-h-0">
      <ChatLayout>{children}</ChatLayout>
    </div>
  );
}
