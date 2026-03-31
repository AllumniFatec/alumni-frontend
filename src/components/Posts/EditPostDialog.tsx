"use client";

import { useEffect, useState } from "react";
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
import { useUpdatePostMutation } from "@/hooks/usePost";

interface EditPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId: string;
  initialContent: string;
}

export function EditPostDialog({
  open,
  onOpenChange,
  postId,
  initialContent,
}: EditPostDialogProps) {
  const [content, setContent] = useState(initialContent);
  const { mutateAsync, isPending } = useUpdatePostMutation();

  useEffect(() => {
    if (open) setContent(initialContent);
  }, [open, initialContent]);

  const handleSubmit = async () => {
    const trimmed = content.trim();
    if (!trimmed) return;
    await mutateAsync({ post_id: postId, content: trimmed });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar publicação</DialogTitle>
          <DialogDescription>
            Altere o texto e salve para atualizar o post.
          </DialogDescription>
        </DialogHeader>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Conteúdo do post…"
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
            {isPending ? "Salvando…" : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
