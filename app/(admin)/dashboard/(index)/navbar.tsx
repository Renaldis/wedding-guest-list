"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { Bars3Icon } from "@heroicons/react/24/solid";

export default function Navbar({ toggleSheet }: { toggleSheet: () => void }) {
  const pathname = usePathname();
  const [userName, setUserName] = useState<string>("");

  const pageTitleMap: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/add-new-guest": "Tambah Tamu Baru",
    "/dashboard/guest-messages": "Ucapan Selamat",
    "/dashboard/admin-management": "Manajemen Admin",
    "/dashboard/event-settings": "Pengaturan Acara",
    "/dashboard/security": "Keamanan",
    "/dashboard/activity-log": "Log Aktivitas",
  };

  const pageName = pageTitleMap[pathname] || "Halaman";

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserName(payload.name || "User");
      } catch {
        setUserName("User");
      }
    }
  }, []);

  return (
    <header className="bg-white shadow p-4 sticky top-0 z-10">
      <div className="flex justify-between items-center md:mx-20 text-sm md:text-lg">
        <h1 className="hidden md:block font-semibold">{pageName}</h1>

        {/* Button to open sheet */}
        <Bars3Icon className="h-6 w-6 md:hidden" onClick={toggleSheet} />

        <span className="text-gray-500 font-semibold">Halo, {userName}</span>
      </div>
    </header>
  );
}
