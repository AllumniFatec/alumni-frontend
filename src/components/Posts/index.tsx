"use client";

import React, { useMemo } from "react";
import { Heart, MessageCircle } from "lucide-react";
import type { FeedPost, FeedPostComment, Post } from "@/models/posts";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AuthUser } from "@/context/AuthContext";

export interface PostCardProps {
  user?: AuthUser | null;
  post?: Post | FeedPost;
  isLoading?: boolean;
  className?: string;
  likesCount?: number;
  commentsCount?: number;
  comments?: FeedPostComment[];
  onClickLike?: () => void;
}

export const PostCard = ({ 
  user,
  post,
  isLoading = false,
  className = "",
  likesCount,
  commentsCount,
  comments: _comments = [],
  onClickLike,
}: PostCardProps) => { 

  
  const haveILiked = useMemo(() => {
    return post?.likes.some((like) => like.user_id === user?.id);
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
        "bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow",
        className,
      )}
    >
      <p className="text-gray-700 text-sm leading-relaxed mb-3">
        {post.content}
      </p>

      <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between gap-3 flex-wrap">
        <span className="text-xs text-gray-400">
          {"user_name" in post
            ? post.user_name
              ? `Por ${post.user_name}`
              : `Autor #${post.user_id}`
            : post.author
              ? `Por ${post.author.name}`
              : `Autor #${post.author_id}`}
        </span>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 px-2 text-gray-500 hover:text-red-600"
            onClick={() => onClickLike?.()}
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

          <div
            className="flex items-center gap-1.5 h-8 px-2 text-gray-500"
            aria-label={`${commentCount} comentários`}
          >
            <MessageCircle className="size-4 shrink-0" strokeWidth={2} />
            <span className="text-xs tabular-nums">{commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
