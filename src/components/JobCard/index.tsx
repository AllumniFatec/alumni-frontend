"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Job } from "@/models/job";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Link
      href={`/jobs/${job.job_id}`}
      className="flex items-center p-3 bg-white dark:bg-slate-900 rounded-xl border border-primary/5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center p-2 mr-4">
        {job.images && job.images.length > 0 ? (
          <img
            className="w-full h-full object-contain"
            src={(job.images[0]?.url as string) || ""}
            alt={job.company}
          />
        ) : (
          <span className="text-xl font-bold text-primary/40">
            {job.company.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-sm truncate">{job.title}</h4>
        <p className="text-xs text-slate-500 truncate">
          {job.company}
          {job.author && ` • ${job.author.name}`}
        </p>
      </div>
      <div className="text-right ml-2">
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
