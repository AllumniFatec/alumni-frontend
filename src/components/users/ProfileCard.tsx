"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProfileSkillBadge } from "@/components/profile/skills/ProfileSkillBadge";
import type { PublicUserListItem } from "@/models/userPublic";
import type { ProfileWorkplaceHistoryEntry } from "@/models/profile";
import { cn } from "@/lib/utils";

const MAX_SKILLS = 4;

function courseBadge(courses: PublicUserListItem["courses"]): string | null {
  const c = courses[0];
  if (!c) return null;
  const abbrev =
    c.abbreviation?.trim() ||
    c.course_name
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 4)
      .toUpperCase();
  const year = String(c.enrollmentYear).slice(-2);
  return `${abbrev} '${year}`;
}

export type ProfileCardProps = {
  user: PublicUserListItem;
  /** Experiência em destaque (ex.: primeiro de `workplace_history`, já ordenado pela API). */
  headlineWorkplace: ProfileWorkplaceHistoryEntry | null;
  className?: string;
};

function ProfileCardComponent({
  user,
  headlineWorkplace,
  className,
}: ProfileCardProps) {
  const photoUrl = user.perfil_photo?.url ?? null;
  const badge = useMemo(() => courseBadge(user.courses), [user.courses]);
  const skills = user.skills ?? [];
  const visibleSkills = skills.slice(0, MAX_SKILLS);

  return (
    <article
      className={cn(
        "bg-white rounded-[10px] p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center",
        className,
      )}
    >
      <div className="relative mb-4">
        <div className="w-20 h-20 rounded-full border-2 border-primary/20 p-1 mx-auto overflow-hidden">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={user.name}
              width={72}
              height={72}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-black">
              {user.name.trim().charAt(0).toUpperCase() || "?"}
            </div>
          )}
        </div>
      </div>

      <h3 className="text-lg font-bold text-slate-900 leading-tight">{user.name}</h3>
      {badge && (
        <span className="mt-1 px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase">
          {badge}
        </span>
      )}

      <div className="mt-4 mb-4 min-h-[3rem] flex flex-col justify-center">
        {headlineWorkplace ? (
          <>
            <p className="text-sm font-medium text-slate-700">
              {headlineWorkplace.workplace.company}
            </p>
            <p className="text-xs text-slate-400">{headlineWorkplace.position}</p>
          </>
        ) : (
          <p className="text-xs text-slate-400">Experiência não informada</p>
        )}
      </div>

      {visibleSkills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 justify-center mb-4 w-full">
          {visibleSkills.map((s, index) => (
            <ProfileSkillBadge
              key={s.user_skill_id ?? `${s.skill.name}-${index}`}
              label={s.skill.name}
              isOwner={false}
              className={cn(
                "max-w-full rounded-md border-primary/15 bg-primary/5 py-0.5 pl-2 pr-3 text-[10px] font-bold uppercase text-primary",
              )}
            />
          ))}
        </div>
      )}

      <div className="w-full flex gap-2 mt-auto">
        <Button variant="default" size="sm" className="flex-1 text-xs font-bold" asChild>
          <Link href={`/profile/${user.user_id}`}>Ver perfil</Link>
        </Button>
      </div>
    </article>
  );
}

export const ProfileCard = memo(ProfileCardComponent);
