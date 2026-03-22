"use client";

import { Section } from "@/components/Section";
import { PostCard } from "@/components/Posts";
import { Spinner } from "@/components/ui/spinner";
import { EmptyState } from "@/components/EmptyState";
import type { FeedPost } from "@/models";
import { useAuth } from "@/context/AuthContext";
import { usePostLikeMutation } from "@/hooks/usePost";

interface PostsSectionProps {
  posts: FeedPost[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
}

export function PostsSection({
  posts,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}: PostsSectionProps) {
  const { user } = useAuth();
  const { mutate } = usePostLikeMutation();

  const onClickLike = (postId: string) => {
    if (user) {
      mutate({ postId, userId: user.id, userName: user.name });
    }
  };


  if (!isLoading && posts.length === 0) {

    return (
      <Section title="Últimos Posts">
        <EmptyState
          title="Nenhum post ainda"
          description="Seja o primeiro a compartilhar algo com a rede Alumni."
        />
      </Section>
    );
  }

  return (
    <Section title="Últimos Posts">
      <div className="bg-white rounded-xl border shadow-sm flex flex-col gap-4 p-4">
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <PostCard key={i} isLoading user={user} />
          ))}

        {posts.map((p) => (
          <PostCard
            user={user}
            key={p.id}
            post={p}
            onClickLike={ 
              () => onClickLike(p.id)
            }
          />
        ))}

        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="w-full py-3 text-sm text-slate-500 hover:text-primary transition-colors flex items-center justify-center gap-2"
          >
            {isFetchingNextPage ? (
              <Spinner className="size-4" />
            ) : (
              "Carregar mais"
            )}
          </button>
        )}
      </div>
    </Section>
  );
}
