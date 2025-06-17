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
  // Cog8ToothIcon,
  // KeyIcon,
  ClipboardDocumentCheckIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import LocIcon from "@/public/location-lordicon.gif";

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
  // {
  //   name: "Pengaturan Acara",
  //   href: "/dashboard/event-settings",
  //   icon: Cog8ToothIcon,
  //   roles: ["ADMIN"],
  // },
  // {
  //   name: "Keamanan",
  //   href: "/dashboard/security",
  //   icon: KeyIcon,
  //   roles: ["ADMIN"],
  // },
  {
    name: "Log Aktivitas",
    href: "/dashboard/activity-log",
    icon: ClipboardDocumentCheckIcon,
    roles: ["ADMIN"],
  },
  {
    name: "Manajemen Halaman Undangan",
    icon: RectangleStackIcon,
    href: "/dashboard/settings-page",
    roles: ["ADMIN"],
  },
];

export const defaultGuest = {
  id: "",
  name: "",
  rsvpCode: "",
  phone: "",
  GuestComment: {
    message: "",
  },
  isAttending: null,
  isRSVPed: false,
  isPresent: false,
  updatedById: null,
};

export const eventTitle = "Acara Pernikahan Fiqri & Meiliza";
export const eventStartDate = "20250528T020000Z";
export const eventEndDate = "20250528T040000Z";
export const eventDetails = "Jangan lupa hadir di acara pernikahan kami!";
export const eventLocation =
  "The St. Regis Jakarta Jalan Haji R. Rasuna Said 4, Setia Budi, Kecamatan Setiabudi Kota Jakarta Selatan";

const mapUrl =
  "https://www.google.com/maps/dir//Rajawali+Place,+Jl.+H.+R.+Rasuna+Said+No.4+Blok+Kav.+B,+Kuningan,+Setia+Budi,+Kecamatan+Setiabudi,+Kota+Jakarta+Selatan,+Daerah+Khusus+Ibukota+Jakarta+12910/@-6.2063228,106.7451006,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x2e69f41ace344be7:0x7ca9fc55e762b09e!2m2!1d106.8275025!2d-6.2063292?entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D";

export const venues = [
  {
    title: "Akad Nikah",
    date: "21 Januari 2026",
    time: "09:30 - 11:00",
    place: "The St. Regis Jakarta",
    address:
      "Jalan Haji R. Rasuna Said 4, Setia Budi, Kecamatan Setiabudi Kota Jakarta Selatan",
    icon: LocIcon,
    mapUrl,
  },
  {
    title: "Resepsi Pernikahan",
    date: "21 Januari 2026",
    time: "12:00 - 14:30 WIB",
    place: "The St. Regis Jakarta",
    address:
      "Jalan Haji R. Rasuna Said 4, Setia Budi, Kecamatan Setiabudi Kota Jakarta Selatan",
    icon: LocIcon,
    mapUrl,
  },
];
