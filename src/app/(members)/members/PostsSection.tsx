"use client";

import { Section } from "@/components/Section";
import { PostCard } from "@/components/Posts";
import { CreatePostComposer } from "@/components/Posts/CreatePostComposer";
import { Spinner } from "@/components/ui/spinner";
import { EmptyState } from "@/components/EmptyState";
import type { Post } from "@/models";
import { useAuth } from "@/context/AuthContext";
import { usePostLikeMutation } from "@/hooks/usePost";
import { usePostCommentMutation } from "@/hooks/usePostComment";

interface PostsSectionProps {
  posts: Post[];
  isLoading: boolean;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean | undefined;
  fetchNextPage: () => void;
  /** Título da secção (ex.: página dedicada de posts). */
  sectionTitle?: string;
  postDetails?: boolean;
}

export function PostsSection({
  posts,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  sectionTitle = "Últimos Posts",
  postDetails,
}: PostsSectionProps) {
  const { user } = useAuth();
  const { mutate } = usePostLikeMutation();
  const {
    mutate: commentMutate,
    isPending: isCommentPending,
    variables: commentVariables,
  } = usePostCommentMutation();

  const onClickLike = (postId: string) => {
    if (user) {
      mutate({ postId, userId: user.id, userName: user.name });
    }
  };

  const onSubmitComment = (postId: string, content: string) => {
    if (user) {
      commentMutate({
        postId,
        content,
        userId: user.id,
        userName: user.name,
      });
    }
  };

  return (
    <Section title={sectionTitle}>
      <div className="bg-white rounded-xl border shadow-sm flex flex-col gap-4 p-4">
        {postDetails ?? <CreatePostComposer />}

        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <PostCard key={i} isLoading user={user} />
          ))}

        {!isLoading && posts.length === 0 && (
          <EmptyState
            title="Nenhum post ainda"
            description="Seja o primeiro a compartilhar algo com a rede Alumni."
          />
        )}

        {!isLoading &&
          posts.map((p) => (
            <PostCard
              user={user}
              key={p.id}
              post={p}
              onClickLike={() => onClickLike(p.id)}
              onSubmitComment={(content) => onSubmitComment(p.id, content)}
              isCommentPending={
                isCommentPending && commentVariables?.postId === p.id
              }
              defaultCommentsOpen={postDetails}
            />
          ))}

        {!isLoading && hasNextPage && (
          <button
            type="button"
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
