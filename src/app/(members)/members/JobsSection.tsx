import Link from "next/link";
import { Section } from "@/components/Section";
import { JobSmallCard } from "@/components/JobSmallCard";
import { EmptyState } from "@/components/EmptyState";
import { FeedJob } from "@/models";

interface JobsSectionProps {
  jobs: FeedJob[];
  isLoading: boolean;
}

export function JobsSection({ jobs, isLoading }: JobsSectionProps) {
  if (!isLoading && jobs.length === 0) {
    return (
      <Section title="Últimas Vagas">
        <EmptyState
          title="Nenhuma vaga no momento"
          description="Fique de olho — novas oportunidades surgem sempre."
        />
      </Section>
    );
  }

  return (
    <Section title="Últimas Vagas">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <JobSmallCard key={i} isLoading />
          ))}

        {jobs.map((job) => (
          <JobSmallCard key={job.id} job={job} />
        ))}

        <Link
          href="/jobs"
          className="w-full py-2 block text-center text-[10px] font-bold text-slate-500 hover:text-primary uppercase tracking-wider transition-colors bg-slate-50"
        >
          Ver todas as vagas
        </Link>
      </div>
    </Section>
  );
}
