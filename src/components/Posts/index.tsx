import React from "react";
import { Post } from "@/models/posts";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface PostCardProps {
  post?: Post;
  isLoading?: boolean;
  className?: string;
}

export const PostCard = ({
  post,
  isLoading = false,
  className = "",
}: PostCardProps) => {
  if (isLoading || !post) {
    return (
      <div
        className={cn(
          `bg-white border border-gray-200 rounded-lg p-4 shadow-sm `,
          className,
        )}
      >
        {/* Skeleton do título */}
        <Skeleton className="h-6 w-3/4 mb-2" />

        {/* Skeleton do corpo */}
        <div className="space-y-2 mb-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Skeleton do footer */}
        <div className="mt-3 pt-2 border-t border-gray-100">
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      {/* Corpo do post */}
      <p className="text-gray-700 text-sm leading-relaxed mb-3">
        {post.content}
      </p>

      {/* Footer com autor */}
      <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-400">
          {post.author ? `Por ${post.author.name}` : `Autor #${post.author_id}`}
        </span>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span>{post.likes_count} curtidas</span>
          <span>{post.comments_count} comentários</span>
        </div>
      </div>
    </div>
  );
};
