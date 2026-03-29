import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const systemItemTypes = [
  { name: "Snippets", icon: "📋", color: "#3b82f6" },
  { name: "Prompts", icon: "🤖", color: "#a855f7" },
  { name: "Commands", icon: "⌨️", color: "#f97316" },
  { name: "Notes", icon: "📝", color: "#22c55e" },
  { name: "Files", icon: "📁", color: "#eab308" },
  { name: "Images", icon: "🖼️", color: "#ec4899" },
  { name: "Links", icon: "🔗", color: "#06b6d4" },
];

async function main() {
  console.log("Seeding system item types...");

  for (const type of systemItemTypes) {
    await prisma.itemType.upsert({
      where: { id: type.name.toLowerCase() },
      update: { ...type, isSystem: true },
      create: { id: type.name.toLowerCase(), ...type, isSystem: true },
    });
  }

  console.log(`Seeded ${systemItemTypes.length} system item types.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
