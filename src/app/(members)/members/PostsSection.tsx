import { useMemo } from "react";
import { Section } from "@/components/Section";
import { PostCard } from "@/components/Posts";
import { Spinner } from "@/components/ui/spinner";
import { EmptyState } from "@/components/EmptyState";
import { FeedPost, Post, PostStatus } from "@/models";

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
  const mappedPosts = useMemo<Post[]>(
    () =>
      posts.map((post) => ({
        post_id: post.id,
        content: post.content,
        likes_count: post.likes_count,
        comments_count: post.comments_count,
        author_id: post.user_id,
        author: {
          name: post.user_name,
          perfil_photo: post.user_perfil_photo,
        },
        images: [],
        status: PostStatus.ACTIVE,
        likes: [],
        comments: [],
        create_date: new Date(post.create_date),
      })),
    [posts],
  );

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
            <PostCard key={i} isLoading />
          ))}

        {mappedPosts.map((post) => (
          <PostCard key={post.post_id} post={post} />
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
