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
  /** Texto do diálogo de exclusão (padrão: publicação). */
  deleteDialogTitle?: string;
  deleteDialogDescription?: string;
  /** Rótulo de acessibilidade do botão “⋯”. */
  triggerAriaLabel?: string;
}

export function PostCardActionsMenu({
  authorId,
  onEdit,
  onDelete,
  isDeleting = false,
  deleteDialogTitle,
  deleteDialogDescription,
  triggerAriaLabel = "Ações da publicação",
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
          aria-label={triggerAriaLabel}
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
        title={deleteDialogTitle}
        description={deleteDialogDescription}
      />
    </>
  );
}
