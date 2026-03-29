import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { hashSync } from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// ─── SYSTEM ITEM TYPES ──────────────────────────────────
const systemItemTypes = [
  { name: "snippet", icon: "Code", color: "#3b82f6" },
  { name: "prompt", icon: "Sparkles", color: "#8b5cf6" },
  { name: "command", icon: "Terminal", color: "#f97316" },
  { name: "note", icon: "StickyNote", color: "#fde047" },
  { name: "file", icon: "File", color: "#6b7280" },
  { name: "image", icon: "Image", color: "#ec4899" },
  { name: "link", icon: "Link", color: "#10b981" },
];

// ─── COLLECTIONS ────────────────────────────────────────
const collections = [
  { name: "React Patterns", description: "Reusable React patterns and hooks" },
  { name: "AI Workflows", description: "AI prompts and workflow automations" },
  {
    name: "DevOps",
    description: "Infrastructure and deployment resources",
  },
  {
    name: "Terminal Commands",
    description: "Useful shell commands for everyday development",
  },
  {
    name: "Design Resources",
    description: "UI/UX resources and references",
  },
];

// ─── ITEMS BY COLLECTION ────────────────────────────────

const reactPatternsItems = [
  {
    title: "useDebounce Hook",
    contentType: "text",
    language: "typescript",
    typeName: "snippet",
    content: `import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}`,
  },
  {
    title: "Context Provider Pattern",
    contentType: "text",
    language: "typescript",
    typeName: "snippet",
    content: `import { createContext, useContext, useState, ReactNode } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}`,
  },
  {
    title: "Utility: cn (classnames)",
    contentType: "text",
    language: "typescript",
    typeName: "snippet",
    content: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
  },
];

const aiWorkflowsItems = [
  {
    title: "Code Review Prompt",
    contentType: "text",
    typeName: "prompt",
    content: `Review the following code for:
1. Security vulnerabilities (injection, XSS, auth bypass)
2. Performance issues (N+1 queries, unnecessary re-renders, memory leaks)
3. Error handling gaps (unhandled promises, missing edge cases)
4. Code style and readability

Provide specific line-by-line feedback with severity levels: critical, warning, suggestion.`,
  },
  {
    title: "Documentation Generator",
    contentType: "text",
    typeName: "prompt",
    content: `Generate comprehensive documentation for the following code:

1. Overview: What does this module/function do?
2. Parameters: List each parameter with type and description
3. Return value: What is returned and when
4. Usage examples: Show 2-3 practical examples
5. Edge cases: Document any gotchas or limitations

Use JSDoc format for JavaScript/TypeScript code.`,
  },
  {
    title: "Refactoring Assistant",
    contentType: "text",
    typeName: "prompt",
    content: `Analyze this code and suggest refactoring improvements:

1. Identify code smells (duplication, long methods, deep nesting)
2. Suggest design pattern applications where appropriate
3. Recommend extraction of reusable functions or hooks
4. Ensure changes maintain backward compatibility
5. Provide before/after code examples for each suggestion

Prioritize changes by impact: high, medium, low.`,
  },
];

const devOpsItems = [
  {
    title: "Multi-Stage Dockerfile",
    contentType: "text",
    language: "dockerfile",
    typeName: "snippet",
    content: `FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM base AS build
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json

USER nextjs
EXPOSE 3000
CMD ["npm", "start"]`,
  },
  {
    title: "Deploy to Production",
    contentType: "text",
    typeName: "command",
    content: `git checkout main && git pull origin main && npm run build && npm run start`,
    description: "Build and start production server from latest main branch",
  },
  {
    title: "Vercel Documentation",
    contentType: "text",
    typeName: "link",
    url: "https://vercel.com/docs",
    description: "Official Vercel platform documentation for deployments and serverless functions",
  },
  {
    title: "GitHub Actions Docs",
    contentType: "text",
    typeName: "link",
    url: "https://docs.github.com/en/actions",
    description: "GitHub Actions CI/CD documentation for workflow automation",
  },
];

const terminalCommandsItems = [
  {
    title: "Git Interactive Rebase",
    contentType: "text",
    typeName: "command",
    content: `git rebase -i HEAD~5`,
    description:
      "Interactively rebase last 5 commits to squash, reorder, or edit",
  },
  {
    title: "Docker Cleanup",
    contentType: "text",
    typeName: "command",
    content: `docker system prune -af --volumes`,
    description:
      "Remove all unused containers, networks, images, and volumes",
  },
  {
    title: "Kill Process on Port",
    contentType: "text",
    typeName: "command",
    content: `lsof -ti:3000 | xargs kill -9`,
    description: "Find and kill any process running on port 3000",
  },
  {
    title: "NPM Dependency Check",
    contentType: "text",
    typeName: "command",
    content: `npx npm-check-updates -u && npm install`,
    description: "Check for outdated packages and update all to latest versions",
  },
];

const designResourcesItems = [
  {
    title: "Tailwind CSS Documentation",
    contentType: "text",
    typeName: "link",
    url: "https://tailwindcss.com/docs",
    description: "Official Tailwind CSS documentation and utility reference",
  },
  {
    title: "shadcn/ui Components",
    contentType: "text",
    typeName: "link",
    url: "https://ui.shadcn.com",
    description:
      "Beautifully designed components built with Radix UI and Tailwind CSS",
  },
  {
    title: "Radix UI Primitives",
    contentType: "text",
    typeName: "link",
    url: "https://www.radix-ui.com/primitives",
    description:
      "Unstyled, accessible UI component primitives for building design systems",
  },
  {
    title: "Lucide Icons",
    contentType: "text",
    typeName: "link",
    url: "https://lucide.dev/icons",
    description:
      "Beautiful and consistent open-source icon library used by shadcn/ui",
  },
];

// ─── MAIN ───────────────────────────────────────────────

async function main() {
  // 1. Create demo user
  console.log("Seeding demo user...");
  const hashedPassword = hashSync("12345678", 12);

  const user = await prisma.user.upsert({
    where: { email: "demo@devstash.io" },
    update: {},
    create: {
      email: "demo@devstash.io",
      name: "Demo User",
      password: hashedPassword,
      isPro: false,
      emailVerified: new Date(),
    },
  });

  console.log(`User: ${user.email} (${user.id})`);

  // 2. Clean up old item types from previous seed
  const oldTypeIds = ["snippets", "prompts", "commands", "notes", "files", "images", "links"];
  await prisma.itemType.deleteMany({ where: { id: { in: oldTypeIds } } });

  // 3. Seed system item types
  console.log("Seeding system item types...");
  const typeMap = new Map<string, string>();

  for (const type of systemItemTypes) {
    const created = await prisma.itemType.upsert({
      where: { id: type.name },
      update: { ...type, isSystem: true },
      create: { id: type.name, ...type, isSystem: true },
    });
    typeMap.set(created.name, created.id);
  }

  console.log(`Seeded ${systemItemTypes.length} system item types.`);

  // 3. Seed collections
  console.log("Seeding collections...");
  const collectionMap = new Map<string, string>();

  for (const col of collections) {
    const created = await prisma.collection.upsert({
      where: {
        id: col.name.toLowerCase().replace(/\s+/g, "-"),
      },
      update: { ...col, userId: user.id },
      create: {
        id: col.name.toLowerCase().replace(/\s+/g, "-"),
        ...col,
        userId: user.id,
      },
    });
    collectionMap.set(created.name, created.id);
  }

  console.log(`Seeded ${collections.length} collections.`);

  // 4. Seed items
  console.log("Seeding items...");

  // Clear existing items to allow clean re-seeding
  await prisma.itemTag.deleteMany({});
  await prisma.item.deleteMany({ where: { userId: user.id } });

  const allItemGroups: {
    collectionName: string;
    items: Array<{
      title: string;
      contentType: string;
      language?: string;
      typeName: string;
      content?: string;
      url?: string;
      description?: string;
    }>;
  }[] = [
    { collectionName: "React Patterns", items: reactPatternsItems },
    { collectionName: "AI Workflows", items: aiWorkflowsItems },
    { collectionName: "DevOps", items: devOpsItems },
    { collectionName: "Terminal Commands", items: terminalCommandsItems },
    { collectionName: "Design Resources", items: designResourcesItems },
  ];

  let itemCount = 0;

  for (const group of allItemGroups) {
    const collectionId = collectionMap.get(group.collectionName)!;

    for (const item of group.items) {
      const { typeName, ...itemData } = item;
      const typeId = typeMap.get(typeName)!;

      await prisma.item.create({
        data: {
          ...itemData,
          typeId,
          collectionId,
          userId: user.id,
        },
      });
      itemCount++;
    }
  }

  console.log(`Seeded ${itemCount} items.`);
  console.log("Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
