"use client";

import { Mail, User, Bell } from "lucide-react";
import type { MyProfile } from "@/models/profile";

import { UserGender } from "@/models/users";

const genderLabel: Record<string, string> = {
  [UserGender.MALE]: "Masculino",
  [UserGender.FEMALE]: "Feminino",
  [UserGender.OTHERS]: "Outro",
};

export function ProfileInformationSection({ profile }: { profile: MyProfile }) {
  return (
    <section className="mt-6">
      <h3 className="mb-3 text-sm font-semibold text-foreground">
        Informações
      </h3>
      <div className="space-y-2 rounded-xl border border-border/60 bg-card/50 p-4">
        <div className="flex items-center gap-3 text-sm">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Email:</span>
          <span className="font-medium text-foreground">{profile.email}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Gênero:</span>
          <span className="font-medium text-foreground">
            {genderLabel[profile.gender] ?? profile.gender}
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Notificações:</span>
          <span className="font-medium text-foreground">
            {profile.receive_notifications ? "Ativadas" : "Desativadas"}
          </span>
        </div>
      </div>
    </section>
  );
}
