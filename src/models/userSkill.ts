import { Skill } from "./skill";
import { User } from "./users";

export interface UserSkill {
  user_skill_id: string;
  user_id: string;
  skill_id: string;
  user?: User;
  skill?: Skill;
  create_date: Date;
}
