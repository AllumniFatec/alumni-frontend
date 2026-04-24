"use client";

import { useMemo } from "react";
import { Briefcase } from "lucide-react";
import { JobCard } from "@/components/Jobs/JobCard";
import { Button } from "@/components/ui/button";
import { useProfileJobsByUser } from "@/hooks/useProfile";
import type { ProfileJobsListResponse } from "@/models/profile";

/** Oportunidades de emprego publicadas na plataforma por este utilizador (campo `jobs` no GET /my-profile). */
export function ProfileJobsSection({
  profileUserId,
  initialJobs,
}: {
  profileUserId: string;
  initialJobs: ProfileJobsListResponse;
}) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProfileJobsByUser(profileUserId, initialJobs);

  const jobs = useMemo(
    () => data?.pages.flatMap((page) => page.jobs) ?? initialJobs.jobs,
    [data, initialJobs.jobs],
  );

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
      {hasNextPage && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Carregando..." : "Carregar mais"}
          </Button>
        </div>
      )}
    </section>
  );
}
