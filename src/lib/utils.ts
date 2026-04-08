import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function parseDateValue(value: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function formatPtBrDate(value: string, options?: Intl.DateTimeFormatOptions) {
  const parsedDate = parseDateValue(value);

  if (!parsedDate) return value;

  return new Intl.DateTimeFormat("pt-BR", options).format(parsedDate);
}
