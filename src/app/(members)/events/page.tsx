import { Section } from "@/components/Section";
import { EventCard } from "@/components/EventCard";
import { mockEvents } from "@/mocks";

export default function EventsPage() {
  return (
    <div>
      <Section title="Eventos">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockEvents.map((event) => (
            <EventCard key={event.event_id} event={event} />
          ))}
        </div>
      </Section>
    </div>
  );
}
