import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const search = searchParams.get("search") || "";
  const skip = (page - 1) * limit;

  const whereClause = {
    isDeleted: false,
    ...(search && {
      OR: [
        {
          name: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
        {
          phone: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
      ],
    }),
  };

  try {
    const [guests, total] = await Promise.all([
      prisma.guest.findMany({
        where: whereClause,
        select: {
          id: true,
          name: true,
          phone: true,
          isAttending: true,
          isPresent: true,
          rsvpCode: true,
          isRSVPed: true,
          createdAt: true,
          updatedAt: true,
          updatedBy: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          name: "asc",
        },
        skip,
        take: limit,
      }),
      prisma.guest.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      guests,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error in /api/guest:", error);
    return NextResponse.json(
      { message: "Failed to fetch guests." },
      { status: 500 }
    );
  }
}
