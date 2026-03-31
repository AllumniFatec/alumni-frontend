"use client";

import { PostsSection } from "@/app/(members)/members/PostsSection";
import { useFeed } from "@/hooks/useFeed";

export default function PostsPage() {
  const {
    posts,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useFeed();

  return (
    <div>
      <PostsSection
        posts={posts}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        sectionTitle="Publicações da Rede"
      />
    </div>
  );
}
