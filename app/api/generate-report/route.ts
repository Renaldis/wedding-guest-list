import { NextResponse } from "next/server";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const guests = await prisma.guest.findMany({
    where: {
      isDeleted: false,
    },
  });

  const totalTamu = guests.length;
  const sudahKonfirmasiHadir = guests.filter(
    (g) => g.isRSVPed && g.isAttending === true
  ).length;
  const konfirmasiTapiTidakHadir = guests.filter(
    (g) => g.isRSVPed && g.isAttending === true && g.isPresent === false
  ).length;
  const hadirDiAcara = guests.filter((g) => g.isPresent === true).length;
  const tidakHadirDiAcara = totalTamu - hadirDiAcara;

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "LAPORAN KEHADIRAN TAMU ACARA",
                bold: true,
                size: 32,
              }),
            ],
          }),
          new Paragraph({ text: "" }),
          new Paragraph({ text: `1. Total tamu terdaftar: ${totalTamu}` }),
          new Paragraph({
            text: `2. Jumlah tamu yang sudah konfirmasi dan akan hadir: ${sudahKonfirmasiHadir}`,
          }),
          new Paragraph({
            text: `3. Jumlah tamu yang sudah konfirmasi tapi tidak hadir: ${konfirmasiTapiTidakHadir}`,
          }),
          new Paragraph({
            text: `4. Jumlah tamu yang hadir di acara: ${hadirDiAcara}`,
          }),
          new Paragraph({
            text: `5. Jumlah tamu yang tidak hadir di acara: ${tidakHadirDiAcara}`,
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
            children: [
              new TextRun({
                text:
                  `Dari total ${totalTamu} tamu yang terdaftar, sebanyak ${sudahKonfirmasiHadir} tamu telah ` +
                  `mengonfirmasi kehadiran mereka. Namun, hanya ${hadirDiAcara} tamu yang benar-benar hadir ` +
                  `di acara, sementara ${tidakHadirDiAcara} lainnya tidak hadir. Jumlah tamu yang sudah ` +
                  `RSVP tapi tidak hadir mencapai ${konfirmasiTapiTidakHadir} orang. Laporan ini dapat ` +
                  `digunakan oleh pihak pengantin atau EO untuk melakukan evaluasi lebih lanjut terhadap ` +
                  `proses undangan dan kehadiran.`,
                size: 22,
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition":
        'attachment; filename="Laporan-Kehadiran-Tamu.docx"',
    },
  });
}
