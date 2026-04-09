"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/Section";
import { InfoCard } from "@/components/InfoCard";
import { ErrorState } from "@/components/ErrorState";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, MapPin, ArrowLeft, User } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEventById, useDeleteEvent, useCloseEvent } from "@/hooks/useEvents";
import { useCanManageEvents } from "@/hooks/useCanManageEvents";
import { DeleteEventConfirmationDialog } from "@/components/Events/DeleteEventConfirmationDialog";
import { EventStatus } from "@/models/event";
import { isAxiosError } from "axios";
import { CloseEventConfirmationDialog } from "@/components/Events/CloseEventConfirmationDialog";

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: event, isLoading, isError, refetch, error } = useEventById(id);
  const { mutateAsync: deleteEvent, isPending: isDeleting } = useDeleteEvent();
  const { mutateAsync: closeEvent, isPending: isClosing } = useCloseEvent(id);
  const { canManageEvents } = useCanManageEvents();

  const isActive = event?.status === EventStatus.ACTIVE;

  async function confirmDelete() {
    await deleteEvent(id);
    router.push("/events");
  }

  async function confirmClose() {
    await closeEvent();
    router.push("/events");
  }

  const formattedDate =
    event &&
    format(new Date(event.date_start), "dd 'de' MMMM, yyyy", {
      locale: ptBR,
    });
  const formattedStartTime =
    event && format(new Date(event.date_start), "HH:mm", { locale: ptBR });
  const formattedEndTime =
    event &&
    event.date_end &&
    format(new Date(event.date_end), "HH:mm", { locale: ptBR });

  return (
    <div>
      <Section title="Detalhes do Evento">
        <div className="max-w-6xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para eventos
          </Link>

          {isError && (
            <ErrorState
              onRetry={refetch}
              description="Não foi possível carregar este evento."
            />
          )}

          {isLoading && (
            <div className="space-y-6">
              <Skeleton className="h-[200px] w-full rounded-xl" />
              <Skeleton className="h-10 w-2/3" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Skeleton className="h-24 rounded-xl" />
                <Skeleton className="h-24 rounded-xl" />
                <Skeleton className="h-24 rounded-xl" />
              </div>
            </div>
          )}

          {!isLoading && !isError && event && (
            <>
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

              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      Evento
                    </span>
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">
                      {event.status}
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
                    title={formattedDate ?? ""}
                    subtitle={
                      formattedEndTime
                        ? `${formattedStartTime} - ${formattedEndTime}`
                        : (formattedStartTime ?? "")
                    }
                  />

                  <InfoCard
                    icon={<MapPin className="w-5 h-5" />}
                    label="Localização"
                    title={event.local}
                    subtitle=""
                  />

                  <InfoCard
                    icon={<User className="w-5 h-5" />}
                    label="Organizado por"
                    title={event.author_name ?? "—"}
                    subtitle=""
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold border-b border-slate-200 dark:border-slate-800 pb-2">
                    Sobre o Evento
                  </h3>
                  <div className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {event.description}
                  </div>
                </div>

                {canManageEvents && isActive && (
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
                    <Link href={`/events/${id}/edit`}>
                      <Button variant="outline">Editar</Button>
                    </Link>
                    <CloseEventConfirmationDialog
                      onConfirm={confirmClose}
                      isLoading={isClosing}
                    />
                    <DeleteEventConfirmationDialog
                      onConfirm={confirmDelete}
                      isLoading={isDeleting}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </Section>
    </div>
  );
}
