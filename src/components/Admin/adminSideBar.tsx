"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const nav = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    match: (path: string) =>
      path === "/admin" || path === "/admin/",
  },
  {
    href: "/admin/users",
    label: "Usuários",
    icon: Users,
    match: (path: string) => path.startsWith("/admin/users"),
  },
];

export function AdminSideBar() {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="none"
      className={cn(
        "w-full shrink-0 border-b border-sidebar-border md:h-full md:w-64 md:border-r md:border-b-0",
      )}
    >
      <SidebarHeader className="gap-1 px-4 py-4">
        <p className="font-[family-name:var(--font-roboto-slab)] text-lg font-black uppercase tracking-wide text-primary">
          FATEC Sorocaba
        </p>
        <p className="text-[0.6875rem] font-medium uppercase tracking-widest text-muted-foreground">
          Administração
        </p>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarMenu>
          {nav.map((item) => {
            const Icon = item.icon;
            const active = item.match(pathname);
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  className={cn(
                    active &&
                      "bg-card font-semibold text-primary shadow-sm ring-1 ring-border",
                  )}
                >
                  <Link href={item.href} className="gap-3">
                    <Icon className="size-4 shrink-0" />
                    <span className="tracking-wide">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      
    </Sidebar>
  );
}
