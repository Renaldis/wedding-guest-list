import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
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
      prisma.guest.count({ where: { isPresent: false, isDeleted: false } }),
      prisma.guest.count({ where: { isAttending: true } }),
    ]);

    return NextResponse.json({
      totalGuest,
      totalConfirmRSVP,
      totalPresent,
      totalNotPresent,
      totalAttending,
    });
  } catch (error) {
    console.error("Error in /api/stat:", error);
    return NextResponse.json(
      { message: "Failed to fetch stats." },
      { status: 500 }
    );
  }
}
