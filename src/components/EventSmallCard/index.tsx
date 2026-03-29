import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "lucide-react";
import type { FeedEvent, ProfileEventSummary } from "@/models";
import { Skeleton } from "@/components/ui/skeleton";

interface EventSmallCardProps {
  event?: FeedEvent;
  /** Resumo vindo de GET /my-profile (sem data/local). */
  profileEvent?: ProfileEventSummary;
  isLoading?: boolean;
}

export function EventSmallCard({
  event,
  profileEvent,
  isLoading = false,
}: EventSmallCardProps) {
  if (isLoading || (!event && !profileEvent)) {
    return (
      <div className="p-3 flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
        <div className="flex-1 space-y-1">
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    );
  }

  if (profileEvent) {
    return (
      <Link
        href={`/events/${profileEvent.event_id}`}
        className="p-3 flex items-center gap-3 hover:bg-slate-50 transition-colors"
      >
        <div className="bg-slate-100 flex items-center justify-center rounded-lg min-w-[40px] min-h-[44px] shrink-0">
          <Calendar className="size-5 text-primary" strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-slate-900 truncate">
            {profileEvent.title}
          </h4>
          <p className="text-[11px] text-slate-500 truncate">
            {profileEvent.status}
          </p>
        </div>
      </Link>
    );
  }

  const feed = event;
  if (!feed) {
    return (
      <div className="p-3 flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
        <div className="flex-1 space-y-1">
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/events/${feed.id}`}
      className="p-3 flex items-center gap-3 hover:bg-slate-50 transition-colors"
    >
      <div className="bg-slate-100 text-center py-1 px-2 rounded-lg min-w-[40px] shrink-0">
        <p className="text-[9px] font-bold text-primary uppercase leading-tight">
          {format(new Date(feed.date_start), "MMM", { locale: ptBR })}
        </p>
        <p className="text-base font-black leading-tight">
          {format(new Date(feed.date_start), "dd")}
        </p>
      </div>
      <div className="min-w-0">
        <h4 className="text-sm font-bold text-slate-900 truncate">
          {feed.title}
        </h4>
        <p className="text-[11px] text-slate-500 truncate">{feed.local}</p>
      </div>
    </Link>
  );
}
