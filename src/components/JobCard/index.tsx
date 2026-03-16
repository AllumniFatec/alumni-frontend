"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { EmploymentTypeLabel, JobListItem, WorkModelLabel } from "@/models/job";

interface JobCardProps {
  job: JobListItem;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="flex items-center p-3 bg-white dark:bg-slate-900 rounded-xl border border-primary/5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center p-2 mr-4">
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
        </div>
      </div>
      <div className="text-right ml-2 shrink-0">
        <span className="text-[10px] text-slate-400 whitespace-nowrap">
          {formatDistanceToNow(new Date(job.create_date), {
            addSuffix: true,
            locale: ptBR,
          })}
        </span>
      </div>
    </Link>
  );
}
