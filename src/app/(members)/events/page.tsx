"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Section } from "@/components/Section";
import { EventCard } from "@/components/EventCard";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEvents } from "@/hooks/useEvents";
import { useCanManageEvents } from "@/hooks/useCanManageEvents";
import type { EventListItem } from "@/models/event";
import {
  endOfMonth,
  isWithinInterval,
  startOfMonth,
  addMonths,
} from "date-fns";

type PeriodFilter = "all" | "thisMonth" | "nextMonth";

function EventsFilters({
  search,
  onSearchChange,
  period,
  onPeriodChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  period: PeriodFilter;
  onPeriodChange: (value: PeriodFilter) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <div className="w-full sm:flex-1 sm:min-w-[200px]">
        <Input
          className="bg-muted"
          placeholder="Buscar por título ou local..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="w-full sm:w-56">
        <Select value={period} onValueChange={(v) => onPeriodChange(v as PeriodFilter)}>
          <SelectTrigger className="bg-muted">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as datas</SelectItem>
            <SelectItem value="thisMonth">Este mês</SelectItem>
            <SelectItem value="nextMonth">Próximo mês</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function EventsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col rounded-xl border border-slate-100 overflow-hidden"
        >
          <Skeleton className="h-44 w-full rounded-none" />
          <div className="p-5 space-y-2">
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

function periodPredicate(period: PeriodFilter, dateStartIso: string): boolean {
  if (period === "all") return true;
  const d = new Date(dateStartIso);
  const now = new Date();
  if (period === "thisMonth") {
    return isWithinInterval(d, {
      start: startOfMonth(now),
      end: endOfMonth(now),
    });
  }
  const next = addMonths(now, 1);
  return isWithinInterval(d, {
    start: startOfMonth(next),
    end: endOfMonth(next),
  });
}

function EventsGrid({ events }: { events: EventListItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState<PeriodFilter>("all");
  const { canManageEvents } = useCanManageEvents();

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useEvents();

  const allEvents = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      const matchesSearch =
        !search ||
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.local.toLowerCase().includes(search.toLowerCase());
      const matchesPeriod = periodPredicate(period, event.date_start);
      return matchesSearch && matchesPeriod;
    });
  }, [allEvents, search, period]);

  const headerText = isLoading
    ? "Carregando..."
    : `${filteredEvents.length} evento${filteredEvents.length !== 1 ? "s" : ""}`;

  const baseContent = (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <h2 className="text-lg font-semibold text-slate-700">{headerText}</h2>
        {canManageEvents ? (
          <Link href="/events/new">
            <Button size="sm" variant="destructive">
              Criar evento
            </Button>
          </Link>
        ) : null}
      </div>

      <EventsFilters
        search={search}
        onSearchChange={setSearch}
        period={period}
        onPeriodChange={setPeriod}
      />

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <EventsSkeleton />
      ) : filteredEvents.length === 0 ? (
        <EmptyState
          title="Nenhum evento encontrado"
          description="Tente ajustar os filtros ou volte mais tarde."
        />
      ) : (
        <>
          <EventsGrid events={filteredEvents} />

          {hasNextPage && (
            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? "Carregando..." : "Carregar mais"}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <div>
      <Section title="Eventos">{baseContent}</Section>
    </div>
  );
}
