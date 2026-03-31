import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { EventApi } from "@/apis/events";
import type { EventWritePayload } from "@/models/event";
import { normalizeEventWritePayload } from "@/lib/eventForm";
import { PROFILE_QUERY_KEY } from "@/hooks/useProfile";

export const EVENTS_LIST_QUERY_KEY = ["events", "list"] as const;

const toastSuccess = (title: string, description: string) =>
  toast.success(title, {
    description,
    duration: 5000,
    position: "top-right",
    className:
      "!bg-green-500 !text-white !border-green-600 [&_[data-description]]:!text-white",
  });

const toastError = (description: string) =>
  toast.error("Algo deu errado", {
    description,
    duration: 5000,
    position: "top-right",
    className:
      "!bg-red-500 !text-white !border-red-600 [&_[data-description]]:!text-white",
  });

export function useEvents() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: EVENTS_LIST_QUERY_KEY,
    queryFn: ({ pageParam = 1 }) =>
      EventApi.getEvents(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.page + 1
        : undefined,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}

export function useEventById(id: string) {
  const { data, isLoading, isError, refetch, error } = useQuery({
    queryKey: ["events", "detail", id],
    queryFn: () => EventApi.getEventById(id),
    enabled: !!id,
  });

  return { data, isLoading, isError, refetch, error };
}

function invalidateEventCaches(qc: ReturnType<typeof useQueryClient>) {
  void qc.invalidateQueries({ queryKey: EVENTS_LIST_QUERY_KEY });
  void qc.invalidateQueries({ queryKey: ["feed"] });
  void qc.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
}

export function useCreateEvent() {
  const qc = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: EventWritePayload) =>
      EventApi.createEvent(normalizeEventWritePayload(data)),
    onSuccess: () => {
      invalidateEventCaches(qc);
      toastSuccess("Evento criado", "O evento foi publicado com sucesso.");
    },
    onError: () => {
      toastError("Verifique os dados e tente novamente.");
    },
  });

  return { mutateAsync, isPending };
}

export function useUpdateEvent(id: string) {
  const qc = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: EventWritePayload) =>
      EventApi.updateEvent(id, normalizeEventWritePayload(data)),
    onSuccess: () => {
      invalidateEventCaches(qc);
      void qc.invalidateQueries({ queryKey: ["events", "detail", id] });
      toastSuccess("Evento atualizado", "As alterações foram salvas.");
    },
    onError: () => {
      toastError("Verifique os dados e tente novamente.");
    },
  });

  return { mutateAsync, isPending };
}

export function useDeleteEvent() {
  const qc = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (eventId: string) => EventApi.deleteEvent(eventId),
    onSuccess: (_, eventId) => {
      qc.removeQueries({ queryKey: ["events", "detail", eventId] });
      invalidateEventCaches(qc);
      toastSuccess("Evento excluído", "O evento foi removido da plataforma.");
    },
    onError: () => {
      toastError("Tente novamente.");
    },
  });

  return { mutateAsync, isPending };
}

export function useCloseEvent(id: string) {
  const qc = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => EventApi.closeEvent(id),
    onSuccess: () => {
      invalidateEventCaches(qc);
      void qc.invalidateQueries({ queryKey: ["events", "detail", id] });
      toastSuccess("Evento encerrado", "O evento foi marcado como encerrado.");
    },
    onError: () => {
      toastError("Tente novamente.");
    },
  });

  return { mutateAsync, isPending };
}
