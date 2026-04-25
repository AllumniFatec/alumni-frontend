"use client";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useAddProfessionalHistory,
  useUpdateProfessionalHistory,
} from "@/hooks/useProfile";
import type { ProfileWorkplaceHistoryEntry } from "@/models/profile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BaseLabel } from "@/components/BaseLabel";
import { Spinner } from "@/components/ui/spinner";
import {
  professionalHistoryFormSchema,
  type ProfessionalHistoryFormValues,
} from "@/components/profile/workplace-history/professionalHistoryFormSchema";
import {
  dateToBrApi,
  parseProfileIsoDate,
} from "@/components/profile/workplace-history/professionalHistoryDates";
import { ProfessionalHistoryDateField } from "@/components/profile/workplace-history/ProfessionalHistoryDateField";

const defaultValues: ProfessionalHistoryFormValues = {
  company_name: "",
  position: "",
  functions: "",
  start_date: undefined,
  is_current: true,
  end_date: undefined,
};

export type ProfessionalHistoryFormDialogHandle = {
  openAdd: () => void;
  openEdit: (entry: ProfileWorkplaceHistoryEntry) => void;
  close: () => void;
};

export const ProfessionalHistoryFormDialog = forwardRef<
  ProfessionalHistoryFormDialogHandle,
  object
>(function ProfessionalHistoryFormDialog(_props, ref) {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { mutateAsync: addHistory, isPending: isAdding } =
    useAddProfessionalHistory();
  const { mutateAsync: updateHistory, isPending: isUpdating } =
    useUpdateProfessionalHistory();
  const isPending = isAdding || isUpdating;

  const form = useForm<ProfessionalHistoryFormValues>({
    resolver: zodResolver(professionalHistoryFormSchema),
    defaultValues,
  });

  const isCurrent = form.watch("is_current");

  useImperativeHandle(ref, () => ({
    openAdd: () => {
      setEditingId(null);
      form.reset(defaultValues);
      setOpen(true);
    },
    openEdit: (entry: ProfileWorkplaceHistoryEntry) => {
      setEditingId(entry.workplace_user_id);
      const start = parseProfileIsoDate(entry.start_date);
      const end = entry.end_date
        ? parseProfileIsoDate(entry.end_date)
        : undefined;
      form.reset({
        company_name: entry.workplace.company,
        position: entry.position,
        functions: entry.function,
        start_date: start,
        is_current: !entry.end_date,
        end_date: end,
      });
      setOpen(true);
    },
    close: () => setOpen(false),
  }));

  useEffect(() => {
    if (!open) {
      setEditingId(null);
    }
  }, [open]);

  async function onSubmit(values: ProfessionalHistoryFormValues) {
    const start = values.start_date;
    if (!start) return;

    const end_date = values.is_current
      ? null
      : values.end_date
        ? dateToBrApi(values.end_date)
        : null;

    const base = {
      company_name: values.company_name.trim(),
      position: values.position.trim(),
      functions: values.functions.trim(),
      start_date: dateToBrApi(start),
      end_date,
    };

    if (editingId) {
      await updateHistory({
        ...base,
        jobUserId: editingId,
      });
    } else {
      await addHistory(base);
    }
    setOpen(false);
    form.reset(defaultValues);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent showCloseButton className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-left">
            {editingId ? "Editar experiência" : "Nova experiência"}
          </DialogTitle>
          <DialogDescription className="text-left text-sm">
            Informe empresa, cargo, funções e período. Use o calendário para as
            datas.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3"
          id="professional-history-form"
        >
          <div className="space-y-1.5">
            <BaseLabel htmlFor="ph-company">Empresa</BaseLabel>
            <Input
              id="ph-company"
              {...form.register("company_name")}
              placeholder="Ex.: ACME Ltda."
              autoComplete="organization"
              className="w-full min-w-0 bg-slate-100 dark:bg-slate-800/80"
            />
            {form.formState.errors.company_name && (
              <p className="text-xs text-red-500">
                {form.formState.errors.company_name.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <BaseLabel htmlFor="ph-position">Cargo</BaseLabel>
            <Input
              id="ph-position"
              {...form.register("position")}
              placeholder="Ex.: Engenheiro de software"
              autoComplete="organization-title"
              className="w-full min-w-0 bg-slate-100 dark:bg-slate-800/80"
            />
            {form.formState.errors.position && (
              <p className="text-xs text-red-500">
                {form.formState.errors.position.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <BaseLabel htmlFor="ph-functions">Funções</BaseLabel>
            <textarea
              id="ph-functions"
              {...form.register("functions")}
              placeholder="Resumo das atividades"
              rows={3}
              className="flex min-h-[80px] w-full rounded-md border border-slate-200/90 bg-slate-100 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800/80"
            />
            {form.formState.errors.functions && (
              <p className="text-xs text-red-500">
                {form.formState.errors.functions.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Controller
              name="start_date"
              control={form.control}
              render={({ field }) => (
                <ProfessionalHistoryDateField
                  id="ph-start"
                  label="Início"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Data de início"
                  error={form.formState.errors.start_date?.message}
                />
              )}
            />
            <Controller
              name="end_date"
              control={form.control}
              render={({ field }) => (
                <ProfessionalHistoryDateField
                  id="ph-end"
                  label="Saída"
                  value={field.value ?? undefined}
                  onChange={field.onChange}
                  disabled={isCurrent}
                  placeholder="Data de saída"
                  error={form.formState.errors.end_date?.message}
                />
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="ph-current"
              className="h-4 w-4 rounded border border-input accent-primary"
              checked={isCurrent}
              onChange={(e) => {
                const checked = e.target.checked;
                form.setValue("is_current", checked, {
                  shouldValidate: true,
                });
                if (checked) {
                  form.setValue("end_date", undefined);
                }
              }}
            />
            <label
              htmlFor="ph-current"
              className="text-sm font-medium leading-none cursor-pointer"
            >
              Trabalho atual (sem data de saída)
            </label>
          </div>
        </form>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            className="sm:ml-2"
            type="submit"
            form="professional-history-form"
            disabled={isPending}
          >
            {isPending ? (
              <Spinner className="size-4" />
            ) : editingId ? (
              "Salvar"
            ) : (
              "Adicionar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
