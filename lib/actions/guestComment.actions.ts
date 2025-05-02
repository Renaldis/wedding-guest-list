"use server";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export async function listGuestMessages() {
  const messages = await prisma.guestComment.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      guest: {
        select: {
          name: true,
          isDeleted: true,
        },
      },
    },
  });

  return messages;
}

export async function guestsMessage({
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

  const whereClause: Prisma.GuestCommentWhereInput = {
    message: {
      not: null,
    },
    isDeleted: false,
    guest: {
      isDeleted: false,
      ...(search && {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: search,
            },
          },
        ],
      }),
    },
  };

  const guests = await prisma.guestComment.findMany({
    where: whereClause,
    include: {
      guest: {
        select: {
          name: true,
          phone: true,
        },
      },
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.guestComment.count({
    where: whereClause,
  });

  return {
    guests,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function deleteComment(id: string) {
  await prisma.guestComment.update({
    where: { id },
    data: {
      isDeleted: true,
    },
  });

  return null;
}
