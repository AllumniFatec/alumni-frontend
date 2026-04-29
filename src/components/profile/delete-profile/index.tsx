"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
import { Input } from "@/components/ui/input";
import { useDeleteMyProfile } from "@/hooks/useProfile";
import { AppRoutes } from "@/config/routes";

const SECURITY_PHRASE = "EXCLUIR CONTA";

interface DeleteProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteProfileDialog({
  open,
  onOpenChange,
}: DeleteProfileDialogProps) {
  const router = useRouter();
  const [confirmationText, setConfirmationText] = useState("");
  const { mutateAsync: deleteMyProfile, isPending } = useDeleteMyProfile();

  const isConfirmationValid = useMemo(
    () => confirmationText.trim() === SECURITY_PHRASE,
    [confirmationText],
  );

  async function handleConfirmDelete() {
    try {
      await deleteMyProfile();
      router.replace(AppRoutes.Home);
      router.refresh();
    } catch {
      // Erro tratado no hook
    }
  }

  function handleOpenChange(nextOpen: boolean) {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      setConfirmationText("");
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Suspender conta</DialogTitle>
          <DialogDescription>
            Ao confirmar, sua conta será suspensa. Você poderá reativá-la a
            qualquer momento fazendo login novamente no sistema.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm font-semibold text-destructive">
            Para excluir sua conta, digite a frase de segurança:{" "}
            {SECURITY_PHRASE}
          </p>

          <Input
            value={confirmationText}
            onChange={(event) => setConfirmationText(event.target.value)}
            placeholder="Digite a frase de segurança"
            autoComplete="off"
            required
            className="bg-gray-200"
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={isPending}>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            onClick={() => void handleConfirmDelete()}
            disabled={!isConfirmationValid || isPending}
          >
            {isPending ? "Suspendendo..." : "Confirmar suspensão"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
