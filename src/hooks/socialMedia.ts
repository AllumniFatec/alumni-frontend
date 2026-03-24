import type { IconType } from "react-icons";
import { FaLinkedinIn } from "react-icons/fa";
import {
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiX,
} from "react-icons/si";
import { HiOutlineGlobeAlt } from "react-icons/hi2";
import { SocialMediaType } from "@/models/users";

export type SocialMediaUi = {
  label: string;
  Icon: IconType;
};

export const SOCIAL_MEDIA_UI: Record<SocialMediaType, SocialMediaUi> = {
  [SocialMediaType.Instagram]: {
    label: "Instagram",
    Icon: SiInstagram,
  },
  [SocialMediaType.Linkedin]: {
    label: "LinkedIn",
    Icon: FaLinkedinIn,
  },
  [SocialMediaType.Github]: {
    label: "GitHub",
    Icon: SiGithub,
  },
  [SocialMediaType.Facebook]: {
    label: "Facebook",
    Icon: SiFacebook,
  },
  [SocialMediaType.X]: {
    label: "X",
    Icon: SiX,
  },
  [SocialMediaType.Website]: {
    label: "Website",
    Icon: HiOutlineGlobeAlt,
  },
};

const KNOWN_TYPES = new Set<string>(Object.values(SocialMediaType));

export function getSocialMediaUi(type: string): SocialMediaUi {
  if (KNOWN_TYPES.has(type)) {
    return SOCIAL_MEDIA_UI[type as SocialMediaType];
  }
  return {
    label: type,
    Icon: HiOutlineGlobeAlt,
  };
}
