"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

interface CloseEventConfirmationDialogProps {
  onConfirm: () => void | Promise<void>;
  isLoading?: boolean;
}

export function CloseEventConfirmationDialog({
  onConfirm,
  isLoading,
}: CloseEventConfirmationDialogProps) {
  const [open, setOpen] = useState(false);

  async function handleConfirm() {
    await onConfirm();
    setOpen(false);
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
      >
        Encerrar evento
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Encerrar evento</DialogTitle>
            <DialogDescription>
              O evento será marcado como encerrado e não ficará mais visível
              para participantes.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="button"
              onClick={() => void handleConfirm()}
              disabled={isLoading}
            >
              {isLoading ? "Encerrando..." : "Confirmar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
