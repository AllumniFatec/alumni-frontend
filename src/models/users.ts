export enum UserType {
  STUDENT = "Aluno",
  TEACHER = "Professor",
  ALUMNI = "Egresso",
  ADMIN = "Administrador",
}

export enum Gender {
  MALE = "Masculino",
  FEMALE = "Feminino",
}
export interface User {
  id?: number;
  name: string;
  email: string;
  enrollmentYear: number;
  userType: UserType;
  course: string;
  createdAt?: string;
  gender?: Gender;
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
  enrollmentYear: number;
  userType: UserType;
  course: string;
  gender: Gender;
}
export interface LoginInUser {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}
