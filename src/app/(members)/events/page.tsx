import { Section } from "@/components/Section";
import { Calendar, MapPin, Clock } from "lucide-react";
import { mockEvents, categoryColors } from "@/mocks";

export default function EventsPage() {
  return (
    <div>
      <Section title="Eventos">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-start justify-between mb-3">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    categoryColors[event.category] ??
                    "bg-slate-100 text-slate-600"
                  }`}
                >
                  {event.category}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-2 leading-snug">
                {event.title}
              </h3>
              <p className="text-sm text-slate-500 mb-4 leading-relaxed line-clamp-3">
                {event.description}
              </p>
              <div className="flex flex-col gap-1 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="size-3.5" />
                  {event.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" />
                  {event.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="size-3.5" />
                  {event.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
