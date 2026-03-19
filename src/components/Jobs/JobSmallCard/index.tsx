import Link from "next/link";
import { FeedJob } from "@/models";
import { Skeleton } from "@/components/ui/skeleton";

interface JobSmallCardProps {
  job?: FeedJob;
  isLoading?: boolean;
}

export function JobSmallCard({ job, isLoading = false }: JobSmallCardProps) {
  if (isLoading || !job) {
    return (
      <div className="p-3 space-y-1">
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    );
  }

  return (
    <Link
      href={`/jobs/${job.id}`}
      className="block p-3 hover:bg-slate-50 transition-colors"
    >
      <h4 className="text-sm font-bold text-slate-900 truncate">{job.title}</h4>
      <p className="text-[11px] text-slate-500 truncate">
        {job.company}
        {job.city ? ` · ${job.city}` : ""}
        {job.work_model ? ` · ${job.work_model}` : ""}
      </p>
    </Link>
  );
}
