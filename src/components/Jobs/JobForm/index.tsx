"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import {
  EmploymentType,
  EmploymentTypeLabel,
  SeniorityLevel,
  SeniorityLevelLabel,
  WorkModel,
  WorkModelLabel,
} from "@/models/job";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BaseLabel } from "@/components/BaseLabel";
import { Spinner } from "@/components/ui/spinner";

const jobSchema = z.object({
  title: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
  description: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(3500, "Descrição deve ter no máximo 3500 caracteres"),
  workplace_name: z.string().min(2, "Nome da empresa é obrigatório"),
  city: z.string().min(2, "Cidade é obrigatória"),
  state: z.string().min(2, "Estado é obrigatório"),
  country: z.string().min(2, "País é obrigatório"),
  employment_type: z.nativeEnum(EmploymentType, {
    error: "Tipo de contratação é obrigatório",
  }),
  seniority_level: z.nativeEnum(SeniorityLevel, {
    error: "Nível de senioridade é obrigatório",
  }),
  work_model: z.nativeEnum(WorkModel, {
    error: "Modelo de trabalho é obrigatório",
  }),
  url: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),
});

export type JobFormValues = z.infer<typeof jobSchema>;

interface JobFormProps {
  defaultValues?: Partial<JobFormValues>;
  onSubmit: (data: JobFormValues) => void;
  isLoading?: boolean;
  submitLabel?: string;
}

export function JobForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel = "Publicar",
}: JobFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      country: "Brasil",
      ...defaultValues,
      // url: defaultValues?.url ?? undefined,
    },
  });

  const descriptionLength = watch("description")?.length ?? 0;

  const [cep, setCep] = useState("");
  const [isFetchingCep, setIsFetchingCep] = useState(false);
  const [cepError, setCepError] = useState<string | null>(null);

  async function handleCepChange(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    setCep(digits);
    setCepError(null);

    if (digits.length !== 8) return;

    setIsFetchingCep(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await res.json();

      if (data.erro) {
        setCepError("CEP não encontrado.");
        return;
      }

      setValue("city", data.localidade, { shouldValidate: true });
      setValue("state", data.uf, { shouldValidate: true });
      setValue("country", "Brasil", { shouldValidate: true });
    } catch {
      setCepError("Erro ao buscar o CEP. Verifique sua conexão.");
    } finally {
      setIsFetchingCep(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          required
          label="Título da vaga"
          placeholder="Ex: Desenvolvedor Frontend"
          error={errors.title?.message}
          {...register("title")}
        />
        <Input
          required
          label="Empresa"
          placeholder="Nome exato da empresa cadastrada no sistema"
          error={errors.workplace_name?.message}
          {...register("workplace_name")}
        />
      </div>

      <div className="space-y-1">
        <BaseLabel>Descrição</BaseLabel>
        <textarea
          required
          className="w-full min-h-[140px] px-3 py-2 border-0 rounded-lg text-sm text-foreground bg-muted focus:outline-none focus:ring-2 focus:ring-primary resize-y"
          placeholder="Descreva a vaga, responsabilidades e requisitos..."
          maxLength={3500}
          {...register("description")}
        />
        <div className="flex justify-between items-center h-4">
          {errors.description?.message ? (
            <p className="text-red-500 text-xs">{errors.description.message}</p>
          ) : (
            <span />
          )}
          <span className="text-xs text-slate-400">
            {descriptionLength}/3500
          </span>
        </div>
      </div>

      <Input
        label="URL da vaga (opcional)"
        placeholder="https://exemplo.com/vaga"
        error={errors.url?.message}
        {...register("url")}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Controller
          control={control}
          name="employment_type"
          render={({ field }) => (
            <Select
              required
              value={field.value}
              onValueChange={field.onChange}
              label="Tipo de contratação"
              error={errors.employment_type?.message}
            >
              <SelectTrigger error={!!errors.employment_type}>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                {Object.values(EmploymentType).map((v) => (
                  <SelectItem key={v} value={v}>
                    {EmploymentTypeLabel[v]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        <Controller
          control={control}
          name="seniority_level"
          render={({ field }) => (
            <Select
              required
              value={field.value}
              onValueChange={field.onChange}
              label="Nível de senioridade"
              error={errors.seniority_level?.message}
            >
              <SelectTrigger error={!!errors.seniority_level}>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                {Object.values(SeniorityLevel).map((v) => (
                  <SelectItem key={v} value={v}>
                    {SeniorityLevelLabel[v]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        <Controller
          control={control}
          name="work_model"
          render={({ field }) => (
            <Select
              required
              value={field.value}
              onValueChange={field.onChange}
              label="Modelo de trabalho"
              error={errors.work_model?.message}
            >
              <SelectTrigger error={!!errors.work_model}>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                {Object.values(WorkModel).map((v) => (
                  <SelectItem key={v} value={v}>
                    {WorkModelLabel[v]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-1">
          <BaseLabel>CEP</BaseLabel>
          <div className="relative">
            <Input
              tooltip="O CEP é preenchido automaticamente ao digitar o número. Caso não seja preenchido, é necessário digitar manualmente."
              type="text"
              inputMode="numeric"
              maxLength={9}
              value={cep.replace(/(\d{5})(\d{1,3})/, "$1-$2")}
              onChange={(e) => handleCepChange(e.target.value)}
              placeholder="00000-000"
              className="w-full h-10 px-3 py-2 border-0 rounded-lg text-sm text-foreground bg-muted focus:outline-none focus:ring-2 focus:ring-primary pr-8"
            />
            {isFetchingCep && (
              <Spinner className="absolute right-2 top-1/2 -translate-y-1/2 size-4 text-primary" />
            )}
          </div>
          <div className="h-4">
            {cepError && <p className="text-red-500 text-xs">{cepError}</p>}
          </div>
        </div>

        <Input
          required
          label="Cidade"
          placeholder="Preenchido pelo CEP"
          error={errors.city?.message}
          {...register("city")}
        />
        <Input
          required
          label="Estado"
          placeholder="UF"
          error={errors.state?.message}
          {...register("state")}
        />
        <Input
          required
          label="País"
          error={errors.country?.message}
          {...register("country")}
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
        {isLoading ? "Salvando..." : submitLabel}
      </Button>
    </form>
  );
}
