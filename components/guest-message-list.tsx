"use client";

import { GuestProp } from "@/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { format } from "date-fns";
import { useSearchParams, useRouter } from "next/navigation";
import CustomDialog from "./custom-dialog";
import { useState } from "react";
import { deleteComment } from "@/lib/actions/guest.actions";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function GuestMessageList({
  guests,
  totalPages,
}: {
  guests: GuestProp[];
  totalPages: number;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [selectedGuest, setSelectedGuest] = useState<string>("");

  const confirmDelete = async () => {
    if (selectedGuest) {
      console.log(selectedGuest);
      await deleteComment(selectedGuest);
      router.refresh();
      setIsOpenDelete(false);
    }
  };
  const handleDelete = (id: string) => {
    setIsOpenDelete(true);
    setSelectedGuest(id);
  };

  const filteredGuests = guests
    ? guests
        .flat()
        .filter(
          (guest) =>
            guest.greetingMessage && guest.greetingMessage.trim() !== ""
        )
    : [];
  return (
    <div className="mt-10 mx-8">
      {filteredGuests.length > 0 ? (
        filteredGuests.map((guest) => (
          <div key={guest.id} className="my-5">
            <div className="flex items-center justify-between text-sm">
              <div>
                <h1 className="text-black font-medium">{guest.name}</h1>
                <div className="flex items-center gap-4">
                  <p className="text-slate-600">{guest.greetingMessage}</p>
                  <p className="text-slate-400">
                    {format(new Date(guest.createdAt), "yyyy-MM-dd HH:mm:ss")}
                  </p>
                </div>
              </div>
              <TrashIcon
                className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-800"
                onClick={() => handleDelete(guest.id)}
              />
            </div>
            <hr className="mt-4" />
          </div>
        ))
      ) : (
        <p className="text-center text-red-600 -mt-5">Data Belum Tersedia</p>
      )}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`?${new URLSearchParams({
                ...Object.fromEntries(searchParams),
                page: String(Math.max(currentPage - 1, 1)),
              }).toString()}`}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href={`?${new URLSearchParams({
                    ...Object.fromEntries(searchParams),
                    page: pageNum.toString(),
                  }).toString()}`}
                  isActive={pageNum === currentPage}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              href={`?${new URLSearchParams({
                ...Object.fromEntries(searchParams),
                page: String(Math.min(currentPage + 1, totalPages)),
              }).toString()}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <CustomDialog
        open={isOpenDelete}
        onClose={setIsOpenDelete}
        title="Confirm Delete"
        description="Are you sure you want to delete this comment? This action cannot be undone."
        footer={
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsOpenDelete(false)}
              className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            >
              Confirm
            </button>
          </div>
        }
      />
    </div>
  );
}
