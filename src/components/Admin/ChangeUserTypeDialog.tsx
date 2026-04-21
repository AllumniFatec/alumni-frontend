"use client";

import { useEffect, useMemo, useState } from "react";
import type { UserType } from "@/models/users";
import { mapUserType } from "@/hooks/mapUserType";
import { useChangeUserType } from "@/hooks/useAdmin";
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

export type ChangeUserTypeDialogUser = {
  user_id: string;
  name: string;
  user_type: UserType | string;
};

export function ChangeUserTypeDialog(props: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: ChangeUserTypeDialogUser | null;
}) {
  const { open, onOpenChange, user } = props;
  const mutation = useChangeUserType();

  const options = useMemo(
    () =>
      [
        "Student",
        "Alumni",
        "Teacher",
        "Admin",
      ] as const satisfies readonly UserType[],
    [],
  );

  const initialType = useMemo(() => {
    const raw = user?.user_type;
    return options.includes(raw as UserType) ? (raw as UserType) : undefined;
  }, [options, user?.user_type]);

  const [selectedType, setSelectedType] = useState<UserType | undefined>(
    initialType,
  );

  useEffect(() => {
    if (open) setSelectedType(initialType);
  }, [open, initialType]);

  function handleConfirm() {
    if (!user || !selectedType) return;
    mutation.mutate(
      { userId: user.user_id, type: selectedType },
      {
        onSuccess: () => onOpenChange(false),
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alterar tipo de usuário</DialogTitle>
          <DialogDescription>
            Deseja realmente trocar o tipo de usuário do{" "}
            <span className="font-semibold text-foreground">{user?.name}</span>?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Select
            value={selectedType}
            onValueChange={(v) => setSelectedType(v as UserType)}
            label="Novo tipo"
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um tipo" />
            </SelectTrigger>
            <SelectContent>
              {options.map((t) => (
                <SelectItem key={t} value={t}>
                  {mapUserType(t)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
            onClick={handleConfirm}
            disabled={!user || !selectedType || mutation.isPending}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

