import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { PrismaClient } from "@prisma/client";
import { generateRsvpCode } from "@/lib/utils";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer(); // read Blob
  const buffer = Buffer.from(arrayBuffer);

  try {
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json<{ name: string; phone: string }>(
      worksheet
    );

    const totalGuests = await prisma.guest.count();

    const created = await Promise.all(
      jsonData.map(async (row: { name: string; phone: string }, index) => {
        const id = `guest-${String(totalGuests + index + 1).padStart(3, "0")}`;
        const phoneStr = String(row.phone);
        return prisma.guest.create({
          data: {
            id,
            name: row.name,
            phone: row.phone,
            rsvpCode: generateRsvpCode(row.name, phoneStr),
            isRSVPed: false,
            isAttending: null,
          },
        });
      })
    );

    return NextResponse.json({ message: "Upload success", data: created });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { message: "Failed to process file" },
      { status: 500 }
    );
  }
}
