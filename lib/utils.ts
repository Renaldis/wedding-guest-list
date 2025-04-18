import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRsvpCode(name: string, phone: string): string {
  const namePart = name.trim().toUpperCase().slice(0, 3); // ambil 3 huruf pertama dari nama
  const phonePart = phone.slice(-3); // ambil 3 angka terakhir
  const randomPart = Math.random().toString(36).substring(2, 5).toUpperCase(); // random 3 char

  return `RSVP-${namePart}${phonePart}${randomPart}`;
}
