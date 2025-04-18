import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Cek apakah email dan password ada
  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  // Cari pengguna berdasarkan email
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Periksa password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  // Buat token JWT
  const jwtSecret = process.env.JWT_SECRET as string;

  const token = jwt.sign(
    { userId: user.id, name: user.name, email: user.email, role: user.role },
    jwtSecret,
    { expiresIn: "1h" }
  );

  // Kirimkan token kembali
  return NextResponse.json({ token });
}
