import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  console.log("Start Deleting..");
  await prisma.attendanceLog.deleteMany();
  await prisma.guest.deleteMany();
  await prisma.user.deleteMany();

  console.log("all data has been deleted");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
