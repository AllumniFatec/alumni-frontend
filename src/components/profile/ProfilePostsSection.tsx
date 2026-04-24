"use client";

import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { FileText } from "lucide-react";
import { PostCard } from "@/components/Posts";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { usePostLikeMutation } from "@/hooks/usePost";
import { usePostCommentMutation } from "@/hooks/usePostComment";
import {
  PROFILE_QUERY_KEY,
  PROFILE_USER_POSTS_QUERY_KEY,
  useProfilePostsByUser,
} from "@/hooks/useProfile";
import type { ProfilePostsListResponse } from "@/models/profile";

export interface ProfilePostsSectionProps {
  profileUserId: string;
  initialPosts: ProfilePostsListResponse;
  /**
   * Quando false, o empty state não sugere que o visitante publique primeiro.
   * Default: true (ex.: /profile só mostra o próprio usuário).
   */
  isOwnProfile?: boolean;
}

export function ProfilePostsSection({
  profileUserId,
  initialPosts,
  isOwnProfile = true,
}: ProfilePostsSectionProps) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProfilePostsByUser(profileUserId, initialPosts);
  const { mutate } = usePostLikeMutation();
  const {
    mutate: commentMutate,
    isPending: isCommentPending,
    variables: commentVariables,
  } = usePostCommentMutation();

  const posts = useMemo(
    () => data?.pages.flatMap((page) => page.posts) ?? initialPosts.posts,
    [data, initialPosts.posts],
  );

  const invalidateProfileData = () => {
    void queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    void queryClient.invalidateQueries({
      queryKey: PROFILE_USER_POSTS_QUERY_KEY(profileUserId),
    });
  };

  const onClickLike = (postId: string) => {
    if (user) {
      mutate(
        { postId, userId: user.id, userName: user.name },
        { onSettled: invalidateProfileData },
      );
    }
  };

  const onSubmitComment = (postId: string, content: string) => {
    if (user) {
      commentMutate(
        {
          postId,
          content,
          userId: user.id,
          userName: user.name,
        },
        { onSettled: invalidateProfileData },
      );
    }
  };

  if (posts.length === 0) {
    return (
      <section className="mt-6">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
          <FileText className="h-4 w-4" />
          Posts
        </h3>
        <EmptyState
          title="Nenhum post ainda"
          description={
            isOwnProfile
              ? "Seja o primeiro a compartilhar algo com a rede Alumni."
              : "Este perfil ainda não publicou nada na rede."
          }
        />
      </section>
    );
  }

  return (
    <section className="mt-6">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <FileText className="h-4 w-4" />
        Posts
      </h3>
      <div className="bg-white rounded-xl border shadow-sm flex flex-col gap-4 p-4">
        {posts.map((p) => (
          <PostCard
            user={user}
            key={p.id}
            post={p}
            onClickLike={() => onClickLike(p.id)}
            onSubmitComment={(content) => onSubmitComment(p.id, content)}
            isCommentPending={
              isCommentPending && commentVariables?.postId === p.id
            }
          />
        ))}
      </div>
      {hasNextPage && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Carregando..." : "Carregar mais"}
          </Button>
        </div>
      )}
    </section>
  );
}
