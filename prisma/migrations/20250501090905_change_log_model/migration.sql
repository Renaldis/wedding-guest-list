/*
  Warnings:

  - You are about to drop the column `actorId` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `actorType` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `changedFields` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `newData` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `previousData` on the `Log` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_guestId_fkey";

-- AlterTable
ALTER TABLE "Log" DROP COLUMN "actorId",
DROP COLUMN "actorType",
DROP COLUMN "changedFields",
DROP COLUMN "newData",
DROP COLUMN "previousData",
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "guestId" DROP NOT NULL;
