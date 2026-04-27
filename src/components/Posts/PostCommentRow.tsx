"use client";

import type { PostComment } from "@/models/posts";
import { cn } from "@/lib/utils";
import { PostCardActionsMenu } from "@/components/Posts/PostCardActionsMenu";
import Link from "next/link";

export interface PostCommentRowProps {
  comment: PostComment;
  canManage: boolean;
  onEdit: () => void;
  onDelete: () => void | Promise<void>;
  isDeleting?: boolean;
}

export function PostCommentRow({
  comment: c,
  canManage,
  onEdit,
  onDelete,
  isDeleting = false,
}: PostCommentRowProps) {
  return (
    <div className="flex w-full min-w-0 items-start gap-3 mb-3">
      <div className="size-10 shrink-0 rounded-full border-primary/20 bg-primary/10 flex justify-center items-center text-primary font-bold text-sm">
        {c.user_perfil_photo ? (
          <Link
            href={`/profile/${c.user_id}`}
            className="hover:cursor-pointer hover:underline"
          >
            <img
              src={c.user_perfil_photo}
              alt="Perfil"
              className="size-full rounded-full object-cover shadow-sm"
            />
          </Link>
        ) : (
          <Link
            href={`/profile/${c.user_id}`}
            className="hover:cursor-pointer hover:underline"
          >
            <div className="size-full rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-sm font-semibold text-white">
                {c.user_name?.[0]}
              </span>
            </div>
          </Link>
        )}
      </div>
      <div
        className={cn(
          "min-w-0 flex-1 flex flex-col bg-gray-100 rounded-md p-2 relative",
          canManage && "pr-9",
        )}
      >
        {canManage && (
          <div className="absolute top-1 right-1 z-10">
            <PostCardActionsMenu
              authorId={c.user_id}
              onEdit={onEdit}
              onDelete={onDelete}
              isDeleting={isDeleting}
              triggerAriaLabel="Ações do comentário"
              deleteDialogDescription="Tem certeza que deseja excluir este comentário?"
            />
          </div>
        )}
        <Link
          href={`/profile/${c.user_id}`}
          className="hover:cursor-pointer hover:underline"
        >
          <span className="font-medium text-gray-800">{c.user_name}</span>
        </Link>
        <p className="text-gray-600 leading-snug break-words">{c.content}</p>
      </div>
    </div>
  );
}
