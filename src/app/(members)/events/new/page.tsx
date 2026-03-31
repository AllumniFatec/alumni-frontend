"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Section } from "@/components/Section";
import { EventForm } from "@/components/Events/EventForm";
import type { EventWritePayload } from "@/models/event";
import { useCreateEvent } from "@/hooks/useEvents";
import { useCanManageEvents } from "@/hooks/useCanManageEvents";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function EventNewPage() {
  const router = useRouter();
  const { isLoading: authLoading } = useAuth();
  const { canManageEvents } = useCanManageEvents();
  const { mutateAsync: createEvent, isPending: isCreating } = useCreateEvent();

  useEffect(() => {
    if (authLoading) return;
    if (!canManageEvents) {
      router.replace("/events");
    }
  }, [authLoading, canManageEvents, router]);

  async function handleSubmit(data: EventWritePayload) {
    await createEvent(data);
    router.push("/events");
  }

  if (authLoading) {
    return (
      <div>
        <Section title="Novo evento">
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
      <Section title="Novo evento">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <EventForm
            onSubmit={handleSubmit}
            isLoading={isCreating}
            submitLabel="Publicar evento"
          />
        </div>
      </Section>
    </div>
  );
}
