export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "WeddingGuestList";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION || "A modern wedding RSVP";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

import {
  HomeIcon,
  UserPlusIcon,
  ChatBubbleLeftRightIcon,
  LockClosedIcon,
  Cog8ToothIcon,
  KeyIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";

export const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
    roles: ["ADMIN", "RESEPSIONIS"],
  },
  {
    name: "Tambah Tamu Baru",
    href: "/dashboard/add-new-guest",
    icon: UserPlusIcon,
    roles: ["ADMIN", "RESEPSIONIS"],
  },
  {
    name: "Ucapan Selamat",
    href: "/dashboard/guest-messages",
    icon: ChatBubbleLeftRightIcon,
    roles: ["ADMIN", "RESEPSIONIS"],
  },
  {
    name: "Manajemen Admin",
    href: "/dashboard/admin-management",
    icon: LockClosedIcon,
    roles: ["ADMIN"],
  },
  {
    name: "Pengaturan Acara",
    href: "/dashboard/event-settings",
    icon: Cog8ToothIcon,
    roles: ["ADMIN"],
  },
  {
    name: "Keamanan",
    href: "/dashboard/security",
    icon: KeyIcon,
    roles: ["ADMIN"],
  },
  {
    name: "Log Aktivitas",
    href: "/dashboard/activity-log",
    icon: ClipboardDocumentCheckIcon,
    roles: ["ADMIN"],
  },
];
