import { User } from "./users";

export enum JobStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  CLOSED = "Closed",
  CANCELED = "Canceled",
  DELETED = "Deleted",
}

export interface Job {
  job_id: string;
  title: string;
  description: string;
  company: string;
  city?: string;
  state?: string;
  work_model?: string;
  images: Record<string, unknown>[];
  status: JobStatus;
  author_id: string;
  author?: User;
  create_date: Date;
  updated_at?: Date;
  deleted_date?: Date;
}
