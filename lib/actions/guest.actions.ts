"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getPaginatedGuest({
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortOrder = "desc",
  search = "",
}: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
}) {
  const skip = (page - 1) * limit;

  const guests = await prisma.guest.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.guest.count({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  return {
    guests,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}
