"use client";

import type { UseFormReturn } from "react-hook-form";
import type { ProfileSocialMedia } from "@/models/profile";
import type { UpdateSocialNetworkFormValues } from "@/components/Profile/social-media/socialNetworkFormSchemas";
import { ManagedSocialNetworkRow } from "@/components/Profile/social-media/ManagedSocialNetworkRow";

interface YourSocialNetworksSectionProps {
  items: ProfileSocialMedia[];
  editingId: string | null;
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
 * Bloco “Suas redes” dentro do modal: lista com edição/remoção por item.
 */
export function YourSocialNetworksSection({
  items,
  editingId,
  busy,
  isDeleting,
  isUpdating,
  editForm,
  onSubmitEdit,
  onCancelEdit,
  onStartEdit,
  onConfirmDelete,
}: YourSocialNetworksSectionProps) {
  return (
    <section
      aria-labelledby="your-social-networks-heading"
      className="space-y-3"
    >
      <div className="space-y-2">
        <h4
          id="your-social-networks-heading"
          className="text-sm font-semibold text-foreground"
        >
          Suas redes
        </h4>
        <p className="text-xs text-muted-foreground">
          Edite ou remova cada link. As alterações são salvas ao confirmar.
        </p>
      </div>

      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border/80 bg-muted/10 px-3 py-4 text-center text-sm text-muted-foreground">
          Nenhuma rede cadastrada ainda.
        </p>
      ) : (
        <ul className="flex flex-col gap-2 sm:gap-3">
          {items.map((item) => (
            <ManagedSocialNetworkRow
              key={item.id}
              entry={item}
              isEditing={editingId === item.id}
              busy={busy}
              isDeleting={isDeleting}
              isUpdating={isUpdating}
              editForm={editForm}
              onSubmitEdit={onSubmitEdit}
              onCancelEdit={onCancelEdit}
              onStartEdit={onStartEdit}
              onConfirmDelete={onConfirmDelete}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
