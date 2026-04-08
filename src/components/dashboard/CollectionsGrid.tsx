import Link from "next/link";
import { Star } from "lucide-react";
import { iconMap } from "@/lib/icon-map";
import type { CollectionWithTypeSummary } from "@/lib/db/collections";

interface CollectionsGridProps {
  collections: CollectionWithTypeSummary[];
}

export function CollectionsGrid({ collections }: CollectionsGridProps) {
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
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.id}`}
            className="group rounded-lg border bg-card p-4 transition-colors hover:border-primary/30"
            style={{
              borderColor: collection.dominantColor
                ? `${collection.dominantColor}40`
                : undefined,
            }}
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
            {collection.types.length > 0 && (
              <div className="mt-3 flex items-center gap-1.5">
                {collection.types.map((type) => {
                  const Icon = type.icon ? iconMap[type.icon] : null;
                  return Icon ? (
                    <Icon
                      key={type.name}
                      className="size-3.5"
                      style={{ color: type.color ?? undefined }}
                    />
                  ) : null;
                })}
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
