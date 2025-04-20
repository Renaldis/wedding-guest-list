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

export default function Sidebar({
  isSheetOpen,
  toggleSheet,
}: {
  isSheetOpen: boolean;
  toggleSheet: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 bg-gray-800 text-white md:flex flex-col p-4 space-y-6">
      <div className="text-2xl font-bold mb-6">
        <span className="block text-center">🎉 MyWeddingApp</span>
      </div>

      <nav className="flex flex-col gap-4">
        {menuItems.slice(0, 3).map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link href={`${item.href}`} key={item.name}>
              <span
                className={`hover:bg-gray-700 px-3 py-2 rounded flex items-center gap-2 ${
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
        {menuItems.slice(3).map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link href={`${item.href}`} key={item.name}>
              <span
                className={`hover:bg-gray-700 px-3 py-2 rounded flex items-center gap-2 ${
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
      <Button className="cursor-pointer" variant={"danger"}>
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
            {menuItems.map((item) => {
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
              <Button type="submit">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </aside>
  );
}
