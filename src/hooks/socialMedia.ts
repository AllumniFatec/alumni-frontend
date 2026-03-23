import type { LucideIcon } from "lucide-react";
import {
  AtSign,
  Briefcase,
  Camera,
  FolderGit2,
  Globe,
  UsersRound,
} from "lucide-react";
import { SocialMediaType } from "@/models/users";

export type SocialMediaUi = {
  label: string;
  Icon: LucideIcon;
};


export const SOCIAL_MEDIA_UI: Record<SocialMediaType, SocialMediaUi> = {
  [SocialMediaType.Instagram]: {
    label: "Instagram",
    Icon: Camera,
  },
  [SocialMediaType.Linkedin]: {
    label: "LinkedIn",
    Icon: Briefcase,
  },
  [SocialMediaType.Github]: {
    label: "GitHub",
    Icon: FolderGit2,
  },
  [SocialMediaType.Facebook]: {
    label: "Facebook",
    Icon: UsersRound,
  },
  [SocialMediaType.X]: {
    label: "X",
    Icon: AtSign,
  },
  [SocialMediaType.Website]: {
    label: "Website",
    Icon: Globe,
  },
};

const KNOWN_TYPES = new Set<string>(Object.values(SocialMediaType));

export function getSocialMediaUi(type: string): SocialMediaUi {
  if (KNOWN_TYPES.has(type)) {
    return SOCIAL_MEDIA_UI[type as SocialMediaType];
  }
  return {
    label: type,
    Icon: Globe,
  };
}
