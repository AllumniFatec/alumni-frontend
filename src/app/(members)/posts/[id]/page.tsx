"use client";
import { useMembersController } from "../../members/membersController";
import { PostsSection } from "../../members/PostsSection";
import { EventsSection } from "../../members/EventsSection";
import { JobsSection } from "../../members/JobsSection";
import { useGetPostById } from "@/hooks/usePost";
import { useParams } from "next/navigation";

export default function PostPage() {
  const params = useParams();
  const id = params.id as string;

  const { latestEvents, latestJobs, isLoading } = useMembersController();

  const { data: postData, isLoading: isLoadingPost } = useGetPostById(id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8">
      <div className="space-y-4">
        <PostsSection
          posts={postData ? [postData] : []}
          isLoading={isLoadingPost}
          fetchNextPage={() => {}}
          sectionTitle="Detalhes da postagem"
          postDetails={true}
        />
      </div>

      <aside className="space-y-6">
        <EventsSection events={latestEvents} isLoading={isLoading} />
        <JobsSection jobs={latestJobs} isLoading={isLoading} />
      </aside>
    </div>
  );
}
