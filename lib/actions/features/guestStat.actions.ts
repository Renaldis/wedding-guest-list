"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function totalGuest() {
  try {
    const [
      totalGuest,
      totalConfirmRSVP,
      totalPresent,
      totalNotPresent,
      totalAttending,
    ] = await Promise.all([
      prisma.guest.count({ where: { isDeleted: false } }),
      prisma.guest.count({ where: { isRSVPed: true } }),
      prisma.guest.count({ where: { isPresent: true } }),
      prisma.guest.count({ where: { isPresent: !true } }),
      prisma.guest.count({ where: { isAttending: true } }),
    ]);

    return {
      totalGuest,
      totalConfirmRSVP,
      totalPresent,
      totalNotPresent,
      totalAttending,
    };
  } catch (error) {
    console.error("Error counting guests:", error);
    throw new Error("Failed to fetch guest statistics.");
  }
}
