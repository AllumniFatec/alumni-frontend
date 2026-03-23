"use client";

import { Building2 } from "lucide-react";
import type { ProfileWorkplaceHistoryEntry } from "@/models/profile";

export function ProfileWorkplaceHistorySection({
  entries,
}: {
  entries: ProfileWorkplaceHistoryEntry[];
}) {
  if (entries.length === 0) return null;

  return (
    <section className="mt-6">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <Building2 className="h-4 w-4" />
        Histórico profissional
      </h3>
      <div className="space-y-3">
        {entries.map((w) => (
          <div
            key={w.workplace_user_id}
            className="rounded-xl border border-border/60 bg-card/50 p-4 border-l-2 border-l-primary/30"
          >
            <p className="font-medium text-foreground">{w.position}</p>
            <p className="text-sm text-muted-foreground">
              {w.workplace.company}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{w.function}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {w.start_date} → {w.end_date ?? "atual"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
