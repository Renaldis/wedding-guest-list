/*
  Warnings:

  - You are about to drop the column `phone` on the `Guest` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Guest_phone_key";

-- AlterTable
ALTER TABLE "Guest" DROP COLUMN "phone";
