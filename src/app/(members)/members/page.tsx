"use client";
import { useMembersController } from "./membersController";
import { PostsSection } from "./PostsSection";
import { EventsSection } from "./EventsSection";
import { JobsSection } from "./JobsSection";

export default function Members() {
  const {
    posts,
    latestEvents,
    latestJobs,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useMembersController();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8">
      <div className="space-y-4">
        <PostsSection
          posts={posts}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      </div>

      <aside className="space-y-6">
        <EventsSection events={latestEvents} isLoading={isLoading} />
        <JobsSection jobs={latestJobs} isLoading={isLoading} />
      </aside>
    </div>
  );
}
