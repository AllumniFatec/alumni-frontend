import { parse, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { EventWritePayload } from "@/models/event";

/** Data no formulário de evento (DD/MM/AAAA). */
export const EVENT_FORM_DATE_REGEX = /^\d{2}\/\d{2}\/\d{4}$/;

const MAX_TIME_DIGITS = 4;

/**
 * Máscara HH:mm só com dígitos (insere `:` após hora). Máx. 4 dígitos → ex.: `2300` → `23:00`.
 */
export function maskEventFormTime(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, MAX_TIME_DIGITS);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}:${digits.slice(2)}`;
}

/** HH:mm em 24h válido (00:00–23:59). */
export const EVENT_FORM_TIME_24H_REGEX =
  /^([01]\d|2[0-3]):[0-5]\d$/;

/**
 * Converte string de data do formulário (BR) em `Date` local, ou `undefined` se inválida.
 */
export function parseEventFormDateBr(value: string): Date | undefined {
  if (!value || !EVENT_FORM_DATE_REGEX.test(value)) return undefined;
  const d = parse(value, "dd/MM/yyyy", new Date(), { locale: ptBR });
  return isValid(d) ? d : undefined;
}

export interface EventFormDateTimeFields {
  date_start: string;
  time_start: string;
  date_end: string;
  time_end: string;
}

/**
 * Verifica se fim >= início (mesma regra do backend / zod refine).
 */
export function isEventFormRangeEndAfterStart(
  data: EventFormDateTimeFields,
): boolean {
  const [ds, ms, ys] = data.date_start.split("/").map(Number);
  const [de, me, ye] = data.date_end.split("/").map(Number);
  const [sh, smi] = data.time_start.split(":").map(Number);
  const [eh, emi] = data.time_end.split(":").map(Number);
  const start = new Date(ys, ms - 1, ds, sh, smi);
  const end = new Date(ye, me - 1, de, eh, emi);
  return end.getTime() >= start.getTime();
}

/** Normaliza payload (trim) antes de enviar para a API. */
export function normalizeEventWritePayload(
  payload: EventWritePayload,
): EventWritePayload {
  return {
    title: payload.title.trim(),
    description: payload.description.trim(),
    local: payload.local.trim(),
    date_start: payload.date_start,
    time_start: payload.time_start,
    date_end: payload.date_end,
    time_end: payload.time_end,
  };
}
