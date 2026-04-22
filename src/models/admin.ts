import type { ProfileCourse } from "./profile";
import type { PublicUserListItem, UsersListResponse } from "./userPublic";
import type { UserGender, UserType } from "./users";

export enum BanReason {
  Spam = "Spam",
  Harassment = "Harassment",
  HateSpeech = "HateSpeech",
  InappropriateContent = "InappropriateContent",
  Threats = "Threats",
  Fraud = "Fraud",
  Scam = "Scam",
  Impersonation = "Impersonation",
  PrivacyViolation = "PrivacyViolation",
  UnauthorizedAdvertisement = "UnauthorizedAdvertisement",
  MaliciousLink = "MaliciousLink",
  MaliciousActivity = "MaliciousActivity",
  MultipleViolations = "MultipleViolations",
  TermsOfServiceViolation = "TermsOfServiceViolation",
  Others = "Others",
}

/** Curso na listagem de usuários em análise (subset do perfil). */
export type AdminPendingUserCourse = Pick<
  ProfileCourse,
  "course_name" | "enrollmentYear"
>;

/**
 * Linha da tabela de pendentes (`GET /admin/dashboard` → `usersInAnalysis`).
 * Payload mais estreito que `PublicUserListItem` (sem foto, histórico, etc.).
 */
export interface AdminPendingUserRow {
  user_id: string;
  name: string;
  email: string;
  student_id: string | null;
  gender: UserGender | string;
  user_type: UserType | string;
  courses: AdminPendingUserCourse[];
}

/** Resposta de `GET /admin/dashboard`. */
export interface AdminDashboardResponse {
  usersInAnalysis?: AdminPendingUserRow[];
  countUsersInAnalysis?: number;
  countUsersActive?: number;
  countJobsActive?: number;
}

export interface AdminPendingUsersPagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface AdminPendingUsersResponse {
  users: AdminPendingUserRow[];
  pagination: AdminPendingUsersPagination;
}

export interface AdminPendingUsersApiRawResponse {
  users?: AdminPendingUserRow[];
  usersInAnalysis?: AdminPendingUserRow[];
  pagination?: AdminPendingUsersPagination;
  countUsersInAnalysis?: number;
}

/** Resposta de `POST /admin/approve/:userId` e `POST /admin/refuse/:userId`. */
export interface AdminMutationMessage {
  message: string;
}

/**
 * Resposta paginada de `GET /admin/users` — mesmo envelope que `GET /user`
 * (`users` + `pagination`).
 */
export type AdminUsersListResponse = UsersListResponse;

/**
 * `GET /admin/users/search` — o backend pode devolver:
 * - `{ users, pagination }` (igual listagens paginadas);
 * - array de usuários (fallback / sem paginação), incluindo `[]` sem termo válido.
 */
export type AdminUserSearchResult = UsersListResponse | PublicUserListItem[];
