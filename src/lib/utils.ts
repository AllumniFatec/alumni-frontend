import { clsx, type ClassValue } from "clsx"
import { format, isValid } from "date-fns"
import { ptBR } from "date-fns/locale"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Iniciais (até 2 caracteres): primeiras letras das duas primeiras palavras.
 * Uma só palavra: só a primeira letra desse token (igual ao painel admin).
 */
export function getUserInitials(name: string | null | undefined): string {
  const trimmed = name?.trim();
  if (!trimmed) return "?";

  const letters = trimmed
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return letters || "?";
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
