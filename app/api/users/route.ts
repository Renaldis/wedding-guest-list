import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Users } from "@/types/user";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body: Users = await req.json();

  try {
    const totalUsers = await prisma.user.count();

    const newId = `user-${totalUsers + 1}`;

    const user = await prisma.user.create({
      data: {
        id: newId,
        name: body.name,
        email: body.email,
        role: body.role,
        password: await hash(body.password, 10),
      },
    });

    if (!user) {
      throw new Error("failed create user");
    }
    return NextResponse.json(
      { message: "User created successfully", data: user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
