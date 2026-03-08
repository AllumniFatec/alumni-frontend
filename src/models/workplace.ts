export interface Workplace {
  workplace_id: string;
  company: string;
  users_count?: number;
  create_date?: Date;
}

export interface CreateWorkplace {
  company: string;
}

export interface UpdateWorkplace {
  company?: string;
}
