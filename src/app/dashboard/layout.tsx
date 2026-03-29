import { Search, Plus, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      {/* Top Bar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">S</span>
          </div>
          <span className="text-lg font-semibold">DevStash</span>
        </div>

        {/* Center: Search */}
        <div className="relative mx-4 max-w-md flex-1">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            className="pl-9 pr-12"
          />
          <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
            ⌘K
          </kbd>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FolderPlus className="size-4" />
            New Collection
          </Button>
          <Button size="sm">
            <Plus className="size-4" />
            New Item
          </Button>
        </div>
      </header>

      {/* Body: Sidebar + Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="flex w-60 shrink-0 flex-col border-r border-border p-4">
          <h2 className="text-lg font-semibold text-muted-foreground">Sidebar</h2>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
