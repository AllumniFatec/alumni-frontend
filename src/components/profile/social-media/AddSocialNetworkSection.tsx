"use client";

import type { UseFormReturn } from "react-hook-form";
import type { CreateSocialNetworkFormValues } from "@/components/Profile/social-media/socialNetworkFormSchemas";
import { SocialNetworkTypeSelect } from "@/components/Profile/social-media/SocialNetworkTypeSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BaseLabel } from "@/components/BaseLabel";
import { Spinner } from "@/components/ui/spinner";

export interface AddSocialNetworkSectionProps {
  form: UseFormReturn<CreateSocialNetworkFormValues>;
  onSubmit: (values: CreateSocialNetworkFormValues) => void | Promise<void>;
  busy: boolean;
  isAdding: boolean;
}

/**
 * Bloco “Adicionar rede” no modal (formulário de criação).
 */
export function AddSocialNetworkSection({
  form,
  onSubmit,
  busy,
  isAdding,
}: AddSocialNetworkSectionProps) {
  return (
    <section
      aria-labelledby="add-social-network-heading"
      className="space-y-3 border-t border-border pt-4 sm:pt-5"
    >
      <div className="space-y-2">
        <h4
          id="add-social-network-heading"
          className="text-sm font-semibold text-foreground"
        >
          Adicionar rede
        </h4>
        <p className="text-xs text-muted-foreground">
          Escolha o tipo e informe a URL completa ou o domínio.
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3"
      >
        <div className="space-y-1.5">
          <BaseLabel htmlFor="add-social-type">Tipo</BaseLabel>
          <SocialNetworkTypeSelect
            control={form.control}
            name="media"
            id="add-social-type"
          />
        </div>
        <div className="space-y-1.5">
          <BaseLabel htmlFor="add-social-url">URL</BaseLabel>
          <Input
            id="add-social-url"
            {...form.register("url")}
            placeholder="https://"
            autoComplete="url"
            className="w-full min-w-0"
          />
          {form.formState.errors.url && (
            <p className="text-xs text-red-500">
              {form.formState.errors.url.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          disabled={busy}
          className="w-full sm:w-auto"
        >
          {isAdding ? <Spinner className="size-4" /> : "Adicionar"}
        </Button>
      </form>
    </section>
  );
}
