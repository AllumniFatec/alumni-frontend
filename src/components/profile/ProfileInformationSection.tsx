"use client";

import { useState } from "react";
import { BadgeInfo, Bell, FileText, Mail, User } from "lucide-react";
import { type MyProfile, toProfileInformationEditable } from "@/models/profile";

import { UserGender } from "@/models/users";
import { useCanManageProfile } from "@/hooks/useCanManageProfile";
import { Button } from "@/components/ui/button";
import { ProfileInformationEditDialog } from "@/components/profile/ProfileInformationEditDialog";

const genderLabel: Record<string, string> = {
  [UserGender.MALE]: "Masculino",
  [UserGender.FEMALE]: "Feminino",
  [UserGender.OTHERS]: "Outro",
};

type ProfileInformationModel = Pick<
  MyProfile,
  "user_id" | "name" | "gender" | "biography"
> &
  Partial<Pick<MyProfile, "email" | "receive_notifications">>;

export function ProfileInformationSection({
  profile,
  variant = "full",
}: {
  profile: ProfileInformationModel;
  /** `full`: dados da conta (email, notificações) — típico de GET /my-profile. `public`: visitante. */
  variant?: "full" | "public";
}) {
  const [editOpen, setEditOpen] = useState(false);
  const canManage = useCanManageProfile(profile.user_id);
  const isAccountView = variant === "full";

  return (
    console.log(profile),
    (
      <section className="mt-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <BadgeInfo className="h-4 w-4" />
            Informações
          </h3>
          {canManage && isAccountView && (
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
          {isAccountView && profile.email != null && (
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium text-foreground">
                {profile.email}
              </span>
            </div>
          )}
          <div className="flex items-center gap-3 text-sm">
            <User className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="text-muted-foreground">Gênero:</span>
            <span className="font-medium text-foreground">
              {genderLabel[profile.gender] ?? profile.gender}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="text-muted-foreground">Bio:</span>
            {profile.biography?.trim() ? (
              <span className="font-medium text-foreground">
                {profile.biography}
              </span>
            ) : (
              <span className="text-muted-foreground italic">
                Não informada
              </span>
            )}
          </div>
          {isAccountView && profile.receive_notifications !== undefined && (
            <div className="flex items-center gap-3 text-sm">
              <Bell className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="text-muted-foreground">Notificações:</span>
              <span className="font-medium text-foreground">
                {profile.receive_notifications ? "Ativadas" : "Desativadas"}
              </span>
            </div>
          )}
        </div>

        {canManage && isAccountView && (
          <ProfileInformationEditDialog
            profile={toProfileInformationEditable(profile)}
            open={editOpen}
            onOpenChange={setEditOpen}
          />
        )}
      </section>
    )
  );
}
