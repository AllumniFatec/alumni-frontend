"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteJobConfirmationDialog } from "@/components/Jobs/DeleteJobConfirmationDialog";
import { useAuth } from "@/context/AuthContext";

interface CardActionsMenuProps {
  authorId: string;
  onEdit: () => void;
  onDelete: () => void | Promise<void>;
  isDeleting?: boolean;
}

export function CardActionsMenu({
  authorId,
  onEdit,
  onDelete,
  isDeleting = false,
}: CardActionsMenuProps) {
  const { user } = useAuth();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  if (!user || (user.id !== authorId && !user.admin)) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          onClick={(e) => e.preventDefault()}
          className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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

      <DeleteJobConfirmationDialog
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
