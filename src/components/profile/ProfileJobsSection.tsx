"use client";

import { Briefcase } from "lucide-react";
import { JobCard } from "@/components/Jobs/JobCard";
import type { JobListItem } from "@/models/job";

/** Oportunidades de emprego publicadas na plataforma por este utilizador (campo `jobs` no GET /myProfile). */
export function ProfileJobsSection({
  jobs,
}: {
  jobs: JobListItem[];
}) {
  if (jobs.length === 0) return null;

  return (
    <section className="mt-6">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <Briefcase className="h-4 w-4" />
        Vagas
      </h3>
      <div className="space-y-2">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}
