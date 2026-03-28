"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BaseLabel } from "@/components/BaseLabel";
import { cn } from "@/lib/utils";

type ProfessionalHistoryDateFieldProps = {
  id?: string;
  label: string;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  disabled?: boolean;
  placeholder: string;
  error?: string;
};

export function ProfessionalHistoryDateField({
  id,
  label,
  value,
  onChange,
  disabled,
  placeholder,
  error,
}: ProfessionalHistoryDateFieldProps) {
  return (
    <div className="space-y-1.5">
      <BaseLabel htmlFor={id}>{label}</BaseLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-between text-left font-normal min-w-0 border-slate-200/90 bg-slate-100 dark:border-slate-700 dark:bg-slate-800/80",
              !value && "text-muted-foreground",
            )}
          >
            <span className="truncate">
              {value
                ? format(value, "d 'de' MMMM 'de' yyyy", { locale: ptBR })
                : placeholder}
            </span>
            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="z-[100] w-auto border-slate-200/90 bg-white p-0 dark:border-slate-700 dark:bg-slate-950"
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            defaultMonth={value ?? new Date()}
            locale={ptBR}
            className="bg-white dark:bg-slate-950"
          />
        </PopoverContent>
      </Popover>
      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  );
}
