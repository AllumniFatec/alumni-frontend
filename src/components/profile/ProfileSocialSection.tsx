"use client";

import { ExternalLink, Share2 } from "lucide-react";
import type { ProfileSocialMedia } from "@/models/profile";
import { getSocialMediaUi } from "@/hooks/socialMedia";
import { cn } from "@/lib/utils";

function linkDisplayText(url: string): string {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "") + u.pathname.replace(/\/$/, "") || u.hostname;
  } catch {
    return url;
  }
}

export function ProfileSocialSection({
  socialMedia,
}: {
  socialMedia: ProfileSocialMedia[];
}) {
  if (socialMedia.length === 0) return null;

  return (
    <section className="mt-6">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <Share2 className="h-4 w-4" />
        Redes sociais
      </h3>
      <ul className="flex flex-col gap-2">
        {socialMedia.map((s) => {
          const { label, Icon } = getSocialMediaUi(s.type);
          return (
            <li key={s.id}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex items-center gap-3 rounded-xl border border-border/60 bg-card/40 p-3",
                  "transition-colors hover:border-primary/25 hover:bg-primary/[0.04]",
                )}
              >
                <span
                  className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
                  aria-hidden
                >
                  <Icon className="size-[18px] stroke-[1.75]" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{label}</p>
                  <p className="truncate text-xs text-muted-foreground group-hover:text-foreground/80">
                    {linkDisplayText(s.url)}
                  </p>
                </div>
                <ExternalLink
                  className="size-4 shrink-0 text-muted-foreground opacity-60 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
