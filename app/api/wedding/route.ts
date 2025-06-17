import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z, ZodError } from "zod";

const prisma = new PrismaClient();

const weddingSchema = z.object({
  couple: z.object({
    groomName: z.string(),
    brideName: z.string(),
    groomInstagram: z.string().optional(),
    brideInstagram: z.string().optional(),
    groomPhoto: z.string(),
    bridePhoto: z.string(),
  }),
  parents: z.object({
    groomFather: z.string(),
    groomMother: z.string(),
    brideFather: z.string(),
    brideMother: z.string(),
  }),
  verse: z.object({
    verseText: z.string(),
    verseSource: z.string(),
  }),
  media: z.object({
    heroImage: z.string(),
    invitationBackground: z.string(),
    closingImage: z.string(),
  }),
  closing: z.object({
    closingTitle: z.string(),
    closingMessage: z.string(),
  }),
  events: z.array(
    z.object({
      title: z.string(),
      date: z.string(),
      startTime: z.string(),
      endTime: z.string(),
      street: z.string(),
      fullAddress: z.string(),
      mapUrl: z.string().url().optional(),
    })
  ),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // data dalam bentuk JSON
    const parsed = weddingSchema.parse(body);
    console.log("✅ Received all wedding data:", body);

    // Simpan ke database di sini (misalnya Supabase / MongoDB / dst)
    const wedding = await prisma.wedding.create({
      data: {
        groomName: parsed.couple.groomName,
        brideName: parsed.couple.brideName,
        groomInstagram: parsed.couple.groomInstagram,
        brideInstagram: parsed.couple.brideInstagram,
        groomPhoto: parsed.couple.groomPhoto,
        bridePhoto: parsed.couple.bridePhoto,
        groomFather: parsed.parents.groomFather,
        groomMother: parsed.parents.groomMother,
        brideFather: parsed.parents.brideFather,
        brideMother: parsed.parents.brideMother,
        verseText: parsed.verse.verseText,
        verseSource: parsed.verse.verseSource,
        heroImage: parsed.media.heroImage,
        invitationBackground: parsed.media.invitationBackground,
        closingImage: parsed.media.closingImage,
        closingTitle: parsed.closing.closingTitle,
        closingMessage: parsed.closing.closingMessage,
        events: {
          create: parsed.events.map((event) => ({
            title: event.title,
            date: event.date,
            startTime: event.startTime,
            endTime: event.endTime,
            streetName: event.street,
            fullAddress: event.fullAddress,
            mapsUrl: event.mapUrl || "",
          })),
        },
      },
      include: { events: true },
    });

    return NextResponse.json(wedding, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Validation error", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("❌ Error saving data:", error);
    return NextResponse.json(
      { message: "Failed to save data", error: String(error) },
      { status: 500 }
    );
  }
}
