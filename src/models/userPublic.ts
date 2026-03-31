import type {
  MyProfile,
  ProfileCourse,
  ProfilePhoto,
  ProfileSkillEntry,
  ProfileSocialMedia,
  ProfileWorkplaceHistoryEntry,
} from "./profile";
import type { UserGender, UserType } from "./users";

/**
 * Item de `GET /user` e `GET /user/search`.
 * Campos alinhados à API; tipos reutilizados de `./profile` onde couber.
 */
export interface PublicUserListItem {
  user_id: string;
  name: string;
  courses: ProfileCourse[];
  perfil_photo: ProfilePhoto | null;
  user_type: UserType | string;
  workplace_history: ProfileWorkplaceHistoryEntry[];
  skills?: ProfileSkillEntry[];
  gender?: UserGender | string;
  social_media?: ProfileSocialMedia[];
}

/** Resposta de `GET /user/:userId` — mesmo núcleo que `/my-profile`, sem email nem preferências. */
export type UserPublicProfileDetail = Omit<
  MyProfile,
  "email" | "receive_notifications"
>;
