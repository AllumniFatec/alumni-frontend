import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProfileApi } from "@/apis/profile";
import type {
  MyProfileJobCreatePayload,
  MyProfileJobDeletePayload,
  MyProfileJobUpdatePayload,
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
    onSuccess: () => invalidate(),
  });
  return { mutateAsync, isPending };
}

export function useUpdateProfilePhoto() {
  const invalidate = useInvalidateMyProfile();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (image: File) => ProfileApi.updateProfilePhoto(image),
    onSuccess: () => invalidate(),
  });
  return { mutateAsync, isPending };
}

export function useDeleteMyProfile() {
  const qc = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => ProfileApi.deleteMyProfile(),
    onSuccess: () => {
      qc.removeQueries({ queryKey: PROFILE_QUERY_KEY });
    },
  });
  return { mutateAsync, isPending };
}

export function useAddWorkplaceJob() {
  const invalidate = useInvalidateMyProfile();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: MyProfileJobCreatePayload) =>
      ProfileApi.addWorkplaceJob(payload),
    onSuccess: () => invalidate(),
  });
  return { mutateAsync, isPending };
}

export function useUpdateWorkplaceJob() {
  const invalidate = useInvalidateMyProfile();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: MyProfileJobUpdatePayload) =>
      ProfileApi.updateWorkplaceJob(payload),
    onSuccess: () => invalidate(),
  });
  return { mutateAsync, isPending };
}

export function useDeleteWorkplaceJob() {
  const invalidate = useInvalidateMyProfile();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: MyProfileJobDeletePayload) =>
      ProfileApi.deleteWorkplaceJob(payload),
    onSuccess: () => invalidate(),
  });
  return { mutateAsync, isPending };
}

export function useAddProfileSkill() {
  const invalidate = useInvalidateMyProfile();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: MyProfileSkillCreatePayload) =>
      ProfileApi.addSkill(payload),
    onSuccess: () => invalidate(),
  });
  return { mutateAsync, isPending };
}

export function useDeleteProfileSkill() {
  const invalidate = useInvalidateMyProfile();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: MyProfileSkillDeletePayload) =>
      ProfileApi.deleteSkill(payload),
    onSuccess: () => invalidate(),
  });
  return { mutateAsync, isPending };
}

export function useAddProfileSocialMedia() {
  const invalidate = useInvalidateMyProfile();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: MyProfileSocialCreatePayload) =>
      ProfileApi.addSocialMedia(payload),
    onSuccess: () => invalidate(),
  });
  return { mutateAsync, isPending };
}

export function useUpdateProfileSocialMedia() {
  const invalidate = useInvalidateMyProfile();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: MyProfileSocialUpdatePayload) =>
      ProfileApi.updateSocialMedia(payload),
    onSuccess: () => invalidate(),
  });
  return { mutateAsync, isPending };
}

export function useDeleteProfileSocialMedia() {
  const invalidate = useInvalidateMyProfile();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: MyProfileSocialDeletePayload) =>
      ProfileApi.deleteSocialMedia(payload),
    onSuccess: () => invalidate(),
  });
  return { mutateAsync, isPending };
}
