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
      _count: { select: { items: true } },
    },
  });

  const collectionIds = collections.map((c) => c.id);

  const [typeCounts, typeRows] = await Promise.all([
    prisma.item.groupBy({
      by: ["collectionId", "typeId"],
      where: { collectionId: { in: collectionIds } },
      _count: { _all: true },
    }),
    prisma.itemType.findMany({
      where: {
        items: { some: { collectionId: { in: collectionIds } } },
      },
      select: { id: true, name: true, icon: true, color: true },
    }),
  ]);

  const typeMap = new Map(typeRows.map((t) => [t.id, t]));

  return collections.map((col) => {
    const colTypes = typeCounts
      .filter((tc) => tc.collectionId === col.id)
      .map((tc) => {
        const type = typeMap.get(tc.typeId)!;
        return { name: type.name, icon: type.icon, color: type.color, count: tc._count._all };
      })
      .sort((a, b) => b.count - a.count);

    return {
      id: col.id,
      name: col.name,
      description: col.description,
      isFavorite: col.isFavorite,
      itemCount: col._count.items,
      updatedAt: col.updatedAt,
      types: colTypes,
      dominantColor: colTypes[0]?.color ?? null,
    };
  });
}

export type SidebarCollection = {
  id: string;
  name: string;
  isFavorite: boolean;
  dominantColor: string | null;
};

async function getDominantColors(
  collectionIds: string[]
): Promise<Map<string, string | null>> {
  const typeCounts = await prisma.item.groupBy({
    by: ["collectionId", "typeId"],
    where: { collectionId: { in: collectionIds } },
    _count: { _all: true },
  });

  const typeIds = [...new Set(typeCounts.map((tc) => tc.typeId))];
  const types = await prisma.itemType.findMany({
    where: { id: { in: typeIds } },
    select: { id: true, color: true },
  });
  const colorMap = new Map(types.map((t) => [t.id, t.color]));

  const result = new Map<string, string | null>();
  for (const colId of collectionIds) {
    const top = typeCounts
      .filter((tc) => tc.collectionId === colId)
      .sort((a, b) => b._count._all - a._count._all)[0];
    result.set(colId, top ? (colorMap.get(top.typeId) ?? null) : null);
  }
  return result;
}

export async function getFavoriteCollections(): Promise<SidebarCollection[]> {
  const collections = await prisma.collection.findMany({
    where: { user: { email: DEMO_USER_EMAIL }, isFavorite: true },
    orderBy: { updatedAt: "desc" },
    select: { id: true, name: true, isFavorite: true },
  });

  const colors = await getDominantColors(collections.map((c) => c.id));

  return collections.map((col) => ({
    id: col.id,
    name: col.name,
    isFavorite: col.isFavorite,
    dominantColor: colors.get(col.id) ?? null,
  }));
}

export async function getSidebarRecentCollections(
  limit = 5
): Promise<SidebarCollection[]> {
  const collections = await prisma.collection.findMany({
    where: { user: { email: DEMO_USER_EMAIL } },
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: { id: true, name: true, isFavorite: true },
  });

  const colors = await getDominantColors(collections.map((c) => c.id));

  return collections.map((col) => ({
    id: col.id,
    name: col.name,
    isFavorite: col.isFavorite,
    dominantColor: colors.get(col.id) ?? null,
  }));
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
