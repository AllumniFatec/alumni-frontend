// Export all models and types
export * from "./users";
export * from "./posts";
export * from "./workplace";
export * from "./course";
export * from "./event";
export * from "./job";
export * from "./skill";
export * from "./userSkill";
export * from "./profile";

import { FeedPost } from "./posts";
export type { FeedPost };

export interface FeedUser {
  id: string;
  name: string;
  perfil_photo?: string;
  course_name: string;
  enrollmentYear: number;
}

export interface FeedEvent {
  id: string;
  title: string;
  local: string;
  date_start: Date;
}

export interface FeedJob {
  id: string;
  title: string;
  company?: string;
  city?: string;
  state?: string;
  work_model?: string;
}

export interface FeedResponse {
  posts: FeedPost[];
  latestUsers: FeedUser[];
  latestEvents: FeedEvent[];
  latestJobs: FeedJob[];
}
