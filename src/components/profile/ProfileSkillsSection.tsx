"use client";

import { Award } from "lucide-react";
import type { ProfileSkillEntry } from "@/models/profile";

export function ProfileSkillsSection({ skills }: { skills: ProfileSkillEntry[] }) {
  if (skills.length === 0) return null;

  return (
    <section className="mt-6">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <Award className="h-4 w-4" />
        Skills
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((s, i) => (
          <span
            key={s.user_skill_id ?? `${s.skill.name}-${i}`}
            className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-sm text-foreground"
          >
            {s.skill.name}
          </span>
        ))}
      </div>
    </section>
  );
}
