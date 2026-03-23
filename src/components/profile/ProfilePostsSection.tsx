"use client";

import { useQueryClient } from "@tanstack/react-query";
import { FileText } from "lucide-react";
import { PostCard } from "@/components/Posts";
import { EmptyState } from "@/components/EmptyState";
import type { ProfilePost } from "@/models/profile";
import { useAuth } from "@/context/AuthContext";
import { usePostLikeMutation } from "@/hooks/usePost";
import { usePostCommentMutation } from "@/hooks/usePostComment";
import { PROFILE_QUERY_KEY } from "@/hooks/useProfile";

export function ProfilePostsSection({ posts }: { posts: ProfilePost[] }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { mutate } = usePostLikeMutation();
  const {
    mutate: commentMutate,
    isPending: isCommentPending,
    variables: commentVariables,
  } = usePostCommentMutation();

  const invalidateProfile = () =>
    queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });

  const onClickLike = (postId: string) => {
    if (user) {
      mutate(
        { postId, userId: user.id, userName: user.name },
        { onSettled: invalidateProfile },
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
        { onSettled: invalidateProfile },
      );
    }
  };

  const viewerName = user?.name ?? "";
  const viewerId = user?.id ?? "";

  if (posts.length === 0) {
    return (
      <section className="mt-6">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
          <FileText className="h-4 w-4" />
          Posts
        </h3>
        <EmptyState
          title="Nenhum post ainda"
          description="Seja o primeiro a compartilhar algo com a rede Alumni."
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
            key={p.post_id}
            post={{
              id: p.post_id,
              content: p.content,
              create_date: new Date(p.create_date),
              user_id: viewerId,
              user_name: viewerName,
              comments_count: p.comments_count,
              likes_count: p.likes_count,
              comments: p.comments.map((c) => ({
                id: c.comment_id,
                content: c.content,
                create_date: new Date(c.create_date),
                user_id: c.author.user_id,
                user_name: c.author.name,
                user_perfil_photo: c.author.perfil_photo ?? undefined,
              })),
              likes: p.likes.map((l) => ({
                id: l.like_id,
                create_date: new Date(l.create_date),
                user_id: l.author.user_id,
                user_name: l.author.name,
              })),
            }}
            onClickLike={() => onClickLike(p.post_id)}
            onSubmitComment={(content) => onSubmitComment(p.post_id, content)}
            isCommentPending={
              isCommentPending && commentVariables?.postId === p.post_id
            }
          />
        ))}
      </div>
    </section>
  );
}
