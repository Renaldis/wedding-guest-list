"use client";

import { useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSheetOpen, setIsSheetOpen] = useState(false); // State untuk membuka/tutup sheet

  const toggleSheet = () => setIsSheetOpen((prev) => !prev); // Fungsi toggle untuk sheet
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar isSheetOpen={isSheetOpen} toggleSheet={toggleSheet} />
      {/* Main Content Area */}
      <main className="flex-1 bg-gray-100">
        <Navbar toggleSheet={toggleSheet} />

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
