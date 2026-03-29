"use client";

import React, { useMemo, useRef, useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import type { FeedPost, FeedPostComment, Post } from "@/models/posts";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AuthUser } from "@/context/AuthContext";
import { PostCardActionsMenu } from "@/components/Posts/PostCardActionsMenu";
import { EditPostDialog } from "@/components/Posts/EditPostDialog";
import { useCanManageContent } from "@/hooks/useCanManageContent";
import { useDeletePostMutation } from "@/hooks/usePost";

export interface PostCardProps {
  user?: AuthUser | null;
  post?: Post | FeedPost;
  isLoading?: boolean;
  className?: string;
  likesCount?: number;
  commentsCount?: number;
  onClickLike?: () => void;
  /** Envia um novo comentário (feed); otimista + invalidate no hook. */
  onSubmitComment?: (content: string) => void;
  isCommentPending?: boolean;
}

export const PostCard = ({
  user,
  post,
  isLoading = false,
  className = "",
  likesCount,
  commentsCount,
  onClickLike,
  onSubmitComment,
  isCommentPending = false,
}: PostCardProps) => {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const lastLikeAtRef = useRef(0);
  const { mutateAsync: deletePost, isPending: isDeletePending } =
    useDeletePostMutation();

  const isFeedPost = Boolean(post && "user_name" in post);

  const authorId = !post ? "" : "user_name" in post ? post.user_id : post.author_id;
  const postId = !post ? "" : "user_name" in post ? post.id : post.post_id;
  const { canManageContent } = useCanManageContent(authorId);

  const haveILiked = useMemo(() => {
    if (!post?.likes || !user?.id) return false;
    return post.likes.some((like) => like.user_id === user.id);
  }, [post?.likes, user?.id]);

  const likeCount = useMemo(
    () => (likesCount !== undefined ? likesCount : (post?.likes_count ?? 0)),
    [likesCount, post?.likes_count],
  );

  const commentCount = useMemo(
    () =>
      commentsCount !== undefined
        ? commentsCount
        : (post?.comments_count ?? 0),
    [commentsCount, post?.comments_count],
  );

  const feedComments: FeedPostComment[] = useMemo(() => {
    if (isFeedPost && post && "comments" in post) {
      return post.comments as FeedPostComment[];
    }
    return [];
  }, [isFeedPost, post]);

  const authorLabel = useMemo(() => {
    if (!post) return "";
    if ("user_name" in post) {
      return post.user_name
        ? `Por ${post.user_name}`
        : `Autor #${post.user_id}`;
    }
    return post.author
      ? `Por ${post.author.name}`
      : `Autor #${post.author_id}`;
  }, [post]);

  const handleSubmitComment = () => {
    const text = draft.trim();
    if (!text || !onSubmitComment) return;
    onSubmitComment(text);
    setDraft("");
  };

  const handleClickLike = () => {
    if (!onClickLike || !user) return;
    const now = Date.now();
    if (now - lastLikeAtRef.current < 800) return;
    lastLikeAtRef.current = now;
    onClickLike();
  };

  if (isLoading || !post) {
    return (
      <div
        className={cn(
          "bg-white border border-gray-200 rounded-lg p-4 shadow-sm",
          className,
        )}
      >
        <Skeleton className="h-6 w-3/4 mb-2" />
        <div className="space-y-2 mb-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
          <Skeleton className="h-3 w-28" />
          <div className="flex gap-3">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow",
        className,
      )}
    >
      {canManageContent && (
        <div className="absolute top-2 right-2 z-10">
          <PostCardActionsMenu
            authorId={authorId}
            onEdit={() => setEditOpen(true)}
            onDelete={async () => {
              await deletePost(postId);
            }}
            isDeleting={isDeletePending}
          />
        </div>
      )}

      <p
        className={cn(
          "text-gray-700 text-sm leading-relaxed mb-3",
          canManageContent && "pr-10",
        )}
      >
        {post.content}
      </p>

      {canManageContent && (
        <EditPostDialog
          open={editOpen}
          onOpenChange={setEditOpen}
          postId={postId}
          initialContent={post.content}
        />
      )}

      <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between gap-3 flex-wrap">
        <span className="text-xs text-gray-400">{authorLabel}</span>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 px-2 text-gray-500 hover:text-red-600"
            onClick={handleClickLike}
            disabled={!onClickLike || !user}
            aria-label="Curtir"
          >
            <Heart
              className={cn(
                "size-4 shrink-0 transition-colors",
                haveILiked
                  ? "fill-red-500 text-red-500"
                  : "fill-none text-gray-500",
              )}
              strokeWidth={haveILiked ? 0 : 2}
            />
            <span className="text-xs tabular-nums min-w-[1ch]">
              {likeCount}
            </span>
          </Button>

          {isFeedPost && onSubmitComment ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 gap-1.5 px-2 text-gray-500 hover:text-primary",
                commentsOpen && "text-primary",
              )}
              onClick={() => setCommentsOpen((prev) => !prev)}
              aria-expanded={commentsOpen}
              aria-label={`${commentCount} comentários — ${commentsOpen ? "recolher" : "ver comentários"}`}
            >
              <MessageCircle className="size-4 shrink-0" strokeWidth={2} />
              <span className="text-xs tabular-nums">{commentCount}</span>
            </Button>
          ) : (
            <div
              className="flex items-center gap-1.5 h-8 px-2 text-gray-500"
              aria-label={`${commentCount} comentários`}
            >
              <MessageCircle className="size-4 shrink-0" strokeWidth={2} />
              <span className="text-xs tabular-nums">{commentCount}</span>
            </div>
          )}
        </div>
      </div>

      {commentsOpen && isFeedPost && (
        <div className="mt-3 pt-3 border-t border-gray-100 space-y-3">
          <ul className="space-y-2 max-h-48 overflow-y-auto">
            {feedComments.length === 0 ? (
              <li className="text-xs text-gray-400">Nenhum comentário ainda.</li>
            ) : (
              feedComments.map((c) => (
                <li key={c.id} className="text-sm">
                  <span className="font-medium text-gray-800">
                    {c.user_name}
                  </span>
                  <p className="text-gray-600 leading-snug">{c.content}</p>
                </li>
              ))
            )}
          </ul>

          {user && onSubmitComment && (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Escreva um comentário…"
                rows={2}
                className="flex-1 min-h-[60px] rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                disabled={isCommentPending}
              />
              <Button
                type="button"
                size="sm"
                className="shrink-0"
                disabled={
                  !draft.trim() || isCommentPending 
                }
                onClick={handleSubmitComment}
              >
                {isCommentPending ? "Enviando…" : "Comentar"}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
