// app/api/laporan-excel/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import ExcelJS from "exceljs";

const prisma = new PrismaClient();

export async function GET() {
  const guests = await prisma.guest.findMany({
    where: {
      isDeleted: false,
    },
  });

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Laporan Kehadiran Tamu");

  // Header
  worksheet.addRow([
    "DAFTAR TAMU",
    "KONFIRMASI KEHADIRAN",
    "TAMU HADIR",
    "TAMU TIDAK HADIR",
  ]);

  let totalKonfirmasi = 0;
  let totalHadir = 0;
  let totalTidakHadir = 0;

  // Isi data per tamu
  guests.forEach((guest) => {
    const konfirmasi = guest.isRSVPed ? "✅" : "";
    const hadir = guest.isPresent ? "✅" : "";
    const tidakHadir = !guest.isPresent ? "✅" : "";

    if (guest.isRSVPed) totalKonfirmasi++;
    if (guest.isPresent) totalHadir++;
    else totalTidakHadir++;

    worksheet.addRow([guest.name, konfirmasi, hadir, tidakHadir]);
  });

  // Tambahkan baris total
  worksheet.addRow(["Total", totalKonfirmasi, totalHadir, totalTidakHadir]);

  // Styling sederhana (opsional)
  worksheet.columns.forEach((col) => {
    col.width = 20;
    col.alignment = { vertical: "middle", horizontal: "center" };
  });

  const buffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition":
        'attachment; filename="Laporan-Kehadiran-Tamu.xlsx"',
    },
  });
}
