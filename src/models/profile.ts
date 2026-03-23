import type { JobListItem } from "./job";
import type { Post } from "./posts";
import type { Skill } from "./skill";
import type { SocialMediaType, UserGender, UserType } from "./users";

/** Foto de perfil como retornada pelo backend (Cloudinary). */
export interface ProfilePhoto {
  url: string;
  public_id: string;
}

/** Curso no payload de GET /myProfile (sem `course_id` / `abbreviation` obrigatórios). */
export interface ProfileCourse {
  course_name: string;
  enrollmentYear: number;
}

export interface ProfileWorkplaceCompany {
  company: string;
}

/** Item de `workplace_history` em GET /myProfile. */
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
  user_skill_id?: string;
  skill: Pick<Skill, "name">;
}

export interface ProfileEventSummary {
  title: string;
  event_id: string;
  status: string;
}

/**
 * Vagas ligadas ao perfil: mesmos `title`/`status` que `JobListItem`,
 * mas o id vem como `job_id` (não `id`) e sem os demais campos da listagem pública.
 */
export type ProfileJobSummary = Pick<JobListItem, "title" | "status"> & {
  job_id: string;
};

export interface ProfilePostAuthorCourse {
  abbreviation: string;
  enrollmentYear: number;
}

export interface ProfilePostAuthor {
  user_id: string;
  name: string;
  perfil_photo: string | null;
  user_status: string;
  courses: ProfilePostAuthorCourse[];
}

export interface ProfilePostComment {
  content: string;
  comment_id: string;
  create_date: string;
  author: ProfilePostAuthor;
}

export interface ProfilePostLike {
  like_id: string;
  create_date: string;
  author: ProfilePostAuthor;
}

/**
 * Post em GET /myProfile: alinha com `Post` nos campos comuns;
 * `create_date` em string (JSON), comentários/likes com autor aninhado (≠ `Post`/`FeedPost`).
 * `post_id` é o mesmo identificador que `FeedPost.id` nas rotas de like/comentário do feed.
 */
export type ProfilePost = Pick<
  Post,
  "post_id" | "content" | "images" | "comments_count" | "likes_count"
> & {
  create_date: string;
  comments: ProfilePostComment[];
  likes: ProfilePostLike[];
};

/**
 * Resposta de GET /myProfile.
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
  jobs: ProfileJobSummary[];
  posts: ProfilePost[];
  gender: UserGender | string;
  email: string;
  receive_notifications: boolean;
}

/** Corpo de PUT /myProfile — todos opcionais para updates parciais. */
export type UpdateMyProfilePayload = Partial<
  Pick<MyProfile, "name" | "gender" | "biography" | "receive_notifications">
>;

/** POST /myProfile/job */
export interface MyProfileJobCreatePayload {
  company_name: string;
  position: string;
  functions: string;
  start_date: string;
  end_date: string | null;
}

/** PUT /myProfile/job */
export type MyProfileJobUpdatePayload = MyProfileJobCreatePayload & {
  jobUserId: string;
};

/** DELETE /myProfile/job */
export interface MyProfileJobDeletePayload {
  jobUserId: string;
}

/** POST /myProfile/skill */
export interface MyProfileSkillCreatePayload {
  skill: string;
}

/** DELETE /myProfile/skill */
export interface MyProfileSkillDeletePayload {
  user_skill_id: string;
}

/** POST /myProfile/socialMedia (`media` na API, não `type`) */
export interface MyProfileSocialCreatePayload {
  media: SocialMediaType | string;
  url: string;
}

/** PATCH /myProfile/socialMedia */
export type MyProfileSocialUpdatePayload = MyProfileSocialCreatePayload & {
  socialMediaId: string;
};

/** DELETE /myProfile/socialMedia */
export type MyProfileSocialDeletePayload = Pick<
  MyProfileSocialUpdatePayload,
  "socialMediaId"
>;

/** Respostas genéricas de mutação de perfil. */
export type ProfileMutationMessage = { message: string };
