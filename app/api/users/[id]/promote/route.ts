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

    if (existingUser.role === "ADMIN") {
      return NextResponse.json(
        { message: "User is already an ADMIN" },
        { status: 400 }
      );
    }

    // Promote user to Admin
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        role: "ADMIN",
      },
    });

    return NextResponse.json(
      { message: "User promoted to Admin", data: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error promoting user:", error);
    return NextResponse.json(
      { message: "Failed to promote user" },
      { status: 500 }
    );
  }
}
