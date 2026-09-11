# Workspace Coding Rules

These rules apply to every coding agent in this repository.

## Approval workflow

1. Inspect the relevant app or package first.
2. State the plan, affected files, and risks.
3. Wait for explicit user approval before creating, editing, or deleting files.
4. After approval, make only the scoped changes.
5. Run relevant build, typecheck, lint, and test commands.
6. Report every created, modified, and intentionally unchanged file.

## Git and external actions

- Do not run `git commit`, `git push`, `npm publish`, or deployment commands automatically.
- Perform each action only after the user explicitly requests it.
- Preserve existing user changes and never use destructive Git commands without confirmation.

## Coding standards

- Use the configured package manager and Node.js version.
- Prefer small, focused, reversible changes.
- Reuse existing components, utilities, and dependencies.
- Keep TypeScript types explicit and public APIs backward-compatible.
- Add or update tests for behavior changes.
- Use semantic HTML, keyboard interaction, and accessible labels for UI.
- Keep secrets and private customer data out of source and documentation.

## Monorepo rules

- Confirm the target app or package before editing.
- Keep workspace dependency ranges and lockfiles synchronized.
- Do not modify unrelated packages.
- Release work requires all applicable build and test checks to pass first.
