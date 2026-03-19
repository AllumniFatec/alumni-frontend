"use client";

import { useParams, useRouter } from "next/navigation";
import { Section } from "@/components/Section";
import { ErrorState } from "@/components/ErrorState"; // mantido para isError do query
import { JobForm, JobFormValues } from "@/components/Jobs/JobForm";
import { Skeleton } from "@/components/ui/skeleton";
import { useJobById, useUpdateJob } from "@/hooks/useJobs";
import { EmploymentType, SeniorityLevel, WorkModel } from "@/models/job";
import { toast } from "sonner";

export default function JobEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: job, isLoading, isError, refetch } = useJobById(id);
  const { mutateAsync: updateJob, isPending: isUpdatingJob } = useUpdateJob(id);

  async function handleSubmit(data: JobFormValues) {
    try {
      await updateJob(data);
      toast.success("Vaga atualizada com sucesso!");
      router.push(`/jobs/${id}`);
    } catch {
      toast.error("Erro ao salvar a vaga", {
        description: "Verifique os dados e tente novamente.",
      });
    }
  }

  const defaultValues: Partial<JobFormValues> | undefined = job
    ? {
        title: job.title,
        description: job.description,
        workplace_name: job.workplace,
        city: job.city,
        state: job.state,
        country: job.country,
        employment_type: job.employment_type as EmploymentType,
        seniority_level: (job.seniority_level ??
          SeniorityLevel.Junior) as SeniorityLevel,
        work_model: job.work_model as WorkModel,
      }
    : undefined;

  return (
    <div>
      <Section title="Editar Vaga">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          {isError && <ErrorState onRetry={refetch} />}

          {isLoading && (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-32 w-full" />
              <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
              </div>
            </div>
          )}

          {!isLoading && !isError && job && (
            <>
              <JobForm
                defaultValues={defaultValues}
                onSubmit={handleSubmit}
                isLoading={isUpdatingJob}
                submitLabel="Salvar alterações"
              />
            </>
          )}
        </div>
      </Section>
    </div>
  );
}
