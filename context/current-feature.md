# Current Feature

## Status

Completed

## Goals

None — awaiting next feature.

## Notes

None

## History

### Dashboard Collections - Real DB Data

- Created src/lib/db/collections.ts with getRecentCollections() and getCollectionStats() functions
- getRecentCollections() fetches collections with item type summaries (icon, color, count per type, dominant color)
- getCollectionStats() returns counts for total items, collections, favorite items, and favorite collections
- Updated CollectionsGrid to accept collections as props, render border color from most-used item type, and show Lucide icons for all types in each collection
- Updated StatsCards to accept stats as props instead of importing mock data
- Converted dashboard page to async server component fetching real data in parallel
- Removed mock data imports from CollectionsGrid and StatsCards

### Seed Data

- Installed bcryptjs for password hashing
- Rewrote seed script with full sample data per seed-spec.md
- Created demo user (demo@devstash.io, hashed password, emailVerified)
- Seeded 7 system item types with Lucide icon names and correct colors
- Seeded 5 collections: React Patterns, AI Workflows, DevOps, Terminal Commands, Design Resources
- Seeded 18 items across all collections (snippets, prompts, commands, links)
- Cleaned up old emoji-based item types from previous seed
- Updated test-db.ts to display all seeded data

### Prisma + Neon PostgreSQL Setup

- Installed Prisma 7 with Neon PostgreSQL adapter (@prisma/adapter-pg)
- Created initial schema with User, Item, ItemType, Collection, Tag, ItemTag models
- Added NextAuth models (Account, Session, VerificationToken)
- Added indexes and cascade deletes
- Created initial migration
- Created basic seed script with system item types only

### Dashboard UI Phase 3 - Main Content Area

- Created StatsCards component with 4 stat cards (total items, collections, favorite items, favorite collections)
- Created CollectionsGrid component showing 6 most recent collections in responsive grid with "View all" link
- Created PinnedItems component displaying pinned items with tags, type info, and dates
- Created RecentItems component showing up to 10 most recent items sorted by updatedAt
- Assembled dashboard page with header, stats, collections, pinned, and recent items sections

### Dashboard UI Phase 2 - Sidebar

- Installed shadcn Sheet, Avatar, Separator, Tooltip components
- Created DashboardShell client component with collapsible sidebar and mobile drawer
- Created SidebarContent component with item types (linked to /items/TYPE), favorite collections, most recent collections, and user avatar area
- PanelLeft toggle button for desktop collapse/expand
- Sheet drawer for mobile view
- Simplified dashboard layout to use DashboardShell

### Dashboard UI Phase 1 - Layout & Setup

- Initialized shadcn/ui (base-nova style, neutral theme, Lucide icons)
- Installed Button and Input shadcn components
- Set up dark mode by default (dark class on html element)
- Created /dashboard route with layout and page
- Top bar with DevStash logo, search input (⌘K), New Collection and New Item buttons (display only)
- Sidebar and main area placeholders

### Initial Setup - Next.js Project Scaffolding

- Scaffolded project using `create-next-app` with Next.js 16.2.1, React 19, TypeScript, and Tailwind CSS v4
- Stripped default Next.js boilerplate (removed default SVG assets and starter page content)
- Simplified `src/app/page.tsx` to a minimal Devstash heading
- Reduced `src/app/globals.css` to a single Tailwind import
- Added CLAUDE.md with project description and context file references
- Pushed initial commit to `origin/main` at https://github.com/stu1612/devstash.git
