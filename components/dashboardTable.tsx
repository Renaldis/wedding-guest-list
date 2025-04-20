"use client";

import { type GuestProp } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Input } from "./ui/input";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardTable({
  guests,
  totalPages,
}: {
  guests: GuestProp[];
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchValue) {
        params.set("search", searchValue);
        params.set("page", "1");
      } else {
        params.delete("search");
      }

      router.push(`?${params.toString()}`);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchValue, router, searchParams]);

  const handleLimitChange = (newLimit: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", newLimit.toString());
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-5 mt-2 mb-5">
        <h1 className="text-lg font-semibold">Daftar Tamu</h1>
        <Input
          className="w-40"
          placeholder="Cari nama tamu..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {searchValue && (
          <button
            onClick={() => setSearchValue("")}
            className="ml-2 text-sm text-red-500 cursor-pointer"
          >
            Reset
          </button>
        )}
        <div className="flex items-center gap-4 justify-end">
          <label htmlFor="limit" className="text-sm">
            Tampilkan:
          </label>
          <select
            id="limit"
            className="border border-gray-300 rounded px-2 py-1"
            defaultValue={10}
            onChange={(e) => handleLimitChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm">data per halaman</span>
        </div>
      </div>
      <Table>
        {/* <TableCaption>Data Daftar Tamu</TableCaption> */}
        <TableHeader>
          <TableRow className="bg-slate-100">
            <TableHead className="w-[80px]">No</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>No. HP</TableHead>
            <TableHead>Status RSVP</TableHead>
            <TableHead>konfirmasi kehadiran</TableHead>
            <TableHead>Status Hadir di Acara</TableHead>
            <TableHead>Ditambahkan</TableHead>
            <TableHead>Diperbarui</TableHead>
            <TableHead>Diupdate Oleh</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guests.map((guest, index) => (
            <TableRow key={guest.id}>
              <TableCell className="font-medium">
                {(currentPage - 1) * limit + index + 1}
              </TableCell>
              <TableCell>{guest.name}</TableCell>
              <TableCell>{guest.phone}</TableCell>
              <TableCell>
                {guest.isRSVPed ? "Sudah RSVP" : "Belum RSVP"}
              </TableCell>
              <TableCell>
                {guest.isAttending === true
                  ? "Akan Hadir"
                  : guest.isAttending === false
                  ? "Tidak Hadir"
                  : "Belum Konfirmasi"}
              </TableCell>
              <TableCell>{guest.isPresent ? "Hadir" : "Belum Hadir"}</TableCell>
              <TableCell>
                {format(new Date(guest.createdAt), "yyyy-MM-dd HH:mm:ss")}
              </TableCell>
              <TableCell>
                {format(new Date(guest.updatedAt), "yyyy-MM-dd HH:mm:ss")}
              </TableCell>
              <TableCell>{guest.updatedById || "-"}</TableCell>
              <TableCell>
                <span className="text-blue-600 cursor-pointer">Edit</span> |{" "}
                <span className="text-red-600 cursor-pointer">Delete</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
    </div>
  );
}
