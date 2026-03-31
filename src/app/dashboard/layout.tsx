import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { getSystemItemTypes } from "@/lib/db/items";
import {
  getFavoriteCollections,
  getSidebarRecentCollections,
} from "@/lib/db/collections";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [itemTypes, favoriteCollections, recentCollections] = await Promise.all([
    getSystemItemTypes(),
    getFavoriteCollections(),
    getSidebarRecentCollections(5),
  ]);

  return (
    <DashboardShell
      itemTypes={itemTypes}
      favoriteCollections={favoriteCollections}
      recentCollections={recentCollections}
    >
      {children}
    </DashboardShell>
  );
}
