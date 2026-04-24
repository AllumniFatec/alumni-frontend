"use client";

import { useMemo } from "react";
import { Calendar } from "lucide-react";
import { EventSmallCard } from "@/components/EventSmallCard";
import { Button } from "@/components/ui/button";
import { useProfileEventsByUser } from "@/hooks/useProfile";
import type { ProfileEventsListResponse } from "@/models/profile";

interface ProfileEventsSectionProps {
  profileUserId: string;
  initialEvents: ProfileEventsListResponse;
}

export function ProfileEventsSection({
  profileUserId,
  initialEvents,
}: ProfileEventsSectionProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProfileEventsByUser(profileUserId, initialEvents);

  const events = useMemo(
    () => data?.pages.flatMap((page) => page.events) ?? initialEvents.events,
    [data, initialEvents.events],
  );

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
      {hasNextPage && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Carregando..." : "Carregar mais"}
          </Button>
        </div>
      )}
    </section>
  );
}
