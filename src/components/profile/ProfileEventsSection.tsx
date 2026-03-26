"use client";

import { Calendar } from "lucide-react";
import { EventSmallCard } from "@/components/EventSmallCard";
import type { ProfileEventSummary } from "@/models/profile";

export function ProfileEventsSection({ events }: { events: ProfileEventSummary[] }) {
  if (events.length === 0) return null;

  return (
    <section className="mt-6">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <Calendar className="h-4 w-4" />
        Eventos
      </h3>
      <div className="flex flex-col gap-3">
        {events.map((e) => (
          <EventSmallCard key={e.event_id} profileEvent={e} />
        ))}
      </div>
    </section>
  );
}
