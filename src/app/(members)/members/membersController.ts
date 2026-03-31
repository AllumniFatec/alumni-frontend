import { useFeed } from "@/hooks/useFeed";
import type { FeedEvent, FeedJob, Post } from "@/models";

export interface MembersController {
  posts: Post[];
  latestEvents: FeedEvent[];
  latestJobs: FeedJob[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
}

export function useMembersController(): MembersController {
  return useFeed();
}
