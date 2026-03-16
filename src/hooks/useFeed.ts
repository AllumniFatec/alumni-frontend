import { useInfiniteQuery } from "@tanstack/react-query";
import { FeedApi } from "@/apis/feed";
import { FeedPost, FeedEvent, FeedJob } from "@/models";

const FEED_PAGE_SIZE = 20;

export function useFeed() {
  const query = useInfiniteQuery({
    queryKey: ["feed"],
    queryFn: ({ pageParam = 1 }) => FeedApi.getFeed(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.posts.length === FEED_PAGE_SIZE
        ? allPages.length + 1
        : undefined,
  });

  const posts: FeedPost[] = query.data?.pages.flatMap((p) => p.posts) ?? [];
  const latestEvents: FeedEvent[] = query.data?.pages[0]?.latestEvents ?? [];
  const latestJobs: FeedJob[] = query.data?.pages[0]?.latestJobs ?? [];

  return {
    posts,
    latestEvents,
    latestJobs,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
  };
}
