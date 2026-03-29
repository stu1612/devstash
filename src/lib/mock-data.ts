// ─── TYPES ───────────────────────────────────────────

export type ItemType = {
  id: string;
  name: string;
  icon: string;
  color: string;
  isSystem: boolean;
  count: number;
};

export type Collection = {
  id: string;
  name: string;
  description: string;
  isFavorite: boolean;
  itemCount: number;
  createdAt: string;
  updatedAt: string;
};

export type Tag = {
  id: string;
  name: string;
};

export type Item = {
  id: string;
  title: string;
  description: string;
  contentType: "text" | "file";
  content: string;
  language: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  typeId: string;
  collectionId: string | null;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  isPro: boolean;
};

// ─── CURRENT USER ────────────────────────────────────

export const currentUser: User = {
  id: "user_1",
  name: "John Doe",
  email: "john@example.com",
  isPro: true,
};

// ─── ITEM TYPES ──────────────────────────────────────

export const itemTypes: ItemType[] = [
  { id: "type_1", name: "Snippets", icon: "📋", color: "#3b82f6", isSystem: true, count: 24 },
  { id: "type_2", name: "Prompts", icon: "🤖", color: "#a855f7", isSystem: true, count: 18 },
  { id: "type_3", name: "Commands", icon: "⌨️", color: "#f97316", isSystem: true, count: 15 },
  { id: "type_4", name: "Notes", icon: "📝", color: "#22c55e", isSystem: true, count: 12 },
  { id: "type_5", name: "Files", icon: "📁", color: "#eab308", isSystem: true, count: 5 },
  { id: "type_6", name: "Images", icon: "🖼️", color: "#ec4899", isSystem: true, count: 3 },
  { id: "type_7", name: "Links", icon: "🔗", color: "#06b6d4", isSystem: true, count: 8 },
];

// ─── COLLECTIONS ─────────────────────────────────────

export const collections: Collection[] = [
  {
    id: "col_1",
    name: "React Patterns",
    description: "Common React patterns and hooks",
    isFavorite: true,
    itemCount: 12,
    createdAt: "2026-02-15T10:00:00Z",
    updatedAt: "2026-03-28T14:30:00Z",
  },
  {
    id: "col_2",
    name: "Python Snippets",
    description: "Useful Python code snippets",
    isFavorite: false,
    itemCount: 8,
    createdAt: "2026-02-20T09:00:00Z",
    updatedAt: "2026-03-25T11:00:00Z",
  },
  {
    id: "col_3",
    name: "Context Files",
    description: "AI context files for projects",
    isFavorite: true,
    itemCount: 5,
    createdAt: "2026-03-01T08:00:00Z",
    updatedAt: "2026-03-27T16:00:00Z",
  },
  {
    id: "col_4",
    name: "Interview Prep",
    description: "Technical interview preparation",
    isFavorite: false,
    itemCount: 24,
    createdAt: "2026-01-10T12:00:00Z",
    updatedAt: "2026-03-20T10:00:00Z",
  },
  {
    id: "col_5",
    name: "Git Commands",
    description: "Frequently used git commands",
    isFavorite: true,
    itemCount: 15,
    createdAt: "2026-02-05T14:00:00Z",
    updatedAt: "2026-03-26T09:00:00Z",
  },
  {
    id: "col_6",
    name: "AI Prompts",
    description: "Curated AI prompts for coding",
    isFavorite: false,
    itemCount: 18,
    createdAt: "2026-03-10T11:00:00Z",
    updatedAt: "2026-03-29T08:00:00Z",
  },
];

// ─── ITEMS ───────────────────────────────────────────

export const items: Item[] = [
  {
    id: "item_1",
    title: "useAuth Hook",
    description: "Custom authentication hook for React applications",
    contentType: "text",
    content: `import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    checkAuth().then(setUser).finally(() => setLoading(false));
  }, []);

  return { user, loading, login, logout };
}`,
    language: "typescript",
    isFavorite: true,
    isPinned: true,
    typeId: "type_1",
    collectionId: "col_1",
    tags: [
      { id: "tag_1", name: "react" },
      { id: "tag_2", name: "auth" },
      { id: "tag_3", name: "hooks" },
    ],
    createdAt: "2026-03-16T10:00:00Z",
    updatedAt: "2026-03-16T10:00:00Z",
  },
  {
    id: "item_2",
    title: "API Error Handling Pattern",
    description: "Fetch wrapper with exponential backoff retry logic",
    contentType: "text",
    content: `async function fetchWithRetry(url: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.statusText);
      return await res.json();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(r => setTimeout(r, 2 ** i * 1000));
    }
  }
}`,
    language: "typescript",
    isFavorite: false,
    isPinned: true,
    typeId: "type_1",
    collectionId: "col_1",
    tags: [
      { id: "tag_4", name: "api" },
      { id: "tag_5", name: "error-handling" },
      { id: "tag_6", name: "fetch" },
    ],
    createdAt: "2026-03-18T14:00:00Z",
    updatedAt: "2026-03-18T14:00:00Z",
  },
  {
    id: "item_3",
    title: "Git Rebase Workflow",
    description: "Interactive rebase commands for clean history",
    contentType: "text",
    content: "git rebase -i HEAD~3",
    language: "bash",
    isFavorite: false,
    isPinned: false,
    typeId: "type_3",
    collectionId: "col_5",
    tags: [
      { id: "tag_7", name: "git" },
      { id: "tag_8", name: "rebase" },
    ],
    createdAt: "2026-03-10T09:00:00Z",
    updatedAt: "2026-03-10T09:00:00Z",
  },
  {
    id: "item_4",
    title: "Code Review Prompt",
    description: "AI prompt for thorough code review",
    contentType: "text",
    content: "Review this code for bugs, performance issues, and security vulnerabilities. Suggest improvements with explanations.",
    language: null,
    isFavorite: true,
    isPinned: false,
    typeId: "type_2",
    collectionId: "col_6",
    tags: [
      { id: "tag_9", name: "ai" },
      { id: "tag_10", name: "code-review" },
    ],
    createdAt: "2026-03-12T11:00:00Z",
    updatedAt: "2026-03-12T11:00:00Z",
  },
  {
    id: "item_5",
    title: "Python List Comprehension",
    description: "Common list comprehension patterns",
    contentType: "text",
    content: `# Filter and transform
result = [x * 2 for x in numbers if x > 0]

# Nested comprehension
matrix = [[1,2],[3,4]]
flat = [x for row in matrix for x in row]`,
    language: "python",
    isFavorite: false,
    isPinned: false,
    typeId: "type_1",
    collectionId: "col_2",
    tags: [
      { id: "tag_11", name: "python" },
      { id: "tag_12", name: "lists" },
    ],
    createdAt: "2026-03-05T16:00:00Z",
    updatedAt: "2026-03-05T16:00:00Z",
  },
  {
    id: "item_6",
    title: "Docker Compose Basics",
    description: "Essential docker-compose commands",
    contentType: "text",
    content: "docker-compose up -d --build",
    language: "bash",
    isFavorite: false,
    isPinned: false,
    typeId: "type_3",
    collectionId: null,
    tags: [
      { id: "tag_13", name: "docker" },
      { id: "tag_14", name: "devops" },
    ],
    createdAt: "2026-03-08T13:00:00Z",
    updatedAt: "2026-03-08T13:00:00Z",
  },
  {
    id: "item_7",
    title: "Meeting Notes - Sprint Planning",
    description: "Sprint 12 planning notes and action items",
    contentType: "text",
    content: "## Sprint 12 Goals\n- Complete auth flow\n- Start items CRUD\n- Design collection UI",
    language: null,
    isFavorite: false,
    isPinned: false,
    typeId: "type_4",
    collectionId: null,
    tags: [
      { id: "tag_15", name: "meetings" },
      { id: "tag_16", name: "planning" },
    ],
    createdAt: "2026-03-22T09:00:00Z",
    updatedAt: "2026-03-22T09:00:00Z",
  },
  {
    id: "item_8",
    title: "MDN Web Docs",
    description: "Mozilla Developer Network reference",
    contentType: "text",
    content: "https://developer.mozilla.org",
    language: null,
    isFavorite: true,
    isPinned: false,
    typeId: "type_7",
    collectionId: null,
    tags: [
      { id: "tag_17", name: "reference" },
      { id: "tag_18", name: "docs" },
    ],
    createdAt: "2026-02-28T10:00:00Z",
    updatedAt: "2026-02-28T10:00:00Z",
  },
];
