import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { UserForm } from "@/types/user";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const body: UserForm = await req.json();
  const { id } = await params;

  try {
    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: body.name,
        email: body.email,
        ...(body.password && {
          password: await hash(body.password, 10),
        }),
      },
    });

    return NextResponse.json(
      { message: "User updated successfully", data: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Failed to update user" },
      { status: 500 }
    );
  }
}
