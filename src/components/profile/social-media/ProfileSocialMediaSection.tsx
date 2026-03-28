"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";
import type { ProfileSocialMedia } from "@/models/profile";
import { useCanManageProfile } from "@/hooks/useCanManageProfile";
import { Button } from "@/components/ui/button";
import { ProfileSocialMediaManageDialog } from "@/components/profile/social-media/ProfileSocialMediaManageDialog";
import { SocialMediaPublicLinkCard } from "@/components/profile/social-media/SocialMediaPublicLinkCard";

export function ProfileSocialMediaSection({
  profileUserId,
  socialMedia,
}: {
  profileUserId: string;
  socialMedia: ProfileSocialMedia[];
}) {
  const canManage = useCanManageProfile(profileUserId);
  const [manageOpen, setManageOpen] = useState(false);

  if (socialMedia.length === 0 && !canManage) return null;

  return (
    <section className="mt-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Share2 className="h-4 w-4 shrink-0" />
          Redes sociais
        </h3>
        {canManage && (
          <Button
            type="button"
            size="sm"
            className="shrink-0"
            onClick={() => setManageOpen(true)}
          >
            Gerenciar redes
          </Button>
        )}
      </div>

      {socialMedia.length === 0 && canManage ? (
        <p className="text-sm text-muted-foreground">
          Nenhuma rede cadastrada. Use &quot;Gerenciar redes&quot; para adicionar.
        </p>
      ) : (
        <ul className="flex flex-col gap-2 sm:gap-3">
          {socialMedia.map((socialMedia) => (
            <li key={socialMedia.id}>
              <SocialMediaPublicLinkCard socialMedia={socialMedia} />
            </li>
          ))}
        </ul>
      )}

      {canManage && (
        <ProfileSocialMediaManageDialog
          open={manageOpen}
          onOpenChange={setManageOpen}
          items={socialMedia}
        />
      )}
    </section>
  );
}
