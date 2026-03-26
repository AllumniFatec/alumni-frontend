import { z } from "zod";
import { SocialMediaType } from "@/models/users";

const urlField = z
  .string()
  .trim()
  .min(1, "Informe a URL")
  .transform((s) => (/^https?:\/\//i.test(s) ? s : `https://${s}`))
  .pipe(z.string().url("URL inválida"));

export const createSocialNetworkSchema = z.object({
  media: z.nativeEnum(SocialMediaType),
  url: urlField,
});

export const updateSocialNetworkSchema = createSocialNetworkSchema.extend({
  socialMediaId: z.string().min(1),
});

export type CreateSocialNetworkFormValues = z.infer<
  typeof createSocialNetworkSchema
>;
export type UpdateSocialNetworkFormValues = z.infer<
  typeof updateSocialNetworkSchema
>;
