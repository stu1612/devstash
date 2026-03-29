import Link from "next/link";
import { Star } from "lucide-react";
import { collections } from "@/lib/mock-data";

export function CollectionsGrid() {
  const recentCollections = [...collections]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 6);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Collections</h2>
        <Link
          href="/collections"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recentCollections.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.id}`}
            className="group rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/30"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{collection.name}</h3>
                  {collection.isFavorite && (
                    <Star className="size-3.5 fill-yellow-500 text-yellow-500" />
                  )}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {collection.itemCount} items
                </p>
              </div>
            </div>
            <p className="mt-2 line-clamp-1 text-sm text-muted-foreground">
              {collection.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
