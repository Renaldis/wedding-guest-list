import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRsvpCode(name: string, phone: string): string {
  const namePart = name.trim().toUpperCase().slice(0, 3);
  const phonePart = phone.slice(-3);
  const randomPart = Math.random().toString(36).substring(2, 5).toUpperCase();

  return `RSVP-${namePart}${phonePart}${randomPart}`;
}

// const JWT_TOKEN = process.env.JWT_TOKEN || "e5e30m80q1ph7aw0un3jiu1exkj409mf";
export const decodeToken = (token: string) => {
  try {
    const decoded = jwt.decode(token);

    if (!decoded) {
      throw new Error("Token tidak valid atau tidak dapat didekode.");
    }

    return decoded;
  } catch (error) {
    console.error("Gagal mendekode token:", error);
    return null;
  }
};
