"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteProfessionalHistoryConfirmationDialog } from "@/components/profile/workplace-history/DeleteProfessionalHistoryConfirmationDialog";
import { useDeleteProfessionalHistory } from "@/hooks/useProfile";
import type { ProfileWorkplaceHistoryEntry } from "@/models/profile";

interface WorkplaceHistoryCardActionsMenuProps {
  entry: ProfileWorkplaceHistoryEntry;
  onEdit: () => void;
}

export function WorkplaceHistoryCardActionsMenu({
  entry,
  onEdit,
}: WorkplaceHistoryCardActionsMenuProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { mutateAsync: deleteHistory, isPending } = useDeleteProfessionalHistory();

  async function handleConfirmDelete() {
    await deleteHistory({ jobUserId: entry.workplace_user_id });
    setIsDeleteDialogOpen(false);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          type="button"
          onClick={(e) => e.preventDefault()}
          className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Ações da experiência"
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
            disabled={isPending}
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

      <DeleteProfessionalHistoryConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        companyLabel={entry.workplace.company}
        onConfirm={handleConfirmDelete}
        isLoading={isPending}
      />
    </>
  );
}
