// app/api/laporan-excel/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import ExcelJS from "exceljs";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const guests = await prisma.guest.findMany({
      where: {
        isDeleted: false,
      },
      orderBy: {
        name: "asc",
      },
    });

    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Sistem Manajemen Tamu";
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet("Laporan Kehadiran Tamu"); // === 1. MEMBUAT JUDUL UTAMA DAN TIMESTAMP ===

    worksheet.mergeCells("A1:D1");
    const title = worksheet.getCell("A1");
    title.value = "Laporan Kehadiran Tamu Undangan";
    title.font = {
      name: "Calibri",
      size: 18,
      bold: true,
    };
    title.alignment = { vertical: "middle", horizontal: "center" };

    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat("id-ID", {
      dateStyle: "full",
      timeStyle: "long",
      timeZone: "Asia/Jakarta",
    }).format(now);

    worksheet.mergeCells("A2:D2");
    const dateCell = worksheet.getCell("A2");
    dateCell.value = `Laporan dibuat pada: ${formattedDate}`;
    dateCell.font = { name: "Calibri", size: 9, italic: true };
    dateCell.alignment = { vertical: "middle", horizontal: "center" };

    worksheet.addRow([]); // Baris kosong untuk spasi // === 2. MEMBUAT STATISTIK RINGKAS ===

    const totalDiundang = guests.length;
    const totalKonfirmasi = guests.filter((g) => g.isRSVPed).length;
    const totalHadir = guests.filter((g) => g.isPresent).length;
    const totalTidakHadir = totalDiundang - totalHadir;

    const summaryData = [
      ["Total Tamu Diundang", totalDiundang],
      ["Total Konfirmasi Hadir", totalKonfirmasi],
      ["Total Tamu Hadir", totalHadir],
      ["Total Tamu Tidak Hadir", totalTidakHadir],
    ];

    summaryData.forEach((rowData) => {
      const newRow = worksheet.addRow(rowData);
      const labelCell = newRow.getCell(1);
      labelCell.font = { bold: true };
      labelCell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      const valueCell = newRow.getCell(2);
      valueCell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      valueCell.alignment = { horizontal: "right" };
    });

    worksheet.addRow([]); // Baris kosong untuk spasi // === 3. MEMBUAT HEADER TABEL DATA ===

    const headerRow = worksheet.addRow([
      "No",
      "Nama Tamu",
      "Konfirmasi Hadir (RSVP)",
      "Status Kehadiran",
    ]);

    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF4472C4" },
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    }); // === 4. MENGISI DATA TAMU ===

    guests.forEach((guest, index) => {
      const rowData = [
        index + 1,
        guest.name,
        guest.isRSVPed ? "Ya" : "Belum",
        guest.isPresent ? "Hadir" : "Tidak Hadir",
      ];

      const dataRow = worksheet.addRow(rowData); // Terapkan border dan alignment default untuk semua sel di baris ini

      dataRow.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        cell.alignment = {
          vertical: "middle",
          horizontal: "left",
          wrapText: true,
        };
      }); // === [PERUBAHAN] MULAI: LOGIKA PEWARNAAN KONDISIONAL ===

      const statusCell = dataRow.getCell(4); // Kolom ke-4 adalah 'Status Kehadiran'

      if (guest.isPresent) {
        // Jika HADIR, beri warna latar hijau dan teks hijau tua
        statusCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFC6EFCE" }, // Warna stabilo hijau
        };
        statusCell.font = {
          color: { argb: "FF006100" }, // Warna teks hijau tua
        };
      } else {
        // Jika TIDAK HADIR, beri warna latar merah dan teks merah tua
        statusCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFFC7CE" }, // Warna stabilo merah
        };
        statusCell.font = {
          color: { argb: "FF9C0006" }, // Warna teks merah tua
        };
      } // === [PERUBAHAN] SELESAI === // Atur alignment spesifik setelah pewarnaan
      dataRow.getCell(1).alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      dataRow.getCell(3).alignment = {
        vertical: "middle",
        horizontal: "center",
      }; // Pastikan sel status kehadiran juga tetap di tengah
      dataRow.getCell(4).alignment = {
        vertical: "middle",
        horizontal: "center",
      };
    }); // === 5. MENGATUR LEBAR KOLOM (TETAP/FIXED) ===

    worksheet.getColumn("A").width = 20;
    worksheet.getColumn("B").width = 40;
    worksheet.getColumn("C").width = 25;
    worksheet.getColumn("D").width = 25; // === 6. GENERATE BUFFER DAN KIRIM RESPONSE ===

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
  } catch (error) {
    console.error("Gagal membuat laporan Excel:", error);
    return new NextResponse("Terjadi kesalahan pada server", { status: 500 });
  }
}
