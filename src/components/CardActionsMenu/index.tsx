"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";

interface CardActionsMenuProps {
  authorId: string;
  onEdit: () => void;
  onDelete: () => void;
}

export function CardActionsMenu({
  authorId,
  onEdit,
  onDelete,
}: CardActionsMenuProps) {
  const { user } = useAuth();
  console.warn("Current user in CardActionsMenu:", user);

  if (!user || (user.id !== authorId && !user.admin)) return null;

  return (
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
          onClick={(e) => {
            e.preventDefault();
            onDelete();
          }}
        >
          <Trash2 />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
