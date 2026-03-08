// Enums
export enum UserGender {
  MALE = "Male",
  FEMALE = "Female",
  OTHERS = "Others",
}

export enum UserType {
  STUDENT = "Student",
  ALUMNI = "Alumni",
  TEACHER = "Teacher",
  ADMIN = "Admin",
}

export enum Status {
  ACTIVE = "Active",
  IN_ANALYSIS = "InAnalysis",
  SUSPENDED = "Suspended",
  BANNED = "Banned",
  DELETED = "Deleted",
}

export enum SocialMediaType {
  Instagram = "Instagram",
  Linkedin = "Linkedin",
  Github = "Github",
  Facebook = "Facebook",
  X = "X",
  Website = "Website",
}

// Types
export type SocialMedia = {
  type: SocialMediaType;
  url: string;
};

export type UserCourse = {
  course_id: string;
  course_name: string;
  abbreviation: string;
  enrollmentYear: number;
};

// Interfaces
export interface User {
  user_id: string;
  name: string;
  email: string;
  password: string;
  gender: UserGender;
  biography?: string;
  perfil_photo?: string;
  receive_notifications: boolean;
  user_status: Status;
  user_type: UserType;
  social_media: SocialMedia[];
  courses: UserCourse[];
  workplace_id?: string;
  create_date: Date;
  updated_at?: Date;
  deleted_at?: Date;
  token_password_reset?: string;
  updated_password?: Date;
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
  gender: UserGender;
  user_type: UserType;
  courses: UserCourse[];
}

export interface UpdateUser {
  name?: string;
  biography?: string;
  perfil_photo?: string;
  gender?: UserGender;
  receive_notifications?: boolean;
  workplace_id?: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user?: User;
  token?: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordReset {
  token: string;
  password: string;
}
