import { Section } from "@/components/Section";
import { JobCard } from "@/components/JobCard";
import { mockJobs } from "@/mocks";

export default function JobsPage() {
  return (
    <div>
      <Section title="Vagas">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockJobs.map((job) => (
            <JobCard key={job.job_id} job={job} />
          ))}
        </div>
      </Section>
    </div>
  );
}
