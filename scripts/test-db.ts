import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Test connection
  console.log("Testing database connection...\n");

  // Fetch system item types
  const itemTypes = await prisma.itemType.findMany({
    where: { isSystem: true },
    orderBy: { name: "asc" },
  });

  console.log(`Found ${itemTypes.length} system item types:`);
  for (const type of itemTypes) {
    console.log(`  ${type.icon} ${type.name} (${type.color})`);
  }

  // Count all tables
  const [users, items, collections, tags] = await Promise.all([
    prisma.user.count(),
    prisma.item.count(),
    prisma.collection.count(),
    prisma.tag.count(),
  ]);

  console.log("\nTable counts:");
  console.log(`  Users:       ${users}`);
  console.log(`  Items:       ${items}`);
  console.log(`  Collections: ${collections}`);
  console.log(`  Tags:        ${tags}`);

  console.log("\nDatabase connection successful!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Database connection failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
