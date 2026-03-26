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

interface DeleteJobProps {
  onConfirm: () => void | Promise<void>;
  /**
   * Optional trigger element to open the dialog. If omitted, a default button is rendered.
   */
  trigger?: ReactNode | null;
  /**
   * Controlled open state (optional). If provided, the dialog is controlled.
   */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * Optional loading state while deletion is running.
   */
  isLoading?: boolean;
}

export function DeleteJobConfirmationDialog({
  onConfirm,
  trigger,
  open,
  onOpenChange,
  isLoading,
}: DeleteJobProps) {
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
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir esta vaga?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button
            onClick={() => void Promise.resolve(onConfirm())}
            variant={"destructive"}
            disabled={isLoading}
          >
            {isLoading ? "Excluindo..." : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
