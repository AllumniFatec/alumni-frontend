"use client";

import { useEffect, useMemo, useState } from "react";
import { BaseLabel } from "@/components/BaseLabel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBanUser } from "@/hooks/useAdmin";
import { mapBanReason } from "@/hooks/mapBanReason";
import { BanReason } from "@/models/admin";
import { cn } from "@/lib/utils";

export type BanUserDialogUser = {
  user_id: string;
  name: string;
};

function validateDescription(description: string): string | null {
  const trimmed = description.trim();
  if (trimmed.length < 3) return "Descrição deve ter pelo menos 3 caracteres.";
  if (trimmed.length > 300) return "Descrição deve ter no máximo 300 caracteres.";
  return null;
}

export function BanUserDialog(props: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: BanUserDialogUser | null;
}) {
  const { open, onOpenChange, user } = props;
  const mutation = useBanUser();

  const reasons = useMemo(
    () => Object.values(BanReason) as BanReason[],
    [],
  );

  const [reason, setReason] = useState<BanReason | undefined>(undefined);
  const [description, setDescription] = useState("");
  const [touched, setTouched] = useState(false);

  const descriptionError = touched ? validateDescription(description) : null;

  useEffect(() => {
    if (!open) return;
    setReason(undefined);
    setDescription("");
    setTouched(false);
  }, [open]);

  function handleConfirm() {
    if (!user || !reason) return;
    setTouched(true);
    const err = validateDescription(description);
    if (err) return;

    mutation.mutate(
      { userId: user.user_id, reason, description: description.trim() },
      {
        onSuccess: () => onOpenChange(false),
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Banir usuário</DialogTitle>
          <DialogDescription>
            Deseja realmente banir o usuário{" "}
            <span className="font-semibold text-foreground">{user?.name}</span>?
            <br />
            <span className="text-destructive font-semibold">
              Essa ação não pode ser desfeita.
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Select
            value={reason}
            onValueChange={(v) => setReason(v as BanReason)}
            label="Motivo"
            error={!reason && touched ? "Selecione um motivo." : undefined}
          >
            <SelectTrigger error={!reason && touched}>
              <SelectValue placeholder="Selecione um motivo" />
            </SelectTrigger>
            <SelectContent>
              {reasons.map((r) => (
                <SelectItem key={r} value={r}>
                  {mapBanReason(r)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="w-full">
            <BaseLabel>Descrição</BaseLabel>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => setTouched(true)}
              rows={4}
              className={cn(
                "w-full rounded-lg bg-muted px-3 py-2 text-sm text-foreground outline-none transition-colors",
                "placeholder:text-xs placeholder:text-muted-foreground/60",
                "focus:ring-2",
                descriptionError
                  ? "focus:ring-red-500 bg-red-50 border border-red-500"
                  : "focus:ring-primary",
              )}
              placeholder="Explique o motivo do banimento (3–300 caracteres)"
            />
            <div className="mt-1 h-4">
              {descriptionError && (
                <p className="text-xs leading-none text-red-500">
                  {descriptionError}
                </p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={mutation.isPending}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={!user || mutation.isPending}
          >
            Confirmar banimento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

