import { apiBase } from "@/lib/axiosInstance";
import { toProfilePhotoFormData } from "@/lib/profilePhotoFormData";
import type {
  MyProfile,
  MyProfileProfessionalHistoryCreatePayload,
  MyProfileProfessionalHistoryDeletePayload,
  MyProfileProfessionalHistoryUpdatePayload,
  MyProfileSkillCreatePayload,
  MyProfileSkillDeletePayload,
  MyProfileSocialCreatePayload,
  MyProfileSocialDeletePayload,
  MyProfileSocialUpdatePayload,
  ProfileMutationMessage,
  UpdateMyProfilePayload,
  UpdateProfilePhotoPayload,
} from "@/models/profile";

export class ProfileApi {
  static async getMyProfile(): Promise<MyProfile> {
    const response = await apiBase.get<MyProfile>("/my-profile");
    return response.data;
  }

  static async updateMyProfile(
    payload: UpdateMyProfilePayload,
  ): Promise<ProfileMutationMessage> {
    try {
      const response = await apiBase.put<ProfileMutationMessage>(
        "/my-profile",
        payload,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateProfilePhoto(
    payload: UpdateProfilePhotoPayload,
  ): Promise<ProfileMutationMessage> {
    try {
      const response = await apiBase.patch<ProfileMutationMessage>(
        "/my-profile/profile-photo",
        toProfilePhotoFormData(payload),
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteMyProfile(): Promise<ProfileMutationMessage> {
    try {
      const response =
        await apiBase.delete<ProfileMutationMessage>("/my-profile");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /** `POST /my-profile/workplace` — histórico profissional (não é vaga na plataforma). */
  static async addProfessionalHistory(
    payload: MyProfileProfessionalHistoryCreatePayload,
  ): Promise<ProfileMutationMessage> {
    try {
      const response = await apiBase.post<ProfileMutationMessage>(
        "/my-profile/workplace",
        payload,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /** `PUT /my-profile/workplace` */
  static async updateProfessionalHistory(
    payload: MyProfileProfessionalHistoryUpdatePayload,
  ): Promise<ProfileMutationMessage> {
    try {
      const response = await apiBase.put<ProfileMutationMessage>(
        "/my-profile/workplace",
        payload,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /** `DELETE /my-profile/workplace` */
  static async deleteProfessionalHistory(
    payload: MyProfileProfessionalHistoryDeletePayload,
  ): Promise<ProfileMutationMessage> {
    try {
      const response = await apiBase.delete<ProfileMutationMessage>(
        "/my-profile/workplace",
        { data: payload },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async addSkill(
    payload: MyProfileSkillCreatePayload,
  ): Promise<ProfileMutationMessage> {
    try {
      const response = await apiBase.post<ProfileMutationMessage>(
        "/my-profile/skill",
        payload,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteSkill(
    payload: MyProfileSkillDeletePayload,
  ): Promise<ProfileMutationMessage> {
    try {
      const response = await apiBase.delete<ProfileMutationMessage>(
        "/my-profile/skill",
        { data: payload },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async addSocialMedia(
    payload: MyProfileSocialCreatePayload,
  ): Promise<ProfileMutationMessage> {
    try {
      const response = await apiBase.post<ProfileMutationMessage>(
        "/my-profile/social-media",
        payload,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateSocialMedia(
    payload: MyProfileSocialUpdatePayload,
  ): Promise<ProfileMutationMessage> {
    try {
      const response = await apiBase.patch<ProfileMutationMessage>(
        "/my-profile/social-media",
        payload,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteSocialMedia(
    payload: MyProfileSocialDeletePayload,
  ): Promise<ProfileMutationMessage> {
    try {
      const response = await apiBase.delete<ProfileMutationMessage>(
        "/my-profile/social-media",
        { data: payload },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
