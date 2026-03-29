# Current Feature — Seed Data

## Status

In Progress

## Goals

- Overwrite existing seed script (`prisma/seed.ts`) with full sample data
- Create a demo user (demo@devstash.io, password hashed with bcryptjs)
- Seed all 7 system item types using Lucide icon names and correct colors
- Seed 5 collections: React Patterns, AI Workflows, DevOps, Terminal Commands, Design Resources
- Seed items into each collection per seed-spec.md (snippets, prompts, commands, links)
- Use upserts where possible to allow re-running

## Notes

- Spec: @context/features/seed-spec.md
- References: @context/project-overview.md, @context/coding-standards.md

## History

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
