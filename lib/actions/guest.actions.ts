"use server";

import { PrismaClient, Prisma } from "@prisma/client";
import { editGuestForm } from "../validators";
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

  const whereClause: Prisma.GuestWhereInput = search
    ? {
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
            },
          },
        ],
      }
    : {};

  const guests = await prisma.guest.findMany({
    where: whereClause,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.guest.count({
    where: whereClause,
  });

  return {
    guests,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getGuest({ id }: { id: string }) {
  const guest = await prisma.guest.findUnique({
    where: {
      id,
    },
  });

  if (!guest) {
    throw new Error("Guest not found");
  }

  return guest;
}

export async function editGuest(formData: editGuestForm) {
  const guest = await prisma.guest.update({
    where: {
      id: formData.id,
    },
    data: {
      name: formData.name,
      phone: formData.phone,
      isPresent: formData.isPresent,
      updatedAt: new Date(),
    },
  });
  return guest;
}

// note: selanjutnya buat logic yang update siapa
