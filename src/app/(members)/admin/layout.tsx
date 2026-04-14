"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AdminSideBar } from "@/components/Admin/adminSideBar";

export default function AdminGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="flex min-h-0 w-full flex-1 flex-col md:min-h-0 md:flex-row">
      <AdminSideBar />
      <SidebarInset className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-background">
        <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
