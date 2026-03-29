"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

interface DeletePostConfirmationDialogProps {
  onConfirm: () => void | Promise<void>;
  trigger?: ReactNode | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  isLoading?: boolean;
}

export function DeletePostConfirmationDialog({
  onConfirm,
  trigger,
  open,
  onOpenChange,
  isLoading,
}: DeletePostConfirmationDialogProps) {
  const dialogProps: Partial<React.ComponentProps<typeof Dialog>> = {};
  if (open !== undefined) dialogProps.open = open;
  if (onOpenChange) dialogProps.onOpenChange = onOpenChange;

  const renderTrigger = trigger !== null;
  const hasCustomTrigger = trigger !== undefined && trigger !== null;

  return (
    <Dialog {...dialogProps}>
      {renderTrigger &&
        (hasCustomTrigger ? (
          <DialogTrigger asChild>{trigger}</DialogTrigger>
        ) : (
          <DialogTrigger asChild>
            <Button variant="destructive">Excluir</Button>
          </DialogTrigger>
        ))}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar exclusão</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir esta publicação?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button
            onClick={() => void Promise.resolve(onConfirm())}
            variant="destructive"
            disabled={isLoading}
          >
            {isLoading ? "Excluindo…" : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
