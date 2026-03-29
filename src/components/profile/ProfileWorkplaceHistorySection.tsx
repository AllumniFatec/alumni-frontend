"use client";

import { useRef } from "react";
import { Building2 } from "lucide-react";
import type { ProfileWorkplaceHistoryEntry } from "@/models/profile";
import { useCanManageProfile } from "@/hooks/useCanManageProfile";
import { Button } from "@/components/ui/button";
import { ProfileWorkplaceHistoryCard } from "@/components/profile/workplace-history/ProfileWorkplaceHistoryCard";
import {
  ProfessionalHistoryFormDialog,
  type ProfessionalHistoryFormDialogHandle,
} from "@/components/profile/workplace-history/ProfessionalHistoryFormDialog";

export function ProfileWorkplaceHistorySection({
  profileUserId,
  entries,
}: {
  profileUserId: string;
  entries: ProfileWorkplaceHistoryEntry[];
}) {
  const canManage = useCanManageProfile(profileUserId);
  const dialogRef = useRef<ProfessionalHistoryFormDialogHandle>(null);

  if (entries.length === 0 && !canManage) return null;

  return (
    <section className="mt-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Building2 className="h-4 w-4 shrink-0" />
          Histórico profissional
        </h3>
        {canManage && (
          <Button
            type="button"
            size="sm"
            className="shrink-0"
            onClick={() => dialogRef.current?.openAdd()}
          >
            + Experiência
          </Button>
        )}
      </div>

      {entries.length === 0 && canManage ? (
        <p className="text-sm text-muted-foreground">
          Nenhuma experiência cadastrada. Use &quot;+ Experiência&quot; para
          adicionar.
        </p>
      ) : (
        <div className="space-y-3">
          {entries.map((w) => (
            <ProfileWorkplaceHistoryCard
              key={w.workplace_user_id}
              entry={w}
              canManage={canManage}
              onEdit={(entry) => dialogRef.current?.openEdit(entry)}
            />
          ))}
        </div>
      )}

      {canManage && <ProfessionalHistoryFormDialog ref={dialogRef} />}
    </section>
  );
}
