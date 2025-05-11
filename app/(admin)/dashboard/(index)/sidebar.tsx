"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { menuItems } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { logout } from "@/lib/logout";
import Cookies from "js-cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import { useEffect, useState } from "react";
type User = {
  userId: string;
  name: string;
  email: string;
  role: "ADMIN" | "RESEPSIONIS";
};

export default function Sidebar({
  isSheetOpen,
  toggleSheet,
}: {
  isSheetOpen: boolean;
  toggleSheet: () => void;
}) {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<"ADMIN" | "RESEPSIONIS" | null>(
    null
  );

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return;

    const decode = jwt.decode(token) as (User & JwtPayload) | null;

    if (decode?.role) {
      setUserRole(decode.role);
    }
  }, []);

  return (
    <aside className="hidden w-64 bg-gray-800 text-white md:flex flex-col p-6 space-y-6">
      <div className="text-2xl font-bold mb-6">
        <span className="block text-center">🎉 MyWedding</span>
      </div>

      <nav className="flex flex-col gap-4">
        {menuItems
          .filter((item) => item?.roles?.includes(userRole!))
          .slice(0, 3)
          .map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link href={`${item.href}`} key={item.name}>
                <span
                  className={`hover:bg-gray-700 px-1 py-1 text-sm rounded flex items-center gap-2 ${
                    isActive && "text-blue-500 font-semibold"
                  }`}
                >
                  <item.icon className="h-6 w-6" />
                  {item.name}
                </span>
              </Link>
            );
          })}
      </nav>

      <div className="border-t border-gray-600 my-2" />

      <nav className="flex flex-col gap-4">
        {menuItems
          .filter((item) => item?.roles?.includes(userRole!))
          .slice(3)
          .map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link href={`${item.href}`} key={item.name}>
                <span
                  className={`hover:bg-gray-700 px-1 py-1 text-sm rounded flex items-center gap-2 ${
                    isActive && "text-blue-500 font-semibold"
                  }`}
                >
                  <item.icon className="h-6 w-6" />
                  {item.name}
                </span>
              </Link>
            );
          })}
      </nav>

      <Button className="cursor-pointer" variant={"danger"} onClick={logout}>
        Logout
      </Button>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet open={isSheetOpen} onOpenChange={toggleSheet}>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>
              Choose an option from the menu below.
            </SheetDescription>
          </SheetHeader>

          {/* Mobile Menu Items */}
          <div className="flex flex-col gap-4 py-4">
            {menuItems
              .filter((item) => item?.roles?.includes(userRole!))
              .map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link href={item.href} key={item.name} onClick={toggleSheet}>
                    <span
                      className={`hover:bg-gray-200 px-3 py-2 rounded flex items-center gap-2 ${
                        isActive && "text-blue-500 font-semibold"
                      }`}
                    >
                      <item.icon className="h-6 w-6" />
                      {item.name}
                    </span>
                  </Link>
                );
              })}
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button
                type="submit"
                className="bg-red-600 hover:bg-red-800"
                onClick={logout}
              >
                Logout
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </aside>
  );
}
