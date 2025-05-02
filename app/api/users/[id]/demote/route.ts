import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (existingUser.role === "RESEPSIONIS") {
      return NextResponse.json(
        { message: "User is already a Resepsionis" },
        { status: 400 }
      );
    }

    // Demote user to Resepsionis
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        role: "RESEPSIONIS",
      },
    });

    return NextResponse.json(
      { message: "User demoted to Resepsionis", data: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error demoting user:", error);
    return NextResponse.json(
      { message: "Failed to demote user" },
      { status: 500 }
    );
  }
}
