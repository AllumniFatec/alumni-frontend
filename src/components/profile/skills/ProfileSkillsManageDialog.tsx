"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddProfileSkill } from "@/hooks/useProfile";
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
  addSkillSchema,
  type AddSkillFormValues,
} from "@/components/profile/skills/skillFormSchema";

export type ProfileSkillsManageDialogHandle = {
  open: () => void;
  close: () => void;
};

export const ProfileSkillsManageDialog = forwardRef<
  ProfileSkillsManageDialogHandle,
  object
>(function ProfileSkillsManageDialog(_props, ref) {
  const [open, setOpen] = useState(false);
  const { mutateAsync: addSkill, isPending } = useAddProfileSkill();

  const form = useForm<AddSkillFormValues>({
    resolver: zodResolver(addSkillSchema),
    defaultValues: { skill: "" },
  });

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  useEffect(() => {
    if (!open) {
      form.reset({ skill: "" });
    }
  }, [open, form]);

  async function onSubmit(values: AddSkillFormValues) {
    await addSkill({ skill: values.skill });
    form.reset({ skill: "" });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent showCloseButton className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-left">Adicionar skill</DialogTitle>
          <DialogDescription className="text-left text-sm">
            Informe o nome da competência (ex.: Python, C#, AutoCAD). Para
            remover uma skill, use o ícone ao lado dela na lista do perfil.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3"
          id="profile-skills-add-form"
        >
          <div className="space-y-1.5">
            <BaseLabel htmlFor="profile-skill-name">Skill</BaseLabel>
            <Input
              id="profile-skill-name"
              {...form.register("skill")}
              placeholder="Ex.: Python"
              autoComplete="off"
              className="w-full min-w-0"
            />
            {form.formState.errors.skill && (
              <p className="text-xs text-red-500">
                {form.formState.errors.skill.message}
              </p>
            )}
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
            type="submit"
            form="profile-skills-add-form"
            disabled={isPending}
          >
            {isPending ? <Spinner className="size-4" /> : "Adicionar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
