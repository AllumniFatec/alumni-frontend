import { z } from "zod";

export const professionalHistoryFormSchema = z
  .object({
    company_name: z
      .string()
      .trim()
      .min(1, "Informe o nome da empresa")
      .max(200, "Máximo de 200 caracteres"),
    position: z
      .string()
      .trim()
      .min(1, "Informe o cargo")
      .max(200, "Máximo de 200 caracteres"),
    functions: z
      .string()
      .trim()
      .min(1, "Informe as funções")
      .max(2000, "Máximo de 2000 caracteres"),
    start_date: z.date().optional(),
    is_current: z.boolean(),
    end_date: z.date().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (!data.start_date) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Selecione a data de início",
        path: ["start_date"],
      });
    }
    if (!data.is_current && !data.end_date) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Selecione a data de saída ou marque como trabalho atual",
        path: ["end_date"],
      });
    }
  });

export type ProfessionalHistoryFormValues = z.infer<
  typeof professionalHistoryFormSchema
>;
