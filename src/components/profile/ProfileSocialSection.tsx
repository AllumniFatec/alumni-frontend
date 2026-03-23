"use client";

import type { ProfileSocialMedia } from "@/models/profile";

export function ProfileSocialSection({
  socialMedia,
}: {
  socialMedia: ProfileSocialMedia[];
}) {
  if (socialMedia.length === 0) return null;

  return (
    <section className="mt-6">
      <h3 className="mb-3 text-sm font-semibold text-foreground">
        Redes sociais
      </h3>
      <ul className="space-y-2">
        {socialMedia.map((s) => (
          <li key={s.id} className="text-sm">
            <span className="font-medium text-foreground">{s.type}:</span>{" "}
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-2 hover:underline break-all"
            >
              {s.url}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
