import Link from "next/link";
import { Section } from "@/components/Section";
import { EventSmallCard } from "@/components/EventSmallCard";
import { EmptyState } from "@/components/EmptyState";
import { FeedEvent } from "@/models";

interface EventsSectionProps {
  events: FeedEvent[];
  isLoading: boolean;
}

export function EventsSection({ events, isLoading }: EventsSectionProps) {
  if (!isLoading && events.length === 0) {
    return (
      <Section title="Próximos Eventos">
        <EmptyState
          title="Nenhum evento próximo"
          description="Novos eventos serão publicados em breve."
        />
      </Section>
    );
  }

  return (
    <Section title="Próximos Eventos">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <EventSmallCard key={i} isLoading />
          ))}

        {events.map((event) => (
          <EventSmallCard key={event.id} event={event} />
        ))}

        <Link
          href="/events"
          className="w-full py-2 block text-center text-[10px] font-bold text-slate-500 hover:text-primary uppercase tracking-wider transition-colors bg-slate-50"
        >
          Ver todos
        </Link>
      </div>
    </Section>
  );
}
