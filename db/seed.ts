import { PrismaClient } from "@prisma/client";
import { users, guests } from "./sampleData";
// import { sampleLogs } from "./sampleLog";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Start seeding...");

  await prisma.log.deleteMany();
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

  // for (const log of sampleLogs) {
  //   await prisma.log.create({
  //     data: {
  //       guestId: log.guestId,
  //       actorId: log.actorId,
  //       actorType: log.actorType,
  //       action: log.action,
  //       createdAt: log.createdAt,
  //     },
  //   });
  //   console.log(`📝 Log for guestId ${log.guestId} seeded`);
  // }

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
