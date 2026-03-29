import { User } from "./users";

export enum EventStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  CLOSED = "Closed",
  CANCELED = "Canceled",
  DELETED = "Deleted",
}

/** Resposta GET /event — itens resumidos */
export interface EventListItem {
  id: string;
  title: string;
  local: string;
  /** ISO 8601 */
  date_start: string;
}

export interface EventPagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface EventsListResponse {
  data: EventListItem[];
  pagination: EventPagination;
}

/** GET /event/:id — detalhe */
export interface EventDetail {
  id: string;
  author_id: string | null;
  author_name: string | null;
  title: string;
  description: string | null;
  local: string;
  date_start: string;
  date_end: string | null;
  status: EventStatus | string;
  images: Record<string, unknown>[] | null;
}

/** POST /event e PUT /event/:id — corpo conforme API.md */
export interface EventWritePayload {
  title: string;
  description: string;
  local: string;
  date_start: string;
  time_start: string;
  date_end: string;
  time_end: string;
}

/** Legado / mocks — preferir EventListItem + EventDetail na API */
export interface Event {
  event_id: string;
  title: string;
  description: string;
  local: string;
  date_start: Date;
  date_end: Date;
  images: Record<string, unknown>[];
  status: EventStatus;
  author_id: string;
  author?: User;
  create_date: Date;
  updated_at?: Date;
  deleted_date?: Date;
}
