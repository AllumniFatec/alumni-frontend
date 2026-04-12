"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import type { AuthUser } from "@/context/AuthContext";
import { NotificationBell } from "./NotificationBell";

interface NavItem {
  label: string;
  href: string;
  /** Se definido, o link só aparece quando retornar true */
  condition?: (user: AuthUser | null) => boolean;
}

const navItems: NavItem[] = [
  { label: "Início", href: "/members" },
  { label: "Vagas", href: "/jobs" },
  { label: "Eventos", href: "/events" },
  { label: "Rede", href: "/network" },
  {
    label: "Administração",
    href: "/admin",
    condition: (user) => Boolean(user?.admin),
  },
];

export function Header() {
  const pathname = usePathname();

  const { user } = useAuth();

  const navLinks = (
    <>
      {navItems.map((item) => {
        if (item.condition && !item.condition(user)) return null;

        const isActive =
          pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "shrink-0 text-sm font-medium pb-1 transition-colors",
              isActive
                ? "text-primary font-bold border-b-2 border-primary"
                : "text-slate-500 hover:text-primary",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main row */}
        <div className="flex items-center justify-between h-16">
          {/* Logo + nav inline on desktop */}
          <div className="flex items-center gap-8">
            <Link href="/members" className="flex items-center gap-2">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary">
                <GraduationCap className="size-5 text-white" />
              </div>
              <h1 className="text-slate-900 dark:text-slate-100 text-lg font-black leading-tight tracking-tight">
                FATEC <span className="text-primary">Alumni</span>
              </h1>
            </Link>

            {/* Nav inline — desktop only */}
            <nav className="hidden sm:flex items-center gap-6">{navLinks}</nav>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <NotificationBell />

            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <MessageCircle className="size-5" />
            </button>

            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1" />

            <Link href="/profile" className="flex items-center gap-2">
              <div className="size-11 rounded-full border-2 border-primary/20 bg-primary/10 flex justify-center items-center text-primary font-bold text-sm">
                <img
                  src={user?.perfil_photo?.url}
                  alt="Perfil"
                  className="size-full rounded-full object-cover shadow-sm"
                />
              </div>
            </Link>
          </div>
        </div>

        {/* Nav below — mobile only, horizontal scroll */}
        <nav className="flex sm:hidden gap-6 overflow-x-auto py-2 -mx-1 px-1">
          {navLinks}
        </nav>
      </div>
    </header>
  );
}
