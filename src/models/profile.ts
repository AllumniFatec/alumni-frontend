import type { JobListItem } from "./job";
import type { Post } from "./posts";
import type { Skill } from "./skill";
import type { SocialMediaType, UserGender, UserType } from "./users";

/** Foto de perfil como retornada pelo backend (Cloudinary). */
export interface ProfilePhoto {
  url: string;
  public_id: string;
}

/** Curso no payload de GET /my-profile / GET /user/:id (`abbreviation` quando a API envia). */
export interface ProfileCourse {
  course_name: string;
  enrollmentYear: number;
  abbreviation?: string;
}

export interface ProfileWorkplaceCompany {
  company: string;
}

/** Item de `workplace_history` em GET /my-profile. */
export interface ProfileWorkplaceHistoryEntry {
  workplace_user_id: string;
  position: string;
  function: string;
  workplace: ProfileWorkplaceCompany;
  start_date: string;
  end_date: string | null;
}

/** Rede social persistida no perfil (inclui `id` da API). */
export interface ProfileSocialMedia {
  id: string;
  type: SocialMediaType | string;
  url: string;
}

/**
 * Skill no perfil: API devolve só `name` (sem `skill_id` / `slug`).
 * Reaproveita o modelo `Skill` via `Pick`.
 */
export interface ProfileSkillEntry {
  user_skill_id: string;
  skill: Pick<Skill, "name">;
}

export interface ProfileEventSummary {
  title: string;
  event_id: string;
  status: string;
}

/**
 * Resposta de GET /my-profile.
 * Não reutiliza `User` direto: sem senha/token e com campos e aninhamentos específicos da API.
 */
export interface MyProfile {
  user_id: string;
  perfil_photo: ProfilePhoto | null;
  name: string;
  biography: string | null;
  user_type: UserType | string;
  courses: ProfileCourse[];
  workplace_history: ProfileWorkplaceHistoryEntry[];
  social_media: ProfileSocialMedia[];
  skills: ProfileSkillEntry[];
  events: ProfileEventSummary[];
  /** Oportunidades publicadas na plataforma — mesmo shape que GET /job (listagem). */
  jobs: JobListItem[];
  /** Mesmo formato que GET /feed (`Post`). */
  posts: Post[];
  gender: UserGender | string;
  email: string;
  receive_notifications: boolean;
}

/**
 * Campos necessários para o formulário de edição (PUT /my-profile).
 * Usado por `ProfileInformationEditDialog` em vez de acoplar a `MyProfile` inteiro.
 */
export type ProfileInformationEditable = Pick<
  MyProfile,
  "name" | "gender" | "biography" | "receive_notifications"
>;

/** Constrói o payload do diálogo a partir de qualquer perfil que traga estes campos. */
export function toProfileInformationEditable(
  profile: Pick<MyProfile, "name" | "gender" | "biography"> &
    Partial<Pick<MyProfile, "receive_notifications">>,
): ProfileInformationEditable {
  return {
    name: profile.name,
    gender: profile.gender,
    biography: profile.biography ?? "",
    receive_notifications: profile.receive_notifications ?? false,
  };
}

/** Corpo de PUT /my-profile — todos opcionais para updates parciais. */
export type UpdateMyProfilePayload = Partial<
  Pick<MyProfile, "name" | "gender" | "biography" | "receive_notifications">
>;

/**
 * Corpo de `POST /my-profile/workplace` — insere um emprego no **histórico profissional**
 * (não é publicação de vaga na plataforma).
 */
export interface MyProfileProfessionalHistoryCreatePayload {
  company_name: string;
  position: string;
  functions: string;
  start_date: string;
  end_date: string | null;
}

/** Corpo de `PUT /my-profile/workplace`. */
export type MyProfileProfessionalHistoryUpdatePayload =
  MyProfileProfessionalHistoryCreatePayload & {
    jobUserId: string;
  };

/** Corpo de `DELETE /my-profile/workplace`. */
export interface MyProfileProfessionalHistoryDeletePayload {
  jobUserId: string;
}

/** POST /my-profile/skill */
export interface MyProfileSkillCreatePayload {
  skill: string;
}

/** DELETE /my-profile/skill */
export interface MyProfileSkillDeletePayload {
  user_skill_id: string;
}

/** POST /my-profile/social-media (`media` na API, não `type`) */
export interface MyProfileSocialCreatePayload {
  media: SocialMediaType | string;
  url: string;
}

/** PATCH /my-profile/social-media */
export type MyProfileSocialUpdatePayload = MyProfileSocialCreatePayload & {
  socialMediaId: string;
};

/** DELETE /my-profile/social-media */
export type MyProfileSocialDeletePayload = Pick<
  MyProfileSocialUpdatePayload,
  "socialMediaId"
>;

/** Respostas genéricas de mutação de perfil. */
export type ProfileMutationMessage = { message: string };
