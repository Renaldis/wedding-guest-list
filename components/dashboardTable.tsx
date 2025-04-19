"use client";

import { type GuestProp } from "@/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { format } from "date-fns";

export default function DashboardTable({
  guests,
  totalPages,
}: {
  guests: GuestProp[];
  totalPages: number;
}) {
  console.log(totalPages);
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-5 mt-2 mb-5">
        <h1 className="text-lg font-semibold">Daftar Tamu</h1>
        <Input className="w-40" placeholder="Cari nama tamu..." />
      </div>
      <Table>
        <TableCaption>Data Daftar Tamu</TableCaption>
        <TableHeader>
          <TableRow className="bg-slate-100">
            <TableHead className="w-[80px]">No</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Kehadiran</TableHead>
            <TableHead>Ditambahkan</TableHead>
            <TableHead>Diperbarui</TableHead>
            <TableHead>Diupdate Oleh</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guests.map((guest, index) => (
            <TableRow key={guest.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{guest.name}</TableCell>
              <TableCell>{guest.phone}</TableCell>
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
    </div>
  );
}
