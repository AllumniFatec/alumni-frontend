import { UserType, UserGender, Status, SocialMediaType } from "@/models/users";

const userTypeMap: Record<UserType, string> = {
  [UserType.STUDENT]: "Aluno",
  [UserType.ALUMNI]: "Egresso",
  [UserType.TEACHER]: "Professor",
  [UserType.ADMIN]: "Administrador",
};

const genderMap: Record<UserGender, string> = {
  [UserGender.MALE]: "Masculino",
  [UserGender.FEMALE]: "Feminino",
  [UserGender.OTHERS]: "Outros",
};

const statusMap: Record<Status, string> = {
  [Status.ACTIVE]: "Ativo",
  [Status.IN_ANALYSIS]: "Em Análise",
  [Status.SUSPENDED]: "Suspenso",
  [Status.BANNED]: "Banido",
  [Status.DELETED]: "Deletado",
};

const socialMediaTypeMap: Record<SocialMediaType, string> = {
  [SocialMediaType.Instagram]: "Instagram",
  [SocialMediaType.Linkedin]: "LinkedIn",
  [SocialMediaType.Github]: "GitHub",
  [SocialMediaType.Facebook]: "Facebook",
  [SocialMediaType.X]: "X",
  [SocialMediaType.Website]: "Website",
};

export function mapUserType(userType: UserType): string {
  return userTypeMap[userType];
}

export function mapGender(gender: UserGender): string {
  return genderMap[gender];
}

export function mapStatus(status: Status): string {
  return statusMap[status];
}

export function mapSocialMediaType(type: SocialMediaType): string {
  return socialMediaTypeMap[type];
}
