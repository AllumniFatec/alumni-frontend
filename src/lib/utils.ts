import { clsx, type ClassValue } from "clsx"
import { format, isValid } from "date-fns"
import { ptBR } from "date-fns/locale"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * ISO 8601 ou `Date` → data por extenso em pt-BR (ex.: 29 de janeiro de 2026).
 */
export function formatDateDayMonthYear(value: string | Date): string {
  const d = typeof value === "string" ? new Date(value) : value
  if (!isValid(d)) {
    return typeof value === "string" ? value : ""
  }
  return format(d, "d 'de' MMMM 'de' yyyy", { locale: ptBR })
}
