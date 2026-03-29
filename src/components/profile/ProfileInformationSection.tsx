"use client";

import { useState } from "react";
import { Bell, FileText, Mail, User } from "lucide-react";
import type { MyProfile } from "@/models/profile";

import { UserGender } from "@/models/users";
import { useCanManageProfile } from "@/hooks/useCanManageProfile";
import { Button } from "@/components/ui/button";
import { ProfileInformationEditDialog } from "@/components/profile/ProfileInformationEditDialog";

const genderLabel: Record<string, string> = {
  [UserGender.MALE]: "Masculino",
  [UserGender.FEMALE]: "Feminino",
  [UserGender.OTHERS]: "Outro",
};

export function ProfileInformationSection({ profile }: { profile: MyProfile }) {
  const [editOpen, setEditOpen] = useState(false);
  const canManage = useCanManageProfile(profile.user_id);

  return (
    <section className="mt-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-foreground">Informações</h3>
        {canManage && (
          <Button
            type="button"
            size="sm"
            className="shrink-0"
            onClick={() => setEditOpen(true)}
          >
            Editar dados
          </Button>
        )}
      </div>

      <div className="space-y-2 rounded-xl border border-border/60 bg-card/50 p-4">
        <div className="flex items-center gap-3 text-sm">
          <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="text-muted-foreground">Email:</span>
          <span className="font-medium text-foreground">{profile.email}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <User className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="text-muted-foreground">Gênero:</span>
          <span className="font-medium text-foreground">
            {genderLabel[profile.gender] ?? profile.gender}
          </span>
        </div>
        {!profile.biography?.trim() && (
          <div className="flex items-center gap-3 text-sm">
            <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="text-muted-foreground">Bio:</span>
            <span className="text-muted-foreground italic">
              Não informada
            </span>
          </div>
        )}
        <div className="flex items-center gap-3 text-sm">
          <Bell className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="text-muted-foreground">Notificações:</span>
          <span className="font-medium text-foreground">
            {profile.receive_notifications ? "Ativadas" : "Desativadas"}
          </span>
        </div>
      </div>

      {canManage && (
        <ProfileInformationEditDialog
          profile={profile}
          open={editOpen}
          onOpenChange={setEditOpen}
        />
      )}
    </section>
  );
}
