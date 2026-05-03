"use client";

import { useEffect, useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BaseLabel } from "@/components/BaseLabel";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateMyProfile } from "@/hooks/useProfile";
import type { ProfileInformationEditable } from "@/models/profile";
import { UserGender } from "@/models/users";
import {
  profileInformationFormSchema,
  type ProfileInformationFormValues,
} from "@/components/profile/profileInformationFormSchema";

const genderOptions: { value: UserGender; label: string }[] = [
  { value: UserGender.MALE, label: "Masculino" },
  { value: UserGender.FEMALE, label: "Feminino" },
  { value: UserGender.OTHERS, label: "Outro" },
];

function profileToFormValues(
  profile: ProfileInformationEditable,
): ProfileInformationFormValues {
  const g = profile.gender;
  const gender = Object.values(UserGender).includes(g as UserGender)
    ? (g as UserGender)
    : UserGender.OTHERS;

  return {
    name: profile.name,
    gender,
    biography: profile.biography ?? "",
    receive_notifications: profile.receive_notifications,
  };
}

export function ProfileInformationEditDialog({
  profile,
  open,
  onOpenChange,
}: {
  profile: ProfileInformationEditable;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { mutateAsync, isPending } = useUpdateMyProfile();

  const form = useForm<ProfileInformationFormValues>({
    resolver: zodResolver(profileInformationFormSchema),
    defaultValues: profileToFormValues(profile),
  });

  const { reset } = form;
  const biographyFieldId = useId();

  useEffect(() => {
    if (open) {
      reset(profileToFormValues(profile));
    }
  }, [open, profile, reset]);

  async function onSubmit(values: ProfileInformationFormValues) {
    await mutateAsync({
      name: values.name,
      gender: values.gender,
      biography: values.biography,
      receive_notifications: values.receive_notifications,
    });
    onOpenChange(false);
  }

  function handleOpenChange(next: boolean) {
    if (!next && isPending) return;
    onOpenChange(next);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={!isPending} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-left">Dados pessoais</DialogTitle>
          <DialogDescription className="text-left text-sm">
            Atualize nome, gênero, biografia e preferência de notificações. O
            e-mail não pode ser alterado aqui.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3"
          id="profile-information-form"
        >
          <div className="space-y-1.5">
            <BaseLabel htmlFor="pi-name" required>
              Nome
            </BaseLabel>
            <Input
              required
              id="pi-name"
              {...form.register("name")}
              autoComplete="name"
              disabled={isPending}
              error={form.formState.errors.name?.message}
            />
          </div>

          <Controller
            control={form.control}
            name="gender"
            render={({ field }) => (
              <div className="space-y-1.5">
                <BaseLabel htmlFor="pi-gender" required>
                  Gênero
                </BaseLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isPending}
                  error={form.formState.errors.gender?.message}
                >
                  <SelectTrigger
                    id="pi-gender"
                    error={!!form.formState.errors.gender}
                  >
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {genderOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          />

          <div className="space-y-1.5">
            <BaseLabel htmlFor={biographyFieldId} optional>
              Biografia
            </BaseLabel>
            <textarea
              id={biographyFieldId}
              {...form.register("biography")}
              rows={4}
              placeholder="Conte um pouco sobre você"
              disabled={isPending}
              className="w-full min-h-[100px] resize-y rounded-lg border-0 bg-muted px-3 py-2 text-sm text-foreground placeholder:text-xs placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            />
            {form.formState.errors.biography && (
              <p className="text-xs text-red-500">
                {form.formState.errors.biography.message}
              </p>
            )}
          </div>

          <Controller
            control={form.control}
            name="receive_notifications"
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pi-notifications"
                  className="h-4 w-4 rounded border border-input accent-primary"
                  checked={field.value}
                  onChange={field.onChange}
                  disabled={isPending}
                />
                <label
                  htmlFor="pi-notifications"
                  className="cursor-pointer text-sm font-medium leading-none text-foreground"
                >
                  Receber notificações
                </label>
              </div>
            )}
          />

          <DialogFooter className="gap-2 pt-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => handleOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Spinner className="mr-2 size-4" />
                  Salvando…
                </>
              ) : (
                "Salvar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
