import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ProfileApi } from "@/apis/profile";
import { useAuth } from "@/context/AuthContext";
import type {
  MyProfileProfessionalHistoryCreatePayload,
  MyProfileProfessionalHistoryDeletePayload,
  MyProfileProfessionalHistoryUpdatePayload,
  MyProfileSkillCreatePayload,
  MyProfileSkillDeletePayload,
  MyProfileSocialCreatePayload,
  MyProfileSocialDeletePayload,
  MyProfileSocialUpdatePayload,
  UpdateMyProfilePayload,
} from "@/models/profile";

export const PROFILE_QUERY_KEY = ["profile", "me"] as const;

export function useMyProfile(options?: { enabled?: boolean }) {
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: () => ProfileApi.getMyProfile(),
    enabled: options?.enabled ?? true,
  });

  return { data, isLoading, isError, refetch, isFetching };
}

function useInvalidateMyProfile() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
}

export function useUpdateMyProfile() {
  const invalidate = useInvalidateMyProfile();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: UpdateMyProfilePayload) =>
      ProfileApi.updateMyProfile(payload),
    onSuccess: () => {
      invalidate();
      toast.success("Perfil atualizado", {
        description: "Suas informações foram salvas.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-green-500 !text-white !border-green-600 [&_[data-description]]:!text-white",
      });
    },
    onError: () => {
      toast.error("Algo deu errado", {
        description: "Verifique seus dados e tente novamente.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-red-500 !text-white !border-red-600 [&_[data-description]]:!text-white",
      });
    },
  });
  return { mutateAsync, isPending };
}

export function useUpdateProfilePhoto() {
  const invalidate = useInvalidateMyProfile();
  const { refreshUser } = useAuth();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (image: File) => ProfileApi.updateProfilePhoto(image),
    onSuccess: async () => {
      invalidate();
      await refreshUser();
      toast.success("Foto atualizada", {
        description: "Sua foto de perfil foi alterada.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-green-500 !text-white !border-green-600 [&_[data-description]]:!text-white",
      });
    },
    onError: () => {
      toast.error("Algo deu errado", {
        description: "Verique seus dados e tente novamente.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-red-500 !text-white !border-red-600 [&_[data-description]]:!text-white",
      });
    },
  });
  return { mutateAsync, isPending };
}

export function useDeleteMyProfile() {
  const qc = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => ProfileApi.deleteMyProfile(),
    onSuccess: () => {
      qc.removeQueries({ queryKey: PROFILE_QUERY_KEY });
      toast.success("Conta excluída", {
        description: "Seu perfil foi removido da plataforma.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-green-500 !text-white !border-green-600 [&_[data-description]]:!text-white",
      });
    },
    onError: () => {
      toast.error("Algo deu errado", {
        description: "Verique seus dados e tente novamente.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-red-500 !text-white !border-red-600 [&_[data-description]]:!text-white",
      });
    },
  });
  return { mutateAsync, isPending };
}

/** Histórico profissional (`POST /my-profile/workplace`). */
export function useAddProfessionalHistory() {
  const invalidate = useInvalidateMyProfile();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: MyProfileProfessionalHistoryCreatePayload) =>
      ProfileApi.addProfessionalHistory(payload),
    onSuccess: () => {
      invalidate();
      toast.success("Experiência adicionada", {
        description: "Seu histórico profissional foi atualizado.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-green-500 !text-white !border-green-600 [&_[data-description]]:!text-white",
      });
    },
    onError: () => {
      toast.error("Algo deu errado", {
        description: "Verique seus dados e tente novamente.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-red-500 !text-white !border-red-600 [&_[data-description]]:!text-white",
      });
    },
  });
  return { mutateAsync, isPending };
}

/** Histórico profissional (`PUT /my-profile/workplace`). */
export function useUpdateProfessionalHistory() {
  const invalidate = useInvalidateMyProfile();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: MyProfileProfessionalHistoryUpdatePayload) =>
      ProfileApi.updateProfessionalHistory(payload),
    onSuccess: () => {
      invalidate();
      toast.success("Experiência atualizada", {
        description: "Seu histórico profissional foi atualizado.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-green-500 !text-white !border-green-600 [&_[data-description]]:!text-white",
      });
    },
    onError: () => {
      toast.error("Algo deu errado", {
        description: "Verique seus dados e tente novamente.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-red-500 !text-white !border-red-600 [&_[data-description]]:!text-white",
      });
    },
  });
  return { mutateAsync, isPending };
}

/** Histórico profissional (`DELETE /my-profile/workplace`). */
export function useDeleteProfessionalHistory() {
  const invalidate = useInvalidateMyProfile();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: MyProfileProfessionalHistoryDeletePayload) =>
      ProfileApi.deleteProfessionalHistory(payload),
    onSuccess: () => {
      invalidate();
      toast.success("Experiência removida", {
        description: "O registro foi excluído do seu histórico.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-green-500 !text-white !border-green-600 [&_[data-description]]:!text-white",
      });
    },
    onError: () => {
      toast.error("Algo deu errado", {
        description: "Verique seus dados e tente novamente.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-red-500 !text-white !border-red-600 [&_[data-description]]:!text-white",
      });
    },
  });
  return { mutateAsync, isPending };
}

export function useAddProfileSkill() {
  const invalidate = useInvalidateMyProfile();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: MyProfileSkillCreatePayload) =>
      ProfileApi.addSkill(payload),
    onSuccess: () => {
      invalidate();
      toast.success("Skill adicionada", {
        description: "Sua lista de skills foi atualizada.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-green-500 !text-white !border-green-600 [&_[data-description]]:!text-white",
      });
    },
    onError: () => {
      toast.error("Algo deu errado", {
        description: "Verique seus dados e tente novamente.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-red-500 !text-white !border-red-600 [&_[data-description]]:!text-white",
      });
    },
  });
  return { mutateAsync, isPending };
}

export function useDeleteProfileSkill() {
  const invalidate = useInvalidateMyProfile();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: MyProfileSkillDeletePayload) =>
      ProfileApi.deleteSkill(payload),
    onSuccess: () => {
      invalidate();
      toast.success("Skill removida", {
        description: "Sua lista de skills foi atualizada.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-green-500 !text-white !border-green-600 [&_[data-description]]:!text-white",
      });
    },
    onError: () => {
      toast.error("Algo deu errado", {
        description: "Verique seus dados e tente novamente.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-red-500 !text-white !border-red-600 [&_[data-description]]:!text-white",
      });
    },
  });
  return { mutateAsync, isPending };
}

export function useAddProfileSocialMedia() {
  const invalidate = useInvalidateMyProfile();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: MyProfileSocialCreatePayload) =>
      ProfileApi.addSocialMedia(payload),
    onSuccess: () => {
      invalidate();
      toast.success("Rede social adicionada", {
        description: "Seu perfil foi atualizado.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-green-500 !text-white !border-green-600 [&_[data-description]]:!text-white",
      });
    },
    onError: () => {
      toast.error("Algo deu errado", {
        description: "Verique seus dados e tente novamente.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-red-500 !text-white !border-red-600 [&_[data-description]]:!text-white",
      });
    },
  });
  return { mutateAsync, isPending };
}

export function useUpdateProfileSocialMedia() {
  const invalidate = useInvalidateMyProfile();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: MyProfileSocialUpdatePayload) =>
      ProfileApi.updateSocialMedia(payload),
    onSuccess: () => {
      invalidate();
      toast.success("Rede social atualizada", {
        description: "Seu perfil foi atualizado.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-green-500 !text-white !border-green-600 [&_[data-description]]:!text-white",
      });
    },
    onError: () => {
      toast.error("Algo deu errado", {
        description: "Verique seus dados e tente novamente.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-red-500 !text-white !border-red-600 [&_[data-description]]:!text-white",
      });
    },
  });
  return { mutateAsync, isPending };
}

export function useDeleteProfileSocialMedia() {
  const invalidate = useInvalidateMyProfile();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: MyProfileSocialDeletePayload) =>
      ProfileApi.deleteSocialMedia(payload),
    onSuccess: () => {
      invalidate();
      toast.success("Rede social removida", {
        description: "Seu perfil foi atualizado.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-green-500 !text-white !border-green-600 [&_[data-description]]:!text-white",
      });
    },
    onError: () => {
      toast.error("Algo deu errado", {
        description: "Verique seus dados e tente novamente.",
        duration: 5000,
        position: "top-right",
        className:
          "!bg-red-500 !text-white !border-red-600 [&_[data-description]]:!text-white",
      });
    },
  });
  return { mutateAsync, isPending };
}
