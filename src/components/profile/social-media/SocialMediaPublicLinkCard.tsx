"use client";

import { ExternalLink } from "lucide-react";
import type { ProfileSocialMedia } from "@/models/profile";
import { getSocialMediaUi } from "@/hooks/socialMedia";
import { cn } from "@/lib/utils";
import { socialLinkDisplayUrl } from "@/components/profile/social-media/socialLinkDisplayUrl";
import Link from "next/link";

export interface SocialMediaPublicLinkCardProps {
  socialMedia: ProfileSocialMedia;
  className?: string;
}

/**
 * Cartão clicável (lista pública no perfil): ícone, rótulo do tipo e URL legível.
 */
export function SocialMediaPublicLinkCard({
  socialMedia,
  className,
}: SocialMediaPublicLinkCardProps) {
  const { label, Icon } = getSocialMediaUi(socialMedia.type);

  return (
    <Link
      href={socialMedia.url}
      className={cn(
        "group flex items-center gap-3 rounded-xl border border-border/60 bg-card/40 p-3 sm:p-3.5",
        "transition-colors hover:border-primary/25 hover:bg-primary/[0.04]",
        className,
      )}
    >
      <span
        className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
        aria-hidden
      >
        <Icon className="size-[18px]" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="truncate text-xs text-muted-foreground group-hover:text-foreground/80">
          {socialLinkDisplayUrl(socialMedia.url)}
        </p>
      </div>
      <ExternalLink
        className="size-4 shrink-0 text-muted-foreground opacity-60 transition-opacity group-hover:opacity-100"
        aria-hidden
      />
    </Link>
  );
}

