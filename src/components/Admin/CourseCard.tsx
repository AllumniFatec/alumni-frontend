"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type CourseCardProps = {
  title: string;
  abbreviation: string;
  icon: LucideIcon;
  onClick?: () => void;
};

export function CourseCard({
  title,
  abbreviation,
  icon: Icon,
  onClick,
}: CourseCardProps) {
  const interactive = typeof onClick === "function";

  return (
    <div
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      className={cn(
        "group rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow",
        "hover:shadow-md",
        interactive &&
          "cursor-pointer outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-lg",
            "bg-primary/10 text-primary",
          )}
        >
          <Icon className="size-5" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-[family-name:var(--font-roboto-slab)] text-base font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
            {title}
          </p>
          <p className="mt-1 text-[0.6875rem] font-bold uppercase tracking-widest text-muted-foreground">
            {abbreviation}
          </p>
        </div>
      </div>
    </div>
  );
}
