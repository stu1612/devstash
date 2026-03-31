import { prisma } from "@/lib/prisma";

const DEMO_USER_EMAIL = "demo@devstash.io";

export type ItemWithDetails = {
  id: string;
  title: string;
  description: string | null;
  language: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
  type: {
    name: string;
    icon: string | null;
    color: string | null;
  };
  tags: { name: string }[];
};

export async function getPinnedItems(): Promise<ItemWithDetails[]> {
  const items = await prisma.item.findMany({
    where: {
      user: { email: DEMO_USER_EMAIL },
      isPinned: true,
    },
    orderBy: { createdAt: "desc" },
    include: {
      type: { select: { name: true, icon: true, color: true } },
      tags: {
        include: { tag: { select: { name: true } } },
      },
    },
  });

  return items.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    language: item.language,
    isFavorite: item.isFavorite,
    isPinned: item.isPinned,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    type: item.type,
    tags: item.tags.map((it) => ({ name: it.tag.name })),
  }));
}

export type SystemItemType = {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
  count: number;
};

export async function getSystemItemTypes(): Promise<SystemItemType[]> {
  const types = await prisma.itemType.findMany({
    where: { isSystem: true },
    include: {
      _count: { select: { items: true } },
    },
    orderBy: { name: "asc" },
  });

  return types.map((t) => ({
    id: t.id,
    name: t.name,
    icon: t.icon,
    color: t.color,
    count: t._count.items,
  }));
}

export async function getRecentItems(
  limit = 10
): Promise<ItemWithDetails[]> {
  const items = await prisma.item.findMany({
    where: {
      user: { email: DEMO_USER_EMAIL },
    },
    orderBy: { updatedAt: "desc" },
    take: limit,
    include: {
      type: { select: { name: true, icon: true, color: true } },
      tags: {
        include: { tag: { select: { name: true } } },
      },
    },
  });

  return items.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    language: item.language,
    isFavorite: item.isFavorite,
    isPinned: item.isPinned,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    type: item.type,
    tags: item.tags.map((it) => ({ name: it.tag.name })),
  }));
}
