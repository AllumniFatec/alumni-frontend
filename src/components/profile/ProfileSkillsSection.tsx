"use client";

import { useRef, useState } from "react";
import { Award } from "lucide-react";
import type { ProfileSkillEntry } from "@/models/profile";
import { useCanManageProfile } from "@/hooks/useCanManageProfile";
import { useDeleteProfileSkill } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { ProfileSkillBadge } from "@/components/profile/skills/ProfileSkillBadge";
import {
  ProfileSkillsManageDialog,
  type ProfileSkillsManageDialogHandle,
} from "@/components/profile/skills/ProfileSkillsManageDialog";

export function ProfileSkillsSection({
  profileUserId,
  skills,
}: {
  profileUserId: string;
  skills: ProfileSkillEntry[];
}) {
  const canManage = useCanManageProfile(profileUserId);
  const dialogRef = useRef<ProfileSkillsManageDialogHandle>(null);
  const { mutateAsync: deleteSkill } = useDeleteProfileSkill(); 
  console.log("minhas skills na secao é", skills);

  if (skills.length === 0 && !canManage) return null;

  async function handleRemove(userSkillId: string) { 
    console.log("userSkillId", userSkillId);
    if (!canManage) return;
      await deleteSkill({ user_skill_id: userSkillId });
  }

  return (
    <section className="mt-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Award className="h-4 w-4 shrink-0" />
          Skills
        </h3>
        {canManage && (
          <Button
            type="button"
            size="sm"
            className="shrink-0"
            onClick={() => dialogRef.current?.open()}
          >
            Adicionar skills
          </Button>
        )}
      </div>

      {skills.length === 0 && canManage ? (
        <p className="text-sm text-muted-foreground">
          Nenhuma skill cadastrada. Use &quot;adicionar skills&quot; para
          adicionar uma nova skill.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((userSkill) => {
            console.log("userSkill", userSkill);
            return (
              <ProfileSkillBadge
                key={userSkill.user_skill_id}
                onRemove={() => handleRemove(userSkill.user_skill_id)}
                label={userSkill.skill.name}
                isOwner={canManage}
              />
            );
          })}
        </div>
      )}

      {canManage && <ProfileSkillsManageDialog ref={dialogRef} />}
    </section>
  );
}
