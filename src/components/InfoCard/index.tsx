import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface InfoCardProps {
  icon: ReactNode;
  label: string;
  title: string;
  subtitle?: string;
  profileLink?: string;
  titleClassName?: string;
}

export function InfoCard({
  icon,
  label,
  title,
  subtitle,
  profileLink,
  titleClassName,
}: InfoCardProps) {
  return (
    <Link
      href={profileLink ?? ""}
      className="flex items-start gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg"
    >
      <div className="p-2 bg-primary/10 rounded-lg text-primary">{icon}</div>
      <div>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">
          {label}
        </p>
        <p
          className={cn(
            "text-slate-800 dark:text-slate-200 font-medium",
            titleClassName,
          )}
        >
          {title}
        </p>
        {subtitle && (
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            {subtitle}
          </p>
        )}
      </div>
    </Link>
  );
}
