/*
  Warnings:

  - You are about to drop the `AttendanceLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AttendanceLog" DROP CONSTRAINT "AttendanceLog_guestId_fkey";

-- DropForeignKey
ALTER TABLE "AttendanceLog" DROP CONSTRAINT "AttendanceLog_userId_fkey";

-- AlterTable
ALTER TABLE "Guest" ALTER COLUMN "isAttending" SET DEFAULT false;

-- DropTable
DROP TABLE "AttendanceLog";

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "guestId" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "actorType" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
