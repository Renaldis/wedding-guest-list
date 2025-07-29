import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Cek apakah email dan password ada
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, Email and password are required" },
        { status: 400 }
      );
    }

    // Cari pengguna berdasarkan email
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists!" },
        { status: 409 }
      );
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    await prisma.user.create({
      data: {
        id: uuidv4(),
        name,
        email,
        password: hashedPassword,
        role: "RESEPSIONIS",
      },
    });

    // Kirimkan token kembali
    return NextResponse.redirect(new URL("/dashboard/login", req.url));
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
