export interface Course {
  course_id: string;
  name: string;
  abbreviation: string;
  create_date?: Date;
}

export interface CreateCourse {
  name: string;
  abbreviation: string;
}

export interface UpdateCourse {
  name?: string;
  abbreviation?: string;
}
