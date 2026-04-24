"use client";

import { useParams, useRouter } from "next/navigation";
import { Section } from "@/components/Section";
import { InfoCard } from "@/components/InfoCard";
import { ErrorState } from "@/components/ErrorState";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Building2,
  Clock,
  ArrowLeft,
  User,
  MapPin,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useJobById, useDeleteJob, useCloseJob } from "@/hooks/useJobs";
import { toast } from "sonner";
import {
  EmploymentTypeLabel,
  JobStatus,
  JobStatusLabel,
  SeniorityLevelLabel,
  WorkModelLabel,
} from "@/models/job";
import { useAuth } from "@/context/AuthContext";
import { SocialMediaPublicLinkCard } from "@/components/profile/social-media/SocialMediaPublicLinkCard";
import { SocialMediaType } from "@/models/users";

import { DeleteJobConfirmationDialog } from "@/components/Jobs/DeleteJobConfirmationDialog";
import { CloseJobConfirmationDialog } from "@/components/Jobs/CloseJobConfirmationDialog";

function getStatusBadgeClass(status: string): string {
  switch (status) {
    case JobStatus.Active:
      return "bg-green-100 text-green-700";
    case JobStatus.Closed:
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { user } = useAuth();
  const { data: job, isLoading, isError, refetch } = useJobById(id);
  const { mutateAsync: deleteJob, isPending: isDeletingJob } = useDeleteJob();
  const { mutateAsync: closeJob, isPending: isClosingJob } = useCloseJob();
  const isAuthor = !!job && !!user && job.author_id === user.id;

  async function confirmDelete() {
    try {
      await deleteJob(id);
      toast.success("Vaga excluída com sucesso!");
      router.push("/jobs");
    } catch {
      toast.error("Erro ao excluir a vaga", {
        description: "Tente novamente.",
      });
    }
  }

  async function confirmClose() {
    try {
      await closeJob(id);
      toast.success("Vaga encerrada com sucesso!");
      router.push("/jobs");
    } catch {
      toast.error("Erro ao encerrar a vaga", {
        description: "Tente novamente.",
      });
    }
  }

  return (
    <div>
      <Section title="Detalhes da Vaga">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para vagas
          </Link>

          {isError && <ErrorState onRetry={refetch} />}

          {isLoading && (
            <div className="space-y-6">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-6 w-1/2" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-24 rounded-xl" />
                <Skeleton className="h-24 rounded-xl" />
              </div>
              <Skeleton className="h-48 rounded-xl" />
            </div>
          )}

          {!isLoading && !isError && job && (
            <>
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">
                    {WorkModelLabel[job.work_model] ?? job.work_model}
                  </span>
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">
                    {EmploymentTypeLabel[job.employment_type] ??
                      job.employment_type}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(job.status)}`}
                  >
                    {JobStatusLabel[job.status as JobStatus] ?? job.status}
                  </span>
                  {job.seniority_level && (
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">
                      {SeniorityLevelLabel[job.seniority_level] ??
                        job.seniority_level}
                    </span>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
                  {job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-600 dark:text-slate-400">
                  {job.create_date && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-5 h-5" />
                      Postado{" "}
                      {formatDistanceToNow(new Date(job.create_date), {
                        locale: ptBR,
                        addSuffix: true,
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard
                    icon={<Building2 className="w-5 h-5" />}
                    label="Empresa"
                    title={job.workplace}
                    subtitle={`${job.city}, ${job.state}`}
                  />
                  <InfoCard
                    icon={<User className="w-5 h-5" />}
                    label="Publicado por"
                    title={job.author_name}
                    subtitle={
                      job.author_workplace ??
                      job.author_course_abbreviation ??
                      ""
                    }
                    profileLink={`/profile/${job.author_id}`}
                    titleClassName="hover:cursor-pointer hover:underline"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InfoCard
                    icon={<Briefcase className="w-5 h-5" />}
                    label="Contratação"
                    title={
                      EmploymentTypeLabel[job.employment_type] ??
                      job.employment_type
                    }
                    subtitle={WorkModelLabel[job.work_model] ?? job.work_model}
                  />
                  {job.seniority_level && (
                    <InfoCard
                      icon={<GraduationCap className="w-5 h-5" />}
                      label="Senioridade"
                      title={
                        SeniorityLevelLabel[job.seniority_level] ??
                        job.seniority_level
                      }
                      subtitle=""
                    />
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold border-b border-slate-200 dark:border-slate-800 pb-2">
                    Sobre a Vaga
                  </h3>
                  <div className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {job.description}
                  </div>
                </div>

                {job.url && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold border-b border-slate-200 dark:border-slate-800 pb-2">
                      Link da Vaga
                    </h3>
                    <SocialMediaPublicLinkCard
                      className="w-lg"
                      socialMedia={{
                        id: `job-url-${id}`,
                        type: SocialMediaType.Website,
                        url: job.url,
                      }}
                    />
                  </div>
                )}

                {isAuthor && (
                  <div className="flex gap-3 pt-4 border-t border-slate-200">
                    <Link href={`/jobs/${id}/edit`}>
                      <Button variant="outline">Editar</Button>
                    </Link>
                    <CloseJobConfirmationDialog
                      onConfirm={confirmClose}
                      isLoading={isClosingJob}
                    />
                    <DeleteJobConfirmationDialog
                      onConfirm={confirmDelete}
                      isLoading={isDeletingJob}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </Section>
    </div>
  );
}
