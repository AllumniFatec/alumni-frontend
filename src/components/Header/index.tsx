"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Início", href: "/members" },
  { label: "Vagas", href: "/jobs" },
  { label: "Eventos", href: "/events" },
  { label: "Rede", href: "/posts" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo + Nav */}
        <div className="flex items-center gap-8">
          <Link href="/members" className="flex items-center gap-2">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <span className="text-primary text-xl font-black">F</span>
            </div>
            <h1 className="text-slate-900 dark:text-slate-100 text-lg font-black leading-tight tracking-tight hidden md:block">
              FATEC <span className="text-primary">Alumni</span>
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium pb-1 transition-colors",
                    isActive
                      ? "text-primary font-bold border-b-2 border-primary"
                      : "text-slate-500 hover:text-primary",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <Bell className="size-5" />
            <span className="absolute top-2 right-2 size-2 bg-primary rounded-full border-2 border-white dark:border-slate-900" />
          </button>

          <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <MessageCircle className="size-5" />
          </button>

          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1" />

          <Link href="/profile" className="flex items-center gap-2 pl-2">
            <div className="size-9 rounded-full border-2 border-primary/20 bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
              U
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
