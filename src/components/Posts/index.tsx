import React from "react";
import { Post } from "@/models/posts";
import { Skeleton } from "@/components/ui/skeleton";

interface PostCardProps {
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
        className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm ${className}`}
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
      {/* Título do post */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
        {post.title}
      </h3>

      {/* Corpo do post */}
      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
        {post.body}
      </p>

      {/* Footer com ID do usuário */}
      <div className="mt-3 pt-2 border-t border-gray-100">
        <span className="text-xs text-gray-400">
          Por usuário #{post.userId}
        </span>
      </div>
    </div>
  );
};
