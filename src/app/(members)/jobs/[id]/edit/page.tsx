"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Section } from "@/components/Section";
import { ErrorState } from "@/components/ErrorState"; // mantido para isError do query
import { JobForm, JobFormValues } from "@/components/Jobs/JobForm";
import { Skeleton } from "@/components/ui/skeleton";
import { useJobById, useUpdateJob } from "@/hooks/useJobs";
import { EmploymentType, JobStatus, SeniorityLevel, WorkModel } from "@/models/job";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function JobEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { user } = useAuth();
  const { data: job, isLoading, isError, refetch } = useJobById(id);
  const { mutateAsync: updateJob, isPending: isUpdatingJob } = useUpdateJob(id);

  useEffect(() => {
    if (isLoading || !job || !user) return;

    const isOwner = job.author_id === user.id;
    const isAdmin = user.admin === true;
    const isActive = job.status === JobStatus.Active;

    // Admin pode editar qualquer vaga ativa; usuário comum só pode editar sua própria vaga ativa
    const canEdit = isActive && (isAdmin || isOwner);

    if (!canEdit) {
      router.replace(`/jobs/${id}`);
    }
  }, [isLoading, job, user, id, router]);

  async function handleSubmit(data: JobFormValues) {
    try {
      await updateJob(data);
      toast.success("Vaga atualizada com sucesso!", {
        duration: 5000,
        position: "top-right",
        className:
          "!bg-green-500 !text-white !border-green-600 [&_[data-description]]:!text-white",
      });
      router.push(`/jobs/${id}`);
    } catch {
      toast.error("Erro ao salvar a vaga", {
        duration: 5000,
        position: "top-right",
        className:
          "!bg-red-500 !text-white !border-red-600 [&_[data-description]]:!text-white",
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
        url: job.url ?? undefined,
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

          {!isLoading && !isError && job &&
            job.status === JobStatus.Active &&
            (user?.id === job.author_id || user?.admin === true) && (
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
