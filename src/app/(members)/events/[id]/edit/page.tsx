"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Section } from "@/components/Section";
import { ErrorState } from "@/components/ErrorState";
import { EventForm } from "@/components/Events/EventForm";
import type { EventWritePayload } from "@/models/event";
import { useEventById, useUpdateEvent } from "@/hooks/useEvents";
import { useCanManageEvents } from "@/hooks/useCanManageEvents";
import { useAuth } from "@/context/AuthContext";
import { eventDetailToFormDefaults } from "@/lib/eventFormDefaults";
import { Skeleton } from "@/components/ui/skeleton";

export default function EventEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { isLoading: authLoading } = useAuth();
  const { canManageEvents } = useCanManageEvents();
  const { data: event, isLoading, isError, refetch } = useEventById(id);
  const { mutateAsync: updateEvent, isPending: isUpdating } = useUpdateEvent(id);

  useEffect(() => {
    if (authLoading) return;
    if (!canManageEvents) {
      router.replace("/events");
    }
  }, [authLoading, canManageEvents, router]);

  async function handleSubmit(data: EventWritePayload) {
    await updateEvent(data);
    router.push(`/events/${id}`);
  }

  const defaultValues = event ? eventDetailToFormDefaults(event) : undefined;

  if (authLoading) {
    return (
      <div>
        <Section title="Editar evento">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </Section>
      </div>
    );
  }

  if (!canManageEvents) {
    return null;
  }

  return (
    <div>
      <Section title="Editar evento">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          {isError && <ErrorState onRetry={refetch} />}

          {isLoading && (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-32 w-full" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
              </div>
            </div>
          )}

          {!isLoading && !isError && event && (
            <EventForm
              defaultValues={defaultValues}
              onSubmit={handleSubmit}
              isLoading={isUpdating}
              submitLabel="Salvar alterações"
            />
          )}
        </div>
      </Section>
    </div>
  );
}
