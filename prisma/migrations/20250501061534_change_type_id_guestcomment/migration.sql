/*
  Warnings:

  - The primary key for the `GuestComment` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "GuestComment" DROP CONSTRAINT "GuestComment_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "message" DROP NOT NULL,
ADD CONSTRAINT "GuestComment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "GuestComment_id_seq";
