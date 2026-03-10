import { Status, User } from "./users";

export interface Job {
  job_id: string;
  title: string;
  description: string;
  company: string;
  images: Record<string, unknown>[];
  status: Status;
  author_id: string;
  author?: User;
  create_date: Date;
  updated_at?: Date;
  deleted_date?: Date;
}
