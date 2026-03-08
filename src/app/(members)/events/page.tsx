import { Section } from "@/components/Section";
import { Calendar, MapPin, Clock } from "lucide-react";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Workshop de Inteligência Artificial",
    description:
      "Aprofunde seus conhecimentos em IA com foco em aplicações práticas para o mercado de trabalho. Aprenda sobre redes neurais, machine learning e ferramentas modernas.",
    date: "15/03/2026",
    time: "14:00",
    location: "FATEC Sorocaba – Lab. 203",
    category: "Workshop",
  },
  {
    id: 2,
    title: "Alumni Talks: Carreira em Tech",
    description:
      "Ex-alunos da FATEC compartilham suas experiências no mercado de tecnologia. Networking, dicas de carreira e cases reais de sucesso.",
    date: "22/03/2026",
    time: "19:00",
    location: "Auditório Principal – FATEC Sorocaba",
    category: "Palestra",
  },
  {
    id: 3,
    title: "Hackathon Alumni 2026",
    description:
      "48 horas de desenvolvimento intensivo para resolver problemas reais da cidade de Sorocaba. Aberto para alunos e egressos. Prêmios em dinheiro para os três primeiros lugares.",
    date: "05/04/2026",
    time: "08:00",
    location: "FATEC Sorocaba – Bloco D",
    category: "Hackathon",
  },
  {
    id: 4,
    title: "Semana de TI – Edição 2026",
    description:
      "A maior semana de tecnologia da FATEC Sorocaba. Palestras, workshops, competições e muito networking. Professores, profissionais e empresas parceiras presentes.",
    date: "20/04/2026",
    time: "08:00",
    location: "FATEC Sorocaba",
    category: "Semana Acadêmica",
  },
];

const categoryColors: Record<string, string> = {
  Workshop: "bg-blue-100 text-blue-700",
  Palestra: "bg-green-100 text-green-700",
  Hackathon: "bg-purple-100 text-purple-700",
  "Semana Acadêmica": "bg-orange-100 text-orange-700",
};

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
