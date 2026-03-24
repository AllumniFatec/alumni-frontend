"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteSocialMediaConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  networkLabel: string;
  onConfirm: () => void | Promise<void>;
  isLoading?: boolean;
}

export function DeleteSocialMediaConfirmationDialog({
  open,
  onOpenChange,
  networkLabel,
  onConfirm,
  isLoading,
}: DeleteSocialMediaConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="z-[100] w-[min(100vw-1.5rem,24rem)] sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle>Confirmar exclusão</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja remover a rede{" "}
            <span className="font-medium text-foreground">{networkLabel}</span>
            ? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading}>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            disabled={isLoading}
            onClick={() => void Promise.resolve(onConfirm())}
          >
            {isLoading ? "Excluindo..." : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
