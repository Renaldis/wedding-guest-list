"use server";

import { PrismaClient, Prisma } from "@prisma/client";
import {
  createGuestForm,
  editGuestForm,
  editGuestFormByCode,
} from "../validators";
import { generateRsvpCode } from "../utils";

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

  const whereClause: Prisma.GuestWhereInput = {
    isDeleted: false,
    ...(search && {
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
    }),
  };

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

export async function createGuest(formData: createGuestForm) {
  const existingGuest = await prisma.guest.findUnique({
    where: {
      phone: formData.phone,
    },
  });

  if (existingGuest) {
    throw new Error("Phone number already exists");
  }

  const totalGuests = await prisma.guest.count();
  const nextNumber = totalGuests + 1;
  const formattedId = `guest-${String(nextNumber).padStart(3, "0")}`;

  const guest = await prisma.guest.create({
    data: {
      id: formattedId,
      name: formData.name,
      phone: formData.phone,
      rsvpCode: generateRsvpCode(formData.name, formData.phone),
      isAttending: null,
      isPresent: formData.isPresent,
      updatedById: formData.updatedById,
    },
  });

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
      updatedById: formData.updatedById,
    },
  });
  return guest;
}

export async function deleteGuest(id: string) {
  await prisma.guest.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });
}

// SISI TAMU LANDING PAGE
export async function getGuestByCode({ rsvpCode }: { rsvpCode: string }) {
  const guest = await prisma.guest.findUnique({
    where: {
      rsvpCode,
    },
  });
  if (!guest) {
    throw new Error("Guest not found");
  }
  const comment = await prisma.guestComment.findFirst({
    where: {
      guestId: guest?.id,
    },
    select: {
      message: true,
    },
  });

  return {
    ...guest,
    GuestComment: comment ? { message: comment.message } : undefined,
  };
}

export async function editGuestByCode(formData: editGuestFormByCode) {
  if (formData.isRSVPed) {
    throw new Error(
      "Formulir dengan CODE RSVP ini hanya dapat dikonfirmasi sekali."
    );
  }

  const guest = await prisma.guest.update({
    where: {
      rsvpCode: formData.rsvpCode,
    },
    data: {
      name: formData.name,
      phone: formData.phone,
      isAttending: formData.isAttending,
      updatedAt: new Date(),
      isRSVPed: true,
    },
  });

  const guestMessage = await prisma.guestComment.create({
    data: {
      message: formData.GuestComment?.message,
      guestId: guest.id,
    },
  });

  return { guest, guestMessage };
}
