# Elij UI — Phase 2 Technical Design

**Status:** Complete  
**Last updated:** 2026-09-10  
**Scope:** Registry discovery CLI and npm distribution

## 1. Objective

Phase 2 provides a small, scriptable command-line interface for discovering Elij UI components. It turns the Phase 1 registry into a practical developer workflow while keeping all commands read-only.

## 2. Package identity

```text
npm package: elij-ui-library-cli
executable:  elij-ui
current npm: 0.1.1
runtime dependency: elij-ui-library ^0.2.1
```

The package name identifies the npm distribution. The shorter executable is the preferred developer-facing command.

## 3. Repository location

```text
packages/elij-ui-library-cli/
├── src/index.ts
├── test/cli.test.mjs
├── dist/index.js
├── README.md
├── package.json
└── tsconfig.json
```

## 4. Command contract

### `list`

Lists every registry entry in deterministic order.

```bash
elij-ui list
```

### `search <query>`

Searches component name, category, and description using a case-insensitive query.

```bash
elij-ui search chart
```

### `info <component>`

Displays a component's category, description, canonical import, Storybook story, and props.

```bash
elij-ui info Button
```

Unknown component names must return a non-zero exit status.

### `doctor`

Reports the loaded registry package, registry version, component count, and readiness.

```bash
elij-ui doctor
```

## 5. Runtime design

The CLI loads `elij-ui-library/registry` through the package export. It does not access a monorepo-relative path, local website assets, or Storybook build output. This makes the published CLI reproducible in any npm project.

The current command layer is intentionally dependency-light. It uses Node's runtime and the compiled `dist/index.js` entry point.

## 6. Build and test workflow

The package build compiles `src` into `dist`. The test script builds first, then runs the compiled CLI through Node's built-in test runner:

```bash
corepack yarn workspace elij-ui-library-cli test
```

The five required tests are:

1. `doctor` reports a ready registry.
2. `list` contains known components.
3. `info Button` returns component metadata.
4. `search button` returns a matching component.
5. An unknown component exits with an error.

The npm dry-run must include:

```text
README.md
dist/index.js
package.json
```

## 7. Installation and usage

For a project-local installation:

```bash
npm install --save-dev elij-ui-library-cli@0.1.1
npx --no-install elij-ui list
```

For a one-off environment, a package manager may run the published package directly. The project-local installation is preferred because it pins the CLI version for the team and CI.

## 8. Release process

1. Update README, tests, or implementation.
2. Increment the CLI version manually or with a workspace-safe release workflow.
3. Run build, tests, and package dry-run under Node `22.13.0`.
4. Commit the release.
5. Publish with `npm publish --access public`.
6. Verify with `npm view elij-ui-library-cli version` and a clean installation.

Do not introduce a second `package-lock.json` into the Yarn monorepo. Use the root Yarn lockfile and run `corepack yarn install` from the workspace root.

## 9. Non-goals for 0.1.x

The first CLI release does not write project files, install components, modify imports, or run arbitrary scripts. Those actions require a separate design for conflict handling, permissions, backups, and user confirmation.

## 10. Phase 3 handoff

The CLI and the future MCP server share the same registry contract. Any registry schema change must be validated against both consumers. The CLI remains the human-facing inspection tool; MCP will expose the same read-only capabilities to AI hosts.
