"use client";

import { useState } from "react";
import { PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { useCreatePostMutation } from "@/hooks/usePost";
import { cn } from "@/lib/utils";

export function CreatePostComposer({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const { mutateAsync, isPending } = useCreatePostMutation();

  const handleSubmit = async () => {
    const trimmed = content.trim();
    if (!trimmed) return;
    await mutateAsync({ content: trimmed });
    setContent("");
    setOpen(false);
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        className={cn(
          "w-full h-auto justify-start gap-3 rounded-xl border-gray-200 bg-white px-4 py-3 text-left text-sm font-normal text-muted-foreground shadow-sm transition-colors hover:border-primary/30 hover:bg-slate-50/80",
          className,
        )}
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <PenLine className="size-4" aria-hidden />
        </span>
        <span>Compartilhar algo com a rede Alumni...</span>
      </Button>

      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setContent("");
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Nova publicação</DialogTitle>
            <DialogDescription>
              Escreva a mensagem que quer partilhar com a comunidade.
            </DialogDescription>
          </DialogHeader>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="O que gostaria de partilhar?"
            disabled={isPending}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isPending}>
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="button"
              onClick={() => void handleSubmit()}
              disabled={isPending || !content.trim()}
            >
              {isPending ? "A publicar…" : "Publicar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
