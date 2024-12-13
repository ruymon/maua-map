import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { ptBR } from "date-fns/locale";

export function convertUtcToBrt(utcDate: string) {
  return toZonedTime(parseISO(utcDate), "America/Sao_Paulo");
}

export function timestampToDayAndMonth(date: string) {
  return format(convertUtcToBrt(date), "d 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  });
}

export function timestampToShotTime(date: string): string {
  return format(convertUtcToBrt(date), "HH:mm");
}
