"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUser() {
  const user = await prisma.user.findMany();

  if (!user) {
    throw new Error("could not fetch user");
  }

  return user;
}
