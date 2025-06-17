-- CreateTable
CREATE TABLE "Wedding" (
    "id" TEXT NOT NULL,
    "groomName" TEXT NOT NULL,
    "brideName" TEXT NOT NULL,
    "groomInstagram" TEXT,
    "brideInstagram" TEXT,
    "groomFather" TEXT NOT NULL,
    "groomMother" TEXT NOT NULL,
    "brideFather" TEXT NOT NULL,
    "brideMother" TEXT NOT NULL,
    "groomPhoto" TEXT NOT NULL,
    "bridePhoto" TEXT NOT NULL,
    "heroImage" TEXT NOT NULL,
    "invitationBackground" TEXT NOT NULL,
    "closingImage" TEXT NOT NULL,
    "verseText" TEXT NOT NULL,
    "verseSource" TEXT NOT NULL,
    "closingTitle" TEXT NOT NULL,
    "closingMessage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wedding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "weddingId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "streetName" TEXT NOT NULL,
    "fullAddress" TEXT NOT NULL,
    "mapsUrl" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE CASCADE ON UPDATE CASCADE;
