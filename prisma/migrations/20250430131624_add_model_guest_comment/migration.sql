/*
  Warnings:

  - You are about to drop the column `greetingMessage` on the `Guest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Guest" DROP COLUMN "greetingMessage";

-- CreateTable
CREATE TABLE "GuestComment" (
    "id" SERIAL NOT NULL,
    "guestId" TEXT,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GuestComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GuestComment" ADD CONSTRAINT "GuestComment_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
