import { PrismaClient } from "@prisma/client";
import { users, guests, logs } from "./sampleData";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Start seeding...");

  await prisma.attendanceLog.deleteMany();
  await prisma.guest.deleteMany();
  await prisma.user.deleteMany();

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
    console.log(`👤 User ${user.email} seeded`);
  }

  for (const guest of guests) {
    await prisma.guest.upsert({
      where: { id: guest.id },
      update: {},
      create: guest,
    });
    console.log(`🎉 Guest ${guest.name} seeded`);
  }

  for (const log of logs) {
    await prisma.attendanceLog.create({
      data: {
        guestId: log.guestId,
        userId: log.userId,
        action: log.action,
      },
    });
    console.log(`📝 Log for guestId ${log.guestId} seeded`);
  }

  console.log("✅ Seeding complete.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
