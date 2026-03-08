import { UserType, Gender } from "@/models/users";

const userTypeMap: Record<UserType, string> = {
  [UserType.STUDENT]: "Student",
  [UserType.ALUMNI]: "Alumni",
  [UserType.TEACHER]: "Teacher",
  [UserType.ADMIN]: "Admin",
};

const genderMap: Record<Gender, string> = {
  [Gender.MALE]: "Male",
  [Gender.FEMALE]: "Female",
};

export function mapUserType(userType: UserType): string {
  return userTypeMap[userType];
}

export function mapGender(gender: Gender): string {
  return genderMap[gender];
}
