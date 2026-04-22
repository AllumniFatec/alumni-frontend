"use client";
import { useEffect } from "react";
import { useMembersController } from "../../members/membersController";
import { PostsSection } from "../../members/PostsSection";
import { EventsSection } from "../../members/EventsSection";
import { JobsSection } from "../../members/JobsSection";
import { useGetPostById } from "@/hooks/usePost";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PostPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { latestEvents, latestJobs, isLoading } = useMembersController();

  const { data: postData, isLoading: isLoadingPost } = useGetPostById(id);

  useEffect(() => {
    if (!isLoadingPost && !postData) {
      toast.error("Postagem nao encontrada", {
        description: "Voce foi redirecionado para o feed.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-red-500 !text-white !border-red-600 [&_[data-description]]:!text-white",
      });
      router.replace("/members");
    }
  }, [isLoadingPost, postData, router]);

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
