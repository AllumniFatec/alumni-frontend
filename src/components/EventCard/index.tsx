"use client";

import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, MapPin } from "lucide-react";

/** Item de lista ou detalhe mínimo para o card */
export type EventCardModel = {
  id: string;
  title: string;
  local: string;
  date_start: string;
  description?: string;
  images?: Record<string, unknown>[] | null;
};

interface EventCardProps {
  event: EventCardModel;
}

export function EventCard({ event }: EventCardProps) {
  const formattedDate = format(new Date(event.date_start), "dd MMM", {
    locale: ptBR,
  });
  const formattedTime = format(new Date(event.date_start), "HH:mm", {
    locale: ptBR,
  });

  return (
    <Link
      href={`/events/${event.id}`}
      className="min-w-[320px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group shrink-0"
    >
      <div className="h-44 relative bg-gradient-to-br from-primary/20 to-primary/5">
        {event.images && event.images.length > 0 ? (
          <img
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={(event.images[0]?.url as string) || ""}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Calendar className="w-16 h-16 text-primary/30" />
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-primary text-[11px] font-bold uppercase tracking-wider">
            {formattedDate} • {formattedTime}
          </span>
        </div>
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 leading-tight mb-4 line-clamp-2">
          {event.title}
        </h3>
        {event.description ? (
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
            {event.description}
          </p>
        ) : null}
        <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs">
          <MapPin className="w-3.5 h-3.5" />
          <span className="truncate">{event.local}</span>
        </div>
      </div>
    </Link>
  );
}
