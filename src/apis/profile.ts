import { apiBase } from "@/lib/axiosInstance";
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
} from "@/models/profile";

export class ProfileApi {
  static async getMyProfile(): Promise<MyProfile> {
    const response = await apiBase.get<MyProfile>("/myProfile");
    return response.data;
  }

  static async updateMyProfile(
    payload: UpdateMyProfilePayload,
  ): Promise<ProfileMutationMessage> {
    try {
      const response = await apiBase.put<ProfileMutationMessage>(
        "/myProfile",
        payload,
      );
      return response.data;
    } catch (error) {
      console.error("updateMyProfile error", error);
      throw error;
    }
  }

  static async updateProfilePhoto(
    image: File,
  ): Promise<ProfileMutationMessage> {
    try {
      const formData = new FormData();
      formData.append("image", image);
      const response = await apiBase.patch<ProfileMutationMessage>(
        "/myProfile/profilePhoto",
        formData,
      );
      return response.data;
    } catch (error) {
      console.error("updateProfilePhoto error", error);
      throw error;
    }
  }

  static async deleteMyProfile(): Promise<ProfileMutationMessage> {
    try {
      const response = await apiBase.delete<ProfileMutationMessage>(
        "/myProfile",
      );
      return response.data;
    } catch (error) {
      console.error("deleteMyProfile error", error);
      throw error;
    }
  }

  /** `POST /myProfile/job` — histórico profissional (não é vaga na plataforma). */
  static async addProfessionalHistory(
    payload: MyProfileProfessionalHistoryCreatePayload,
  ): Promise<ProfileMutationMessage> {
    try {
      const response = await apiBase.post<ProfileMutationMessage>(
        "/myProfile/job",
        payload,
      );
      return response.data;
    } catch (error) {
      console.error("addProfessionalHistory error", error);
      throw error;
    }
  }

  /** `PUT /myProfile/job` */
  static async updateProfessionalHistory(
    payload: MyProfileProfessionalHistoryUpdatePayload,
  ): Promise<ProfileMutationMessage> {
    try {
      const response = await apiBase.put<ProfileMutationMessage>(
        "/myProfile/job",
        payload,
      );
      return response.data;
    } catch (error) {
      console.error("updateProfessionalHistory error", error);
      throw error;
    }
  }

  /** `DELETE /myProfile/job` */
  static async deleteProfessionalHistory(
    payload: MyProfileProfessionalHistoryDeletePayload,
  ): Promise<ProfileMutationMessage> {
    try {
      const response = await apiBase.delete<ProfileMutationMessage>(
        "/myProfile/job",
        { data: payload },
      );
      return response.data;
    } catch (error) {
      console.error("deleteProfessionalHistory error", error);
      throw error;
    }
  }

  static async addSkill(
    payload: MyProfileSkillCreatePayload,
  ): Promise<ProfileMutationMessage> {
    try {
      const response = await apiBase.post<ProfileMutationMessage>(
        "/myProfile/skill",
        payload,
      );
      return response.data;
    } catch (error) {
      console.error("addSkill error", error);
      throw error;
    }
  }

  static async deleteSkill(
    payload: MyProfileSkillDeletePayload,
  ): Promise<ProfileMutationMessage> {
    try {
      const response = await apiBase.delete<ProfileMutationMessage>(
        "/myProfile/skill",
        { data: payload },
      );
      return response.data;
    } catch (error) {
      console.error("deleteSkill error", error);
      throw error;
    }
  }

  static async addSocialMedia(
    payload: MyProfileSocialCreatePayload,
  ): Promise<ProfileMutationMessage> {
    try {
      const response = await apiBase.post<ProfileMutationMessage>(
        "/myProfile/socialMedia",
        payload,
      );
      return response.data;
    } catch (error) {
      console.error("addSocialMedia error", error);
      throw error;
    }
  }

  static async updateSocialMedia(
    payload: MyProfileSocialUpdatePayload,
  ): Promise<ProfileMutationMessage> {
    try {
      const response = await apiBase.patch<ProfileMutationMessage>(
        "/myProfile/socialMedia",
        payload,
      );
      return response.data;
    } catch (error) {
      console.error("updateSocialMedia error", error);
      throw error;
    }
  }

  static async deleteSocialMedia(
    payload: MyProfileSocialDeletePayload,
  ): Promise<ProfileMutationMessage> {
    try {
      const response = await apiBase.delete<ProfileMutationMessage>(
        "/myProfile/socialMedia",
        { data: payload },
      );
      return response.data;
    } catch (error) {
      console.error("deleteSocialMedia error", error);
      throw error;
    }
  }
}
