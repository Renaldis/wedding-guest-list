/*
  Warnings:

  - Changed the type of `actorType` on the `Log` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ActorType" AS ENUM ('USER', 'GUEST');

-- AlterTable
ALTER TABLE "Log" ADD COLUMN     "changedFields" TEXT,
ADD COLUMN     "newData" JSONB,
ADD COLUMN     "previousData" JSONB,
DROP COLUMN "actorType",
ADD COLUMN     "actorType" "ActorType" NOT NULL;
