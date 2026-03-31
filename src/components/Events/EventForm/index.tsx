"use client";

import { useState } from "react";
import { useForm, Controller, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BaseLabel } from "@/components/BaseLabel";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  EVENT_FORM_DATE_REGEX,
  EVENT_FORM_TIME_24H_REGEX,
  isEventFormRangeEndAfterStart,
  maskEventFormTime,
  normalizeEventWritePayload,
  parseEventFormDateBr,
} from "@/lib/eventForm";
import type { EventWritePayload } from "@/models/event";

const eventFormSchema = z
  .object({
    title: z
      .string()
      .min(3, "Título deve ter entre 3 e 150 caracteres")
      .max(150, "Título deve ter entre 3 e 150 caracteres"),
    description: z
      .string()
      .min(10, "Descrição deve ter entre 10 e 3000 caracteres")
      .max(3000, "Descrição deve ter entre 10 e 3000 caracteres"),
    local: z
      .string()
      .min(3, "Local deve ter entre 3 e 150 caracteres")
      .max(150, "Local deve ter entre 3 e 150 caracteres"),
    date_start: z
      .string()
      .regex(EVENT_FORM_DATE_REGEX, "Selecione a data de início"),
    time_start: z
      .string()
      .length(5, "Informe o horário completo (HH:mm)")
      .regex(
        EVENT_FORM_TIME_24H_REGEX,
        "Horário inválido (use 00:00 a 23:59)",
      ),
    date_end: z
      .string()
      .regex(EVENT_FORM_DATE_REGEX, "Selecione a data de término"),
    time_end: z
      .string()
      .length(5, "Informe o horário completo (HH:mm)")
      .regex(
        EVENT_FORM_TIME_24H_REGEX,
        "Horário inválido (use 00:00 a 23:59)",
      ),
  })
  .refine(
    (data) => isEventFormRangeEndAfterStart(data),
    { message: "Data/hora de fim deve ser posterior ao início", path: ["date_end"] },
  );

export type EventFormValues = z.infer<typeof eventFormSchema>;

function FormDatePicker({
  name,
  control,
  label,
  error,
}: {
  name: "date_start" | "date_end";
  control: Control<EventFormValues>;
  label: string;
  error?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const selected = parseEventFormDateBr(field.value);
        return (
          <div className="space-y-1">
            <BaseLabel>{label}</BaseLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal h-10 px-3 rounded-lg border-0 text-sm text-foreground bg-primary-foreground sm:bg-muted focus:outline-none focus:ring-2 focus:ring-primary",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 shrink-0 opacity-70" />
                  {selected
                    ? format(selected, "dd/MM/yyyy", { locale: ptBR })
                    : "Selecione a data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  locale={ptBR}
                  selected={selected}
                  defaultMonth={selected ?? new Date()}
                  onSelect={(d) => {
                    field.onChange(d ? format(d, "dd/MM/yyyy") : "");
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
            {error ? (
              <p className="text-red-500 text-xs min-h-4">{error}</p>
            ) : (
              <div className="min-h-4" />
            )}
          </div>
        );
      }}
    />
  );
}

function FormTimeField({
  name,
  control,
  label,
  error,
}: {
  name: "time_start" | "time_end";
  control: Control<EventFormValues>;
  label: string;
  error?: string;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Input
          label={label}
          placeholder="00:00"
          inputMode="numeric"
          autoComplete="off"
          maxLength={5}
          error={error}
          value={field.value}
          onChange={(e) => field.onChange(maskEventFormTime(e.target.value))}
          onBlur={field.onBlur}
          name={field.name}
        />
      )}
    />
  );
}

interface EventFormProps {
  defaultValues?: Partial<EventFormValues>;
  onSubmit: (data: EventWritePayload) => void | Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
}

export function EventForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel = "Salvar",
}: EventFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      local: "",
      date_start: "",
      time_start: "",
      date_end: "",
      time_end: "",
      ...defaultValues,
    },
  });

  const descriptionLength = watch("description")?.length ?? 0;

  return (
    <form
      onSubmit={handleSubmit((v) =>
        onSubmit(normalizeEventWritePayload(v as EventWritePayload)),
      )}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Título"
          placeholder="Nome do evento"
          error={errors.title?.message}
          {...register("title")}
        />
        <Input
          label="Local"
          placeholder="Ex.: Auditório 1 ou Online — Google Meet"
          error={errors.local?.message}
          {...register("local")}
        />
      </div>

      <div className="space-y-1">
        <BaseLabel>Descrição</BaseLabel>
        <textarea
          className="w-full min-h-[140px] px-3 py-2 border-0 rounded-lg text-sm text-foreground bg-primary-foreground sm:bg-muted focus:outline-none focus:ring-2 focus:ring-primary resize-y"
          placeholder="Descreva o evento..."
          maxLength={3000}
          {...register("description")}
        />
        <div className="flex justify-between items-center h-4">
          {errors.description?.message ? (
            <p className="text-red-500 text-xs">{errors.description.message}</p>
          ) : (
            <span />
          )}
          <span className="text-xs text-slate-400">
            {descriptionLength}/3000
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <FormDatePicker
          name="date_start"
          control={control}
          label="Data de início"
          error={errors.date_start?.message}
        />
        <FormTimeField
          name="time_start"
          control={control}
          label="Hora de início"
          error={errors.time_start?.message}
        />
        <FormDatePicker
          name="date_end"
          control={control}
          label="Data de término"
          error={errors.date_end?.message}
        />
        <FormTimeField
          name="time_end"
          control={control}
          label="Hora de término"
          error={errors.time_end?.message}
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
        {isLoading ? "Salvando..." : submitLabel}
      </Button>
    </form>
  );
}
