export interface Skill {
  skill_id: string;
  name: string;
  slug: string;
  create_date?: Date;
}

export interface CreateSkill {
  name: string;
  slug: string;
}

export interface UpdateSkill {
  name?: string;
  slug?: string;
}
