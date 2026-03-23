"use client";

import Link from "next/link";
import { Briefcase } from "lucide-react";
import type { ProfileJobSummary } from "@/models/profile";

export function ProfileJobsSection({ jobs }: { jobs: ProfileJobSummary[] }) {
  if (jobs.length === 0) return null;

  return (
    <section className="mt-6">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <Briefcase className="h-4 w-4" />
        Vagas
      </h3>
      <div className="space-y-2">
        {jobs.map((j) => (
          <Link
            key={j.job_id}
            href={`/jobs/${j.job_id}`}
            className="block rounded-xl border border-border/60 bg-card/50 p-4 transition-colors hover:border-primary/30 hover:bg-muted/30"
          >
            <p className="font-medium text-foreground">{j.title}</p>
            <p className="text-sm text-muted-foreground">{j.status}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
