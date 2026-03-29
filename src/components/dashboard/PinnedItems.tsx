import { Pin, Star } from "lucide-react";
import { items, itemTypes } from "@/lib/mock-data";

export function PinnedItems() {
  const pinnedItems = items.filter((item) => item.isPinned);

  if (pinnedItems.length === 0) return null;

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Pin className="size-4 text-muted-foreground" />
        <h2 className="text-lg font-semibold">Pinned</h2>
      </div>
      <div className="space-y-2">
        {pinnedItems.map((item) => {
          const type = itemTypes.find((t) => t.id === item.typeId);
          return (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{item.title}</h3>
                  <Pin className="size-3 text-muted-foreground" />
                  {item.isFavorite && (
                    <Star className="size-3.5 fill-yellow-500 text-yellow-500" />
                  )}
                </div>
                <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="ml-4 flex flex-col items-end gap-1">
                <span className="text-xs text-muted-foreground">
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                {type && (
                  <span className="text-xs text-muted-foreground">
                    {type.icon} {type.name}
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
