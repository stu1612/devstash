import Link from "next/link";
import {
  Star,
  Settings,
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link as LinkIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import type { SystemItemType } from "@/lib/db/items";
import type { SidebarCollection } from "@/lib/db/collections";

const iconMap: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link: LinkIcon,
};

interface SidebarContentProps {
  itemTypes: SystemItemType[];
  favoriteCollections: SidebarCollection[];
  recentCollections: SidebarCollection[];
}

export function SidebarContent({
  itemTypes,
  favoriteCollections,
  recentCollections,
}: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col">
      {/* Types */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Types
        </h3>
        <nav className="space-y-0.5">
          {itemTypes.map((type) => {
            const TypeIcon = type.icon ? iconMap[type.icon] : null;
            return (
              <Link
                key={type.id}
                href={`/items/${type.name.toLowerCase()}`}
                className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
              >
                <span className="flex items-center gap-2">
                  {TypeIcon ? (
                    <TypeIcon
                      className="size-4"
                      style={{ color: type.color ?? undefined }}
                    />
                  ) : (
                    <span className="size-4" />
                  )}
                  <span>{type.name}</span>
                </span>
                <span className="text-xs text-muted-foreground">
                  {type.count}
                </span>
              </Link>
            );
          })}
        </nav>

        <Separator className="my-4" />

        {/* Collections */}
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Collections
          </h3>
        </div>

        {/* Favorites */}
        {favoriteCollections.length > 0 && (
          <div className="mt-3">
            <h4 className="mb-1 px-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
              Favorites
            </h4>
            <nav className="space-y-0.5">
              {favoriteCollections.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.id}`}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Star className="size-3.5 fill-yellow-500 text-yellow-500" />
                  <span className="truncate">{collection.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Recent Collections */}
        <div className="mt-3">
          <h4 className="mb-1 px-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
            Recent
          </h4>
          <nav className="space-y-0.5">
            {recentCollections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.id}`}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
              >
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor: collection.dominantColor ?? "#6b7280",
                  }}
                />
                <span className="truncate">{collection.name}</span>
              </Link>
            ))}
          </nav>
          <Link
            href="/collections"
            className="mt-2 block px-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            View all collections
          </Link>
        </div>
      </div>

      {/* User Area */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3">
          <Avatar size="default">
            <AvatarFallback>DS</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">Demo User</p>
            <p className="truncate text-xs text-muted-foreground">
              demo@devstash.io
            </p>
          </div>
          <button className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
            <Settings className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
