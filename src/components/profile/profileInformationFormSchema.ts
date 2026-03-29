import { z } from "zod";
import { UserGender } from "@/models/users";

export const profileInformationFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Informe seu nome")
    .max(200, "Máximo de 200 caracteres"),
  gender: z.enum(
    [UserGender.MALE, UserGender.FEMALE, UserGender.OTHERS],
    { message: "Selecione um gênero válido" },
  ),
  biography: z
    .string()
    .max(2000, "Máximo de 2000 caracteres"),
  receive_notifications: z.boolean(),
});

export type ProfileInformationFormValues = z.infer<
  typeof profileInformationFormSchema
>;
