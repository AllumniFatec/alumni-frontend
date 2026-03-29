"use client";

import { FileText, Briefcase, Calendar, Award } from "lucide-react";
import type { MyProfile } from "@/models/profile";

/** Contagens exibidas no resumo do perfil (posts, skills, vagas, eventos). */
export type ProfileLite = Pick<
  MyProfile,
  "posts" | "jobs" | "events" | "skills"
>;

export function ProfileSummarySection({ profile }: { profile: ProfileLite }) {
  const items = [
    {
      label: "Posts",
      value: profile.posts.length,
      icon: FileText,
    },
    {
      label: "Skills",
      value: profile.skills.length,
      icon: Award,
    },
    {
      label: "Vagas",
      value: profile.jobs.length,
      icon: Briefcase,
    },
    {
      label: "Eventos",
      value: profile.events.length,
      icon: Calendar,
    },
  ];

  return (
    <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/50 p-4"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
