import { Star } from "lucide-react";
import { iconMap } from "@/lib/icon-map";
import type { ItemWithDetails } from "@/lib/db/items";

interface RecentItemsProps {
  items: ItemWithDetails[];
}

export function RecentItems({ items }: RecentItemsProps) {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Recent Items</h2>
      <div className="space-y-2">
        {items.map((item) => {
          const TypeIcon = item.type.icon ? iconMap[item.type.icon] : null;
          return (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {TypeIcon && (
                    <TypeIcon
                      className="size-4"
                      style={{ color: item.type.color ?? undefined }}
                    />
                  )}
                  <h3 className="font-medium">{item.title}</h3>
                  {item.isFavorite && (
                    <Star className="size-3.5 fill-yellow-500 text-yellow-500" />
                  )}
                </div>
                <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <div className="ml-4 flex flex-col items-end gap-1">
                <span className="text-xs text-muted-foreground">
                  {item.updatedAt.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                {item.language && (
                  <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    {item.language}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
