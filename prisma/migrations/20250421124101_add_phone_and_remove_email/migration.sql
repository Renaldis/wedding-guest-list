/*
  Warnings:

  - You are about to drop the column `email` on the `Guest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `Guest` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Guest_email_key";

-- AlterTable
ALTER TABLE "Guest" DROP COLUMN "email",
ADD COLUMN     "phone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Guest_phone_key" ON "Guest"("phone");
