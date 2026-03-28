import { format, isValid } from "date-fns";

/** ISO/UTC da API → `Date` local para o calendário. */
export function parseProfileIsoDate(iso: string): Date | undefined {
  const d = new Date(iso);
  return isValid(d) ? d : undefined;
}

/** `Date` escolhido no picker → `DD/MM/AAAA` esperado pelo backend (`parseBRDate`). */
export function dateToBrApi(d: Date): string {
  return format(d, "dd/MM/yyyy");
}
