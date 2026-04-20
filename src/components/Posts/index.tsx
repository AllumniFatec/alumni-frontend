"use client";

import React, { useMemo, useRef, useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import type { Post as PostModel } from "@/models/posts";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AuthUser } from "@/context/AuthContext";
import { PostCardActionsMenu } from "@/components/Posts/PostCardActionsMenu";
import { EditPostDialog } from "@/components/Posts/EditPostDialog";
import { EditCommentDialog } from "@/components/Posts/EditCommentDialog";
import { PostCommentRow } from "@/components/Posts/PostCommentRow";
import {
  canUserManageContent,
  useCanManageContent,
} from "@/hooks/useCanManageContent";
import { useDeletePostMutation } from "@/hooks/usePost";
import { useDeleteCommentMutation } from "@/hooks/usePostComment";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";

export interface PostCardProps {
  user?: AuthUser | null;
  post?: PostModel;
  isLoading?: boolean;
  className?: string;
  likesCount?: number;
  commentsCount?: number;
  onClickLike?: () => void;
  /** Envia um novo comentário (feed); otimista + invalidate no hook. */
  onSubmitComment?: (content: string) => void;
  isCommentPending?: boolean;
  defaultCommentsOpen?: boolean;
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
  defaultCommentsOpen,
}: PostCardProps) => {
  const [commentsOpen, setCommentsOpen] = useState(
    defaultCommentsOpen ?? false,
  );
  const [draft, setDraft] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [editingComment, setEditingComment] = useState<{
    id: string;
    content: string;
  } | null>(null);
  const lastLikeAtRef = useRef(0);
  const { mutateAsync: deletePost, isPending: isDeletePending } =
    useDeletePostMutation();
  const {
    mutateAsync: deleteComment,
    isPending: isDeleteCommentPending,
    variables: deleteCommentVariables,
  } = useDeleteCommentMutation();

  const authorId = post?.user_id ?? "";
  const postId = post?.id ?? "";
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
      commentsCount !== undefined ? commentsCount : (post?.comments_count ?? 0),
    [commentsCount, post?.comments_count],
  );

  const authorLabel = useMemo(() => {
    if (!post) return "";
    return post.user_name ? `${post.user_name}` : `Autor #${post.user_id}`;
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
      <div className="size-80 max-h-10 max-w-80 flex items-center justify">
        <div className="size-10 rounded-full border-primary/20 bg-primary/10 flex justify-center items-center text-primary font-bold text-sm">
          {post.user_perfil_photo ? (
            <img
              src={post.user_perfil_photo}
              alt="Perfil"
              className="size-full rounded-full object-cover shadow-sm"
            />
          ) : (
            <div className="size-full rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-sm font-semibold text-white">
                {post.user_name?.[0]}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-black font-medium ml-3">
            {authorLabel}
          </span>
          <Link
            href={`/posts/${post.id}`}
            className="hover:cursor-pointer hover:underline decoration-gray-400"
          >
            <span className="text-xs text-gray-400 ml-3">
              {formatDistanceToNow(new Date(post.create_date), {
                addSuffix: true,
                locale: ptBR,
              })}
            </span>
          </Link>
        </div>
      </div>

      {canManageContent && (
        <div className="absolute top-5 right-2 z-10">
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

      <div className="mt-3 pt-2 border-t border-gray-200 flex flex-col items-end justify-center gap-3 flex-wrap">
        <p
          className={cn(
            "text-gray-700 mt-3 text-sm leading-relaxed mb-2 w-full",
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

          {onSubmitComment ? (
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

      {commentsOpen && onSubmitComment && (
        <div className="mt-3 pt-3 border-t border-gray-100 space-y-3">
          <ul className="space-y-2 max-h-48 overflow-y-auto">
            {post.comments.length === 0 ? (
              <li className="text-xs text-gray-400">
                Nenhum comentário ainda.
              </li>
            ) : (
              post.comments.map((c) => (
                <li key={c.id} className="text-sm">
                  <PostCommentRow
                    comment={c}
                    canManage={canUserManageContent(user, c.user_id)}
                    onEdit={() =>
                      setEditingComment({ id: c.id, content: c.content })
                    }
                    onDelete={async () => {
                      await deleteComment({ commentId: c.id });
                    }}
                    isDeleting={
                      isDeleteCommentPending &&
                      deleteCommentVariables?.commentId === c.id
                    }
                  />
                </li>
              ))
            )}
          </ul>

          {user && (
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
                disabled={!draft.trim() || isCommentPending}
                onClick={handleSubmitComment}
              >
                {isCommentPending ? "Enviando…" : "Comentar"}
              </Button>
            </div>
          )}

          {editingComment && (
            <EditCommentDialog
              open
              onOpenChange={(open) => {
                if (!open) setEditingComment(null);
              }}
              commentId={editingComment.id}
              initialContent={editingComment.content}
            />
          )}
        </div>
      )}
    </div>
  );
};
