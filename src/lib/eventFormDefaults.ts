import { format, parseISO } from "date-fns";
import type { EventDetail } from "@/models/event";
import type { EventFormValues } from "@/components/Events/EventForm";

export function eventDetailToFormDefaults(
  detail: EventDetail,
): Partial<EventFormValues> {
  const start = parseISO(detail.date_start);
  const end = detail.date_end ? parseISO(detail.date_end) : start;
  return {
    title: detail.title,
    description: detail.description ?? "",
    local: detail.local,
    date_start: format(start, "dd/MM/yyyy"),
    time_start: format(start, "HH:mm"),
    date_end: format(end, "dd/MM/yyyy"),
    time_end: format(end, "HH:mm"),
  };
}
