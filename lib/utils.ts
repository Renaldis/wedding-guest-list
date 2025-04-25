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

export function formatTanggal(createdAt: string): string {
  const date = new Date(createdAt);

  const dateWIB = new Date(date.getTime() + 7 * 60 * 60 * 1000);

  const hari = dateWIB.toLocaleDateString("id-ID", { weekday: "long" });
  const tanggal = dateWIB.getDate().toString().padStart(2, "0");
  const bulan = dateWIB.toLocaleDateString("id-ID", { month: "long" });
  const tahun = dateWIB.getFullYear();

  const jam = dateWIB.getHours().toString().padStart(2, "0");
  const menit = dateWIB.getMinutes().toString().padStart(2, "0");

  return `${hari}, ${tanggal}-${bulan}-${tahun} ${jam}:${menit} WIB`;
}
