import { Status, User } from "./users";

export interface Event {
  event_id: string;
  title: string;
  description: string;
  local: string;
  date_start: Date;
  date_end: Date;
  images: Record<string, unknown>[];
  status: Status;
  author_id: string;
  author?: User;
  create_date: Date;
  updated_at?: Date;
  deleted_date?: Date;
}

export interface CreateEvent {
  title: string;
  description: string;
  local: string;
  date_start: Date;
  date_end: Date;
  images?: Record<string, unknown>[];
  author_id: string;
}

export interface UpdateEvent {
  title?: string;
  description?: string;
  local?: string;
  date_start?: Date;
  date_end?: Date;
  images?: Record<string, unknown>[];
  status?: Status;
}
