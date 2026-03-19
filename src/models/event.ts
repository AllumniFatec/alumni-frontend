import { User } from "./users";

export enum EventStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  CLOSED = "Closed",
  CANCELED = "Canceled",
  DELETED = "Deleted",
}
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
