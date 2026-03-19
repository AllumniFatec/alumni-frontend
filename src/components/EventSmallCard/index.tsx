import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FeedEvent } from "@/models";
import { Skeleton } from "@/components/ui/skeleton";

interface EventSmallCardProps {
  event?: FeedEvent;
  isLoading?: boolean;
}

export function EventSmallCard({
  event,
  isLoading = false,
}: EventSmallCardProps) {
  if (isLoading || !event) {
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
      href={`/events/${event.id}`}
      className="p-3 flex items-center gap-3 hover:bg-slate-50 transition-colors"
    >
      <div className="bg-slate-100 text-center py-1 px-2 rounded-lg min-w-[40px] shrink-0">
        <p className="text-[9px] font-bold text-primary uppercase leading-tight">
          {format(new Date(event.date_start), "MMM", { locale: ptBR })}
        </p>
        <p className="text-base font-black leading-tight">
          {format(new Date(event.date_start), "dd")}
        </p>
      </div>
      <div className="min-w-0">
        <h4 className="text-sm font-bold text-slate-900 truncate">
          {event.title}
        </h4>
        <p className="text-[11px] text-slate-500 truncate">{event.local}</p>
      </div>
    </Link>
  );
}
