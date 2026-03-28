import { z } from "zod";

export const addSkillSchema = z.object({
  skill: z
    .string()
    .trim()
    .min(1, "Informe o nome da skill")
    .max(120, "Máximo de 120 caracteres"),
});

export type AddSkillFormValues = z.infer<typeof addSkillSchema>;
