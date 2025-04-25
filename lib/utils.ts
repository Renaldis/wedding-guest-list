import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRsvpCode(name: string, phone: string): string {
  const namePart = name.trim().toUpperCase().slice(0, 3);
  const phonePart = phone.slice(-3);
  const randomPart = Math.random().toString(36).substring(2, 5).toUpperCase();

  return `RSVP-${namePart}${phonePart}${randomPart}`;
}
