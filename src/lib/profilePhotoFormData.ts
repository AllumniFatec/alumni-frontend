import type { UpdateProfilePhotoPayload } from "@/models/profile";

/** Corpo `multipart/form-data` esperado por `PATCH /my-profile/profile-photo` (campo `image`). */
export function toProfilePhotoFormData(
  payload: UpdateProfilePhotoPayload,
): FormData {
  const formData = new FormData();
  formData.append("image", payload.image);
  return formData;
}
