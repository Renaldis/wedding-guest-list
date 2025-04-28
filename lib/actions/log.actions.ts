"use server";

import { PrismaClient } from "@prisma/client";
import { CreateLogParams } from "../validators";

const prisma = new PrismaClient();

export async function createLog({
  guestId,
  actorId,
  actorType,
  action,
  changedFields,
  previousData,
  newData,
}: CreateLogParams): Promise<void> {
  try {
    await prisma.log.create({
      data: {
        guestId,
        actorId,
        actorType,
        action,
        changedFields: changedFields ? changedFields.join(", ") : null,
        previousData,
        newData,
      },
    });
    console.log("Log created successfully");
  } catch (error) {
    console.error("Error creating log:", error);
    throw new Error("Failed to create log");
  }
}
