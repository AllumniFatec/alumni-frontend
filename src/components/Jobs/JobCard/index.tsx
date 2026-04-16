"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  EmploymentTypeLabel,
  JobListItem,
  JobStatus,
  JobStatusLabel,
  WorkModelLabel,
} from "@/models/job";
import { CardActionsMenu } from "@/components/Jobs/CardActionsMenuJobs";
import { useDeleteJob } from "@/hooks/useJobs";
import { toast } from "sonner";

interface JobCardProps {
  job: JobListItem;
}

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

export function JobCard({ job }: JobCardProps) {
  //TODO: Refactor later to parents manager this functions
  const router = useRouter();
  const { mutateAsync: deleteJob, isPending } = useDeleteJob();

  async function handleDelete() {
    try {
      await deleteJob(job.id);
      toast.success("Vaga excluída com sucesso!", {
        className: "!bg-green-500 !text-white !border-green-600",
      });
    } catch (err) {
      toast.error("Erro ao excluir a vaga", {
        className: "!bg-red-500 !text-white !border-red-600",
        description: "Tente novamente.",
      });
      throw err;
    }
  }

  return (
    <div className="relative group">
      <Link
        href={`/jobs/${job.id}`}
        className="flex items-center p-3 bg-white dark:bg-slate-900 rounded-xl border border-primary/5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      >
        <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center p-2 mr-4 shrink-0">
          <span className="text-xl font-bold text-primary/40">
            {job.workplace.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm truncate">{job.title}</h4>
          <p className="text-xs text-slate-500 truncate">
            {job.workplace} · {job.city}, {job.state}
          </p>
          <div className="flex gap-1 mt-1 flex-wrap">
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
              {WorkModelLabel[job.work_model] ?? job.work_model}
            </span>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
              {EmploymentTypeLabel[job.employment_type] ?? job.employment_type}
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getStatusBadgeClass(job.status)}`}
            >
              {JobStatusLabel[job.status as JobStatus] ?? job.status}
            </span>
          </div>
        </div>
        <div className="text-right ml-2 shrink-0">
          <span className="text-[10px] text-slate-400 whitespace-nowrap">
            {job.create_date
              ? formatDistanceToNow(new Date(job.create_date), {
                  addSuffix: true,
                  locale: ptBR,
                })
              : ""}
          </span>
        </div>
      </Link>

      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <CardActionsMenu
          authorId={job.author_id}
          onEdit={() => router.push(`/jobs/${job.id}/edit`)}
          onDelete={handleDelete}
          isDeleting={isPending}
        />
      </div>
    </div>
  );
}
