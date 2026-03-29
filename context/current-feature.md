# Current Feature — Dashboard UI Phase 3

## Status

In Progress

## Goals

- The main area to the right
- Recent collections
- Pinned Items
- 10 Recent items
- 4 stats cards at the top for number of items, collections, favorite items and favorite collections (Not in screenshot)

## Notes

- References: @context/screenshots/dashboard-ui-main.png, @context/project-overview.md, @src/lib/mock-data.ts
- Phase 1 spec at @context/features/dashboard-phase-1-spec.md
- Phase 2 spec at @context/features/dashboard-phase-2-spec.md

## History

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
