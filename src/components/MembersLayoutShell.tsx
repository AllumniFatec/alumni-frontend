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

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {isAdmin ? (
        <div className="flex min-h-0 w-full flex-1 flex-col">{children}</div>
      ) : (
        <div className="flex min-h-0 w-full flex-1 justify-center">
          <div className="w-full max-w-5xl px-4 py-6">{children}</div>
        </div>
      )}
    </div>
  );
}
