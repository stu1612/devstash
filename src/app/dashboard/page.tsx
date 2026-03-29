import { StatsCards } from "@/components/dashboard/StatsCards";
import { CollectionsGrid } from "@/components/dashboard/CollectionsGrid";
import { PinnedItems } from "@/components/dashboard/PinnedItems";
import { RecentItems } from "@/components/dashboard/RecentItems";
import {
  getRecentCollections,
  getCollectionStats,
} from "@/lib/db/collections";

export default async function DashboardPage() {
  const [collections, stats] = await Promise.all([
    getRecentCollections(6),
    getCollectionStats(),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Your developer knowledge hub</p>
      </div>

      {/* Stats */}
      <StatsCards
        totalItems={stats.totalItems}
        totalCollections={stats.totalCollections}
        favoriteItems={stats.favoriteItems}
        favoriteCollections={stats.favoriteCollections}
      />

      {/* Collections */}
      <CollectionsGrid collections={collections} />

      {/* Pinned */}
      <PinnedItems />

      {/* Recent Items */}
      <RecentItems />
    </div>
  );
}
