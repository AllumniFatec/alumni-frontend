"use client";

import type { ProfileWorkplaceHistoryEntry } from "@/models/profile";
import { formatDateDayMonthYear } from "@/lib/utils";
import { WorkplaceHistoryCardActionsMenu } from "@/components/profile/workplace-history/WorkplaceHistoryCardActionsMenu";

interface ProfileWorkplaceHistoryCardProps {
  entry: ProfileWorkplaceHistoryEntry;
  canManage: boolean;
  onEdit: (entry: ProfileWorkplaceHistoryEntry) => void;
}

export function ProfileWorkplaceHistoryCard({
  entry,
  canManage,
  onEdit,
}: ProfileWorkplaceHistoryCardProps) {
  return (
    <div className="relative group rounded-xl border border-border/60 bg-card/50 p-4 border-l-2 border-l-primary/30">
      <div className="pr-10">
        <p className="font-medium text-foreground">{entry.position}</p>
        <p className="text-sm text-muted-foreground">
          {entry.workplace.company}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{entry.function}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {formatDateDayMonthYear(entry.start_date)}
          {" → "}
          {entry.end_date ? formatDateDayMonthYear(entry.end_date) : "atual"}
        </p>
      </div>

      {canManage && (
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <WorkplaceHistoryCardActionsMenu
            entry={entry}
            onEdit={() => onEdit(entry)}
          />
        </div>
      )}
    </div>
  );
}
