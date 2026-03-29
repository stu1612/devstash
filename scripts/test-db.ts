import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Testing database connection...\n");

  // 1. Demo user
  const user = await prisma.user.findUnique({
    where: { email: "demo@devstash.io" },
    select: { id: true, name: true, email: true, isPro: true, emailVerified: true },
  });

  if (!user) {
    console.log("No demo user found. Run the seed first.");
    return;
  }

  console.log("Demo User:");
  console.log(`  ${user.name} (${user.email})`);
  console.log(`  Pro: ${user.isPro} | Verified: ${user.emailVerified ? "yes" : "no"}\n`);

  // 2. System item types
  const itemTypes = await prisma.itemType.findMany({
    where: { isSystem: true },
    orderBy: { name: "asc" },
  });

  console.log(`System Item Types (${itemTypes.length}):`);
  for (const type of itemTypes) {
    console.log(`  ${type.icon?.padEnd(12)} ${type.name.padEnd(10)} ${type.color}`);
  }

  // 3. Collections with item counts
  const collections = await prisma.collection.findMany({
    where: { userId: user.id },
    include: { _count: { select: { items: true } } },
    orderBy: { name: "asc" },
  });

  console.log(`\nCollections (${collections.length}):`);
  for (const col of collections) {
    console.log(`  ${col.name} — ${col._count.items} items — "${col.description}"`);
  }

  // 4. Items grouped by collection
  const items = await prisma.item.findMany({
    where: { userId: user.id },
    include: { type: true, collection: true },
    orderBy: [{ collection: { name: "asc" } }, { title: "asc" }],
  });

  console.log(`\nAll Items (${items.length}):`);
  let lastCollection = "";
  for (const item of items) {
    const colName = item.collection?.name ?? "Uncollected";
    if (colName !== lastCollection) {
      console.log(`\n  [${colName}]`);
      lastCollection = colName;
    }
    const extras = [
      item.language && `lang:${item.language}`,
      item.url && `url:${item.url}`,
    ]
      .filter(Boolean)
      .join(" | ");

    console.log(`    ${item.type.icon?.padEnd(12)} ${item.title}${extras ? ` (${extras})` : ""}`);
  }

  // 5. Table counts
  const [users, itemCount, colCount, tags] = await Promise.all([
    prisma.user.count(),
    prisma.item.count(),
    prisma.collection.count(),
    prisma.tag.count(),
  ]);

  console.log("\nTable Counts:");
  console.log(`  Users:       ${users}`);
  console.log(`  Items:       ${itemCount}`);
  console.log(`  Collections: ${colCount}`);
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
