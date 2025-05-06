// app/api/export-guests/route.ts
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const guests = await prisma.guest.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        GuestComment: true,
      },
    });

    const baseRSVPUrl = "https://fiqrimeiliza.vercel.app/?codeRSVP=";
    const waBaseUrl = "https://wa.me/";

    const dataToExport = guests.map((guest) => {
      const phoneRaw = guest.phone || "";
      const phoneCleaned = phoneRaw.replace(/\D/g, "");

      // Jika nomor diawali 0 dan panjang cukup, ubah ke format internasional
      const phoneInternational = phoneCleaned.startsWith("0")
        ? "62" + phoneCleaned.slice(1)
        : phoneCleaned;

      const waLink = phoneInternational
        ? `${waBaseUrl}${phoneInternational}`
        : "";

      return {
        ID: guest.id,
        Name: guest.name,
        RSVP_Code: guest.rsvpCode,
        Phone: guest.phone ? `'${guest.phone}` : "",
        Is_RSVPed: guest.isRSVPed ? "Yes" : "No",
        Is_Attending: guest.isAttending ? "Yes" : "No",
        Is_Present: guest.isPresent ? "Yes" : "No",
        Created_At: guest.createdAt.toISOString(),
        Updated_At: guest.updatedAt.toISOString(),
        Updated_By_ID: guest.updatedById || "",
        Guest_Comments: guest.GuestComment.map((c) => c.message).join(" | "),
        WhatsApp_Link: waLink,
        RSVP_Link: `${baseRSVPUrl}${guest.rsvpCode}`,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);

    // Set kolom hyperlink dan tipe teks
    const range = XLSX.utils.decode_range(worksheet["!ref"]!);
    for (let R = range.s.r + 1; R <= range.e.r; ++R) {
      const phoneRef = XLSX.utils.encode_cell({ r: R, c: 3 }); // kolom Phone
      const phoneCell = worksheet[phoneRef];
      if (phoneCell?.v) {
        phoneCell.t = "s";
      }

      const waRef = XLSX.utils.encode_cell({ r: R, c: 11 }); // WhatsApp_Link
      const waCell = worksheet[waRef];
      if (waCell?.v) {
        waCell.f = `HYPERLINK("${waCell.v}", "${waCell.v}")`;
        waCell.t = "s";
      }

      const rsvpRef = XLSX.utils.encode_cell({ r: R, c: 12 }); // RSVP_Link
      const rsvpCell = worksheet[rsvpRef];
      if (rsvpCell?.v) {
        rsvpCell.f = `HYPERLINK("${rsvpCell.v}", "${rsvpCell.v}")`;
        rsvpCell.t = "s";
      }
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Guests");

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename=guests_export.xlsx`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { message: "Failed to export guests" },
      { status: 500 }
    );
  }
}
