"use client";

import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Pencil, Trash2 } from "lucide-react";
import type { ProfileSocialMedia } from "@/models/profile";
import { getSocialMediaUi } from "@/hooks/socialMedia";
import { cn } from "@/lib/utils";
import type { UpdateSocialNetworkFormValues } from "@/components/Profile/social-media/socialNetworkFormSchemas";
import { SocialNetworkTypeSelect } from "@/components/Profile/social-media/SocialNetworkTypeSelect";
import { DeleteSocialMediaConfirmationDialog } from "@/components/Profile/social-media/DeleteSocialMediaConfirmationDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BaseLabel } from "@/components/BaseLabel";
import { Spinner } from "@/components/ui/spinner";

export interface ManagedSocialNetworkRowProps {
  entry: ProfileSocialMedia;
  isEditing: boolean;
  busy: boolean;
  isDeleting: boolean;
  isUpdating: boolean;
  editForm: UseFormReturn<UpdateSocialNetworkFormValues>;
  onSubmitEdit: (values: UpdateSocialNetworkFormValues) => void | Promise<void>;
  onCancelEdit: () => void;
  onStartEdit: (entry: ProfileSocialMedia) => void;
  onConfirmDelete: (id: string) => void | Promise<void>;
}

/**
 * Uma linha no modal: pré-visualização, edição (RHF) ou confirmação de exclusão.
 */
export function ManagedSocialNetworkRow({
  entry,
  isEditing,
  busy,
  isDeleting,
  isUpdating,
  editForm,
  onSubmitEdit,
  onCancelEdit,
  onStartEdit,
  onConfirmDelete,
}: ManagedSocialNetworkRowProps) {
  const { label, Icon } = getSocialMediaUi(entry.type);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  async function handleConfirmDelete() {
    await onConfirmDelete(entry.id);
    setDeleteDialogOpen(false);
  }

  return (
    <li
      className={cn(
        "rounded-lg border border-border/60 bg-muted/15 p-3 sm:p-4",
        "shadow-sm",
      )}
    >
      <DeleteSocialMediaConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        networkLabel={label}
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
      />

      {isEditing ? (
        <form
          onSubmit={editForm.handleSubmit(onSubmitEdit)}
          className="space-y-3"
        >
          <input type="hidden" {...editForm.register("socialMediaId")} />
          <div className="space-y-1.5">
            <BaseLabel htmlFor={`edit-type-${entry.id}`}>Tipo</BaseLabel>
            <SocialNetworkTypeSelect
              control={editForm.control}
              name="media"
              id={`edit-type-${entry.id}`}
            />
            {editForm.formState.errors.media && (
              <p className="text-xs text-red-500">
                {editForm.formState.errors.media.message}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <BaseLabel htmlFor={`edit-url-${entry.id}`}>URL</BaseLabel>
            <Input
              id={`edit-url-${entry.id}`}
              {...editForm.register("url")}
              placeholder="https://"
              autoComplete="url"
              className="w-full min-w-0"
            />
            {editForm.formState.errors.url && (
              <p className="text-xs text-red-500">
                {editForm.formState.errors.url.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Button
              type="submit"
              size="sm"
              className="w-full sm:w-auto"
              disabled={busy}
            >
              {isUpdating ? <Spinner className="size-4" /> : "Salvar"}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="w-full sm:w-auto"
              disabled={busy}
              onClick={onCancelEdit}
            >
              Cancelar
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-3">
          <span
            className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary sm:size-9"
            aria-hidden
          >
            <Icon className="size-[18px] stroke-[1.75]" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">{label}</p>
            <p className="break-all text-xs text-muted-foreground sm:truncate">
              {entry.url}
            </p>
          </div>
          <div className="flex shrink-0 justify-end gap-1 sm:ml-auto">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="size-9 sm:size-8"
              aria-label={`Editar ${label}`}
              onClick={() => onStartEdit(entry)}
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="size-9 text-destructive hover:text-destructive sm:size-8"
              aria-label={`Excluir ${label}`}
              onClick={() => setDeleteDialogOpen(true)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </li>
  );
}
