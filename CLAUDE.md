# Devstash

A Developer knowledge hub for snippets, commands, prompts, notes, files, images, links and custom types.

## Context files

Read the following to get the full context of the project:

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

## Neon MCP Usage

When using the Neon MCP server for any database operations:

- **Project:** Always use the `devstash` project
- **Branch:** Always use the `development` branch by default
- **Production:** NEVER use the production branch unless I explicitly say "production" in my request
- If I ask you to query, inspect, or modify the database without specifying a branch, assume `development`
- Before running any write/destructive operation (INSERT, UPDATE, DELETE, DROP, ALTER), confirm with me first — even on the development branch
- If the Neon MCP tools are not loaded in the current session, tell me rather than silently falling back to a different method
