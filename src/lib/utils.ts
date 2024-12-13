import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hexToRGBArray(hex?: string): [number, number, number] {
  hex = (hex ? hex : "dddddd").toLowerCase();
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? [
        parseInt(result[1]!, 16),
        parseInt(result[2]!, 16),
        parseInt(result[3]!, 16),
      ]
    : [175, 175, 175];
}

export function hexToRGBAArray(
  hex?: string,
  alpha = 255,
): [number, number, number, number] {
  const rgb = hexToRGBArray(hex);
  return [...rgb, alpha];
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
