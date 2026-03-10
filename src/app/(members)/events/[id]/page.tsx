import { Section } from "@/components/Section";
import { InfoCard } from "@/components/InfoCard";
import { Calendar, MapPin, ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { mockEvents } from "@/mocks";

interface EventDetailPageProps {
  params: {
    id: string;
  };
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = params;

  // TODO: Buscar event da API usando o ID
  // import { getEventById } from "@/apis/events";
  // const event = await getEventById(id);

  // Mock data para demonstração
  const event = mockEvents.find((e) => e.event_id === id) || mockEvents[0];

  const formattedDate = format(
    new Date(event.date_start),
    "dd 'de' MMMM, yyyy",
    {
      locale: ptBR,
    },
  );
  const formattedStartTime = format(new Date(event.date_start), "HH:mm", {
    locale: ptBR,
  });
  const formattedEndTime = format(new Date(event.date_end), "HH:mm", {
    locale: ptBR,
  });

  return (
    <div>
      <Section title="Detalhes do Evento">
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para eventos
          </Link>

          {/* Hero Banner */}
          <div className="w-full h-[400px] bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl shadow-lg mb-8 overflow-hidden flex items-center justify-center">
            {event.images && event.images.length > 0 ? (
              <img
                className="w-full h-full object-cover"
                src={(event.images[0]?.url as string) || ""}
                alt={event.title}
              />
            ) : (
              <Calendar className="w-32 h-32 text-primary/30" />
            )}
          </div>

          {/* Event Details */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Evento
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                {event.title}
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <InfoCard
                icon={<Calendar className="w-5 h-5" />}
                label="Data e Hora"
                title={formattedDate}
                subtitle={`${formattedStartTime} - ${formattedEndTime}`}
              />

              <InfoCard
                icon={<MapPin className="w-5 h-5" />}
                label="Localização"
                title={event.local}
                subtitle="Av. Engenheiro Carlos Reinaldo Mendes, 2015"
              />

              <InfoCard
                icon={<User className="w-5 h-5" />}
                label="Organizado por"
                title="Diretoria Acadêmica"
                subtitle="FATEC Sorocaba"
              />
            </div>

            {/* Description Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold border-b border-slate-200 dark:border-slate-800 pb-2">
                Sobre o Evento
              </h3>
              <div className="text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
                <p>{event.description}</p>
                <p>
                  Este evento é uma ótima oportunidade para networking e
                  aprendizado com profissionais experientes da área. Traga suas
                  dúvidas e esteja pronto para interagir!
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Certificado de participação digital</li>
                  <li>Material de apoio incluído</li>
                  <li>Coffee break durante o intervalo</li>
                  <li>Oportunidade de networking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
