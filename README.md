# Moment Booth Web Workspace

Monorepo for the Moment Booth website and shared UI library.

## Workspaces

- `apps/moment-booth-fe` — Moment Booth website
- `packages/ui-library` — `elij-ui-library` shared React components

The website consumes the local package through the workspace dependency:

```json
"elij-ui-library": "workspace:*"
```

Use Node.js 22.13.0 or newer and pnpm:

```bash
pnpm install
pnpm --filter elij-ui-library build
pnpm --filter moment-booth-fe dev
```
