import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const logs = await prisma.log.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        guest: true,
        user: true,
      },
    });

    return NextResponse.json(logs);
  } catch (error) {
    console.error("Error fetching logs:", error);
    return NextResponse.json(
      { message: "Failed to fetch logs" },
      { status: 500 }
    );
  }
}
