"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeletePostConfirmationDialog } from "@/components/Posts/DeletePostConfirmationDialog";
import { useCanManageContent } from "@/hooks/useCanManageContent";

interface PostCardActionsMenuProps {
  authorId: string;
  onEdit: () => void;
  onDelete: () => void | Promise<void>;
  isDeleting?: boolean;
}

export function PostCardActionsMenu({
  authorId,
  onEdit,
  onDelete,
  isDeleting = false,
}: PostCardActionsMenuProps) {
  const { canManageContent } = useCanManageContent(authorId);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  if (!canManageContent) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          type="button"
          onClick={(e) => e.preventDefault()}
          className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Ações da publicação"
        >
          <MoreHorizontal className="w-4 h-4 text-slate-500" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              onEdit();
            }}
          >
            <Pencil />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            disabled={isDeleting}
            onClick={(e) => {
              e.preventDefault();
              setIsDeleteDialogOpen(true);
            }}
          >
            <Trash2 />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeletePostConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={async () => {
          await Promise.resolve(onDelete());
          setIsDeleteDialogOpen(false);
        }}
        isLoading={isDeleting}
        trigger={null}
      />
    </>
  );
}
