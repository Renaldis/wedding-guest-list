import { Role } from "@prisma/client";

export const users = [
  {
    id: "user-admin-1",
    name: "Admin Renaldi",
    email: "admin@event.com",
    password: "hashed_password_admin", // ubah ke hash asli kalau sudah ada
    role: Role.ADMIN,
  },
  {
    id: "user-resepsionis-1",
    name: "Resepsionis Cici",
    email: "resepsionis@event.com",
    password: "hashed_password_resepsionis",
    role: Role.RESEPSIONIS,
  },
];

export const guests = [
  {
    id: "guest-001",
    name: "Budi Santoso",
    email: "budi@example.com",
    phone: "08123456789",
    rsvpCode: "RSVP001",
    isAttending: true,
    isPresent: true,
    greetingMessage: "Terima kasih undangannya!",
    updatedById: "user-resepsionis-1",
  },
  {
    id: "guest-002",
    name: "Siti Aminah",
    email: "siti@example.com",
    phone: "08987654321",
    rsvpCode: "RSVP002",
    isAttending: true,
    isPresent: false,
    greetingMessage: "Mohon maaf tidak bisa hadir.",
    updatedById: "user-admin-1",
  },
];

export const logs = [
  {
    guestId: "guest-001",
    userId: "user-resepsionis-1",
    action: "checked-in",
  },
  {
    guestId: "guest-002",
    userId: "user-admin-1",
    action: "rsvp-submit",
  },
];
