"use client";

import { useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const toggleSheet = () => setIsSheetOpen((prev) => !prev);
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar isSheetOpen={isSheetOpen} toggleSheet={toggleSheet} />
      {/* Main Content Area */}
      <main className="flex-1 bg-gray-100 w-100 overflow-x-hidden">
        <Navbar toggleSheet={toggleSheet} />

        <div className="p-6 h-screen overflow-y-auto pb-20">{children}</div>
      </main>
    </div>
  );
}
