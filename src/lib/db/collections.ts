import { prisma } from "@/lib/prisma";

const DEMO_USER_EMAIL = "demo@devstash.io";

export type CollectionWithTypeSummary = {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
  updatedAt: Date;
  types: { name: string; icon: string | null; color: string | null; count: number }[];
  dominantColor: string | null;
};

export async function getRecentCollections(
  limit = 6
): Promise<CollectionWithTypeSummary[]> {
  const collections = await prisma.collection.findMany({
    where: { user: { email: DEMO_USER_EMAIL } },
    orderBy: { updatedAt: "desc" },
    take: limit,
    include: {
      items: {
        include: {
          type: true,
        },
      },
    },
  });

  return collections.map((col) => {
    const typeCounts = new Map<
      string,
      { name: string; icon: string | null; color: string | null; count: number }
    >();

    for (const item of col.items) {
      const existing = typeCounts.get(item.typeId);
      if (existing) {
        existing.count++;
      } else {
        typeCounts.set(item.typeId, {
          name: item.type.name,
          icon: item.type.icon,
          color: item.type.color,
          count: 1,
        });
      }
    }

    const types = Array.from(typeCounts.values()).sort(
      (a, b) => b.count - a.count
    );

    return {
      id: col.id,
      name: col.name,
      description: col.description,
      isFavorite: col.isFavorite,
      itemCount: col.items.length,
      updatedAt: col.updatedAt,
      types,
      dominantColor: types[0]?.color ?? null,
    };
  });
}

export async function getCollectionStats() {
  const user = await prisma.user.findUnique({
    where: { email: DEMO_USER_EMAIL },
    select: { id: true },
  });

  if (!user) {
    return { totalItems: 0, totalCollections: 0, favoriteItems: 0, favoriteCollections: 0 };
  }

  const [totalItems, totalCollections, favoriteItems, favoriteCollections] =
    await Promise.all([
      prisma.item.count({ where: { userId: user.id } }),
      prisma.collection.count({ where: { userId: user.id } }),
      prisma.item.count({ where: { userId: user.id, isFavorite: true } }),
      prisma.collection.count({ where: { userId: user.id, isFavorite: true } }),
    ]);

  return { totalItems, totalCollections, favoriteItems, favoriteCollections };
}
