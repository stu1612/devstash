"use client";

import Link from "next/link";
import { Star, Settings, FolderOpen } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { itemTypes, collections, currentUser } from "@/lib/mock-data";

export function SidebarContent() {
  const favoriteCollections = collections.filter((c) => c.isFavorite);
  const recentCollections = [...collections]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 5);

  return (
    <div className="flex h-full flex-col">
      {/* Types */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Types
        </h3>
        <nav className="space-y-0.5">
          {itemTypes.map((type) => (
            <Link
              key={type.id}
              href={`/items/${type.name.toLowerCase()}`}
              className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
            >
              <span className="flex items-center gap-2">
                <span>{type.icon}</span>
                <span>{type.name}</span>
              </span>
              <span className="text-xs text-muted-foreground">{type.count}</span>
            </Link>
          ))}
        </nav>

        <Separator className="my-4" />

        {/* Collections */}
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Collections
          </h3>
        </div>

        {/* Favorites */}
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

        {/* All Collections (most recent) */}
        <div className="mt-3">
          <h4 className="mb-1 px-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
            All Collections
          </h4>
          <nav className="space-y-0.5">
            {recentCollections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.id}`}
                className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
              >
                <span className="flex items-center gap-2">
                  <FolderOpen className="size-3.5 text-muted-foreground" />
                  <span className="truncate">{collection.name}</span>
                </span>
                <span className="text-xs text-muted-foreground">
                  {collection.itemCount}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* User Area */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3">
          <Avatar size="default">
            <AvatarFallback>
              {currentUser.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{currentUser.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {currentUser.email}
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
