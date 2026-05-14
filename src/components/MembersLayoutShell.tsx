"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";

export function MembersLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isMessages = pathname.startsWith("/messages");
  const isFullWidth = isAdmin || isMessages;

  return (
    <div className={isFullWidth ? "flex h-dvh flex-col overflow-hidden" : "flex min-h-screen flex-col"}>
      <Header />
      {isFullWidth ? (
        <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden">{children}</div>
      ) : (
        <div className="flex min-h-0 w-full flex-1 justify-center">
          <div className="w-full max-w-5xl px-4 py-6">{children}</div>
        </div>
      )}
    </div>
  );
}
