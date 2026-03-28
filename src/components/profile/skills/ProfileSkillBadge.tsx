"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ProfileSkillBadgeProps {
  label: string;
  onRemove?: () => void;
  className?: string;
  isOwner: boolean;
}

export function ProfileSkillBadge({
  label,
  onRemove,
  className,
  isOwner = false,

}: ProfileSkillBadgeProps) {


  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-1 rounded-full border border-border/60 bg-muted/40 py-1 pl-3 text-sm text-foreground",
        isOwner ? "pr-1" : "pr-3",
        className,
      )}
    >
      <span className="min-w-0 truncate">{label}</span>
      {isOwner && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-7 shrink-0 rounded-full text-muted-foreground hover:text-foreground"
          aria-label={`Remover ${label}`}
          onClick={onRemove}
        >
          <X className="size-3.5" />
        </Button>
      )}
    </span>
  );
}
