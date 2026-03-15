import { useFeed } from "@/hooks/useFeed";
import { FeedPost, FeedEvent, FeedJob } from "@/models";

export interface MembersController {
  posts: FeedPost[];
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
