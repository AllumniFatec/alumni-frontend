"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ProfileSocialMedia } from "@/models/profile";
import { SocialMediaType } from "@/models/users";
import {
  useAddProfileSocialMedia,
  useDeleteProfileSocialMedia,
  useUpdateProfileSocialMedia,
} from "@/hooks/useProfile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  createSocialNetworkSchema,
  updateSocialNetworkSchema,
  type CreateSocialNetworkFormValues,
  type UpdateSocialNetworkFormValues,
} from "@/components/profile/social-media/socialNetworkFormSchemas";
import { YourSocialNetworksSection } from "@/components/profile/social-media/YourSocialNetworksSection";
import { AddSocialNetworkSection } from "@/components/profile/social-media/AddSocialNetworkSection";

interface ProfileSocialMediaManageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: ProfileSocialMedia[];
}

export function ProfileSocialMediaManageDialog({
  open,
  onOpenChange,
  items,
}: ProfileSocialMediaManageDialogProps) {
  const { mutateAsync: addSocial, isPending: isAdding } =
    useAddProfileSocialMedia();
  const { mutateAsync: updateSocial, isPending: isUpdating } =
    useUpdateProfileSocialMedia();
  const { mutateAsync: deleteSocial, isPending: isDeleting } =
    useDeleteProfileSocialMedia();

  const [editingId, setEditingId] = useState<string | null>(null);

  const addForm = useForm<CreateSocialNetworkFormValues>({
    resolver: zodResolver(createSocialNetworkSchema),
    defaultValues: {
      media: SocialMediaType.Instagram,
      url: "",
    },
  });

  const editForm = useForm<UpdateSocialNetworkFormValues>({
    resolver: zodResolver(updateSocialNetworkSchema),
    defaultValues: {
      socialMediaId: "",
      media: SocialMediaType.Instagram,
      url: "",
    },
  });

  useEffect(() => {
    if (!open) {
      setEditingId(null);
      addForm.reset({ media: SocialMediaType.Instagram, url: "" });
      editForm.reset();
    }
  }, [open, addForm, editForm]);

  function startEdit(entry: ProfileSocialMedia) {
    setEditingId(entry.id);
    const known = Object.values(SocialMediaType) as string[];
    const media = known.includes(entry.type)
      ? (entry.type as SocialMediaType)
      : SocialMediaType.Website;
    editForm.reset({
      socialMediaId: entry.id,
      media,
      url: entry.url,
    });
  }

  async function onSubmitAdd(values: CreateSocialNetworkFormValues) {
    await addSocial({ media: values.media, url: values.url });
    addForm.reset({ media: SocialMediaType.Instagram, url: "" });
  }

  async function onSubmitEdit(values: UpdateSocialNetworkFormValues) {
    await updateSocial({
      socialMediaId: values.socialMediaId,
      media: values.media,
      url: values.url,
    });
    setEditingId(null);
    editForm.reset();
  }

  async function confirmDelete(id: string) {
    await deleteSocial({ socialMediaId: id });
    if (editingId === id) {
      setEditingId(null);
      editForm.reset();
    }
  }

  const busy = isAdding || isUpdating || isDeleting;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="
          flex max-h-[min(90dvh,720px)] w-[min(100vw-1.5rem,32rem)] flex-col
          gap-0 overflow-hidden p-0 sm:max-w-lg
        "
      >
        <DialogHeader className="shrink-0 space-y-2 border-b border-border px-4 py-4 sm:px-6 sm:py-5">
          <DialogTitle className="text-left text-lg">
            Gerenciar redes sociais
          </DialogTitle>
          <DialogDescription className="text-left text-sm">
            Adicione, edite ou remova links. As alterações são salvas ao
            confirmar cada ação.
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex flex-col gap-6 sm:gap-8">
            <YourSocialNetworksSection
              items={items}
              editingId={editingId}
              busy={busy}
              isDeleting={isDeleting}
              isUpdating={isUpdating}
              editForm={editForm}
              onSubmitEdit={onSubmitEdit}
              onCancelEdit={() => {
                setEditingId(null);
                editForm.reset();
              }}
              onStartEdit={startEdit}
              onConfirmDelete={(id) => void confirmDelete(id)}
            />

            <AddSocialNetworkSection
              form={addForm}
              onSubmit={onSubmitAdd}
              busy={busy}
              isAdding={isAdding}
            />
          </div>
        </div>

        <DialogFooter className="shrink-0 border-t border-border px-4 py-3 sm:px-6 sm:py-4">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => onOpenChange(false)}
          >
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
