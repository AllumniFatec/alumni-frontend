export enum EmploymentType {
  Internship = "Internship",
  Trainee = "Trainee",
  Apprentice = "Apprentice",
  CLT = "CLT",
  Contractor = "Contractor",
  Freelancer = "Freelancer",
  SelfEmployed = "SelfEmployed",
}

export const EmploymentTypeLabel: Record<EmploymentType, string> = {
  [EmploymentType.Internship]: "Estágio",
  [EmploymentType.Trainee]: "Trainee",
  [EmploymentType.Apprentice]: "Jovem Aprendiz",
  [EmploymentType.CLT]: "CLT",
  [EmploymentType.Contractor]: "PJ",
  [EmploymentType.Freelancer]: "Freelancer",
  [EmploymentType.SelfEmployed]: "Autônomo",
};

export enum SeniorityLevel {
  Internship = "Internship",
  Junior = "Junior",
  MidLevel = "MidLevel",
  Senior = "Senior",
  Specialist = "Specialist",
}

export const SeniorityLevelLabel: Record<SeniorityLevel, string> = {
  [SeniorityLevel.Internship]: "Estágio",
  [SeniorityLevel.Junior]: "Júnior",
  [SeniorityLevel.MidLevel]: "Pleno",
  [SeniorityLevel.Senior]: "Sênior",
  [SeniorityLevel.Specialist]: "Especialista",
};

export enum WorkModel {
  Remote = "Remote",
  OnSite = "OnSite",
  Hybrid = "Hybrid",
}

export const WorkModelLabel: Record<WorkModel, string> = {
  [WorkModel.Remote]: "Remoto",
  [WorkModel.OnSite]: "Presencial",
  [WorkModel.Hybrid]: "Híbrido",
};

export enum JobStatus {
  Active = "Active",
  Closed = "Closed",
}

export const JobStatusLabel: Record<JobStatus, string> = {
  [JobStatus.Active]: "Ativa",
  [JobStatus.Closed]: "Encerrada",
};

/** Shape retornado por GET /job (listagem) */
export interface JobListItem {
  id: string;
  title: string;
  workplace: string;
  city: string;
  state: string;
  author_id: string;
  employment_type: EmploymentType;
  work_model: WorkModel;
  status: string;
  create_date: string;
}

/** Metadados de paginação em GET /job */
export interface JobsPagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/** Envelope retornado por GET /job */
export interface JobsListResponse {
  jobs: JobListItem[];
  pagination: JobsPagination;
}

/** Shape retornado por GET /job/:id (detalhe) */
export interface JobDetail extends JobListItem {
  description: string;
  author_id: string;
  author_name: string;
  author_perfil_photo?: string;
  author_workplace?: string;
  author_course_abbreviation?: string;
  author_course_enrollmentYear?: number;
  country: string;
  seniority_level?: SeniorityLevel;
  url?: string;
}

/** Body para POST /job e PATCH /job/:id */
export interface JobPayload {
  title: string;
  description: string;
  city: string;
  state: string;
  country: string;
  employment_type: EmploymentType;
  seniority_level: SeniorityLevel;
  work_model: WorkModel;
  workplace_name: string;
  url?: string;
}
