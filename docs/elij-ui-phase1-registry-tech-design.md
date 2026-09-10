# Elij UI — Phase 1 Technical Design

**Status:** Complete  
**Last updated:** 2026-09-10  
**Scope:** Component registry, npm package metadata, Storybook catalog, and release foundation

## 1. Objective

Phase 1 makes `elij-ui-library` discoverable by tooling without coupling tooling to TypeScript source files or Storybook internals. The registry is the stable metadata contract used by the CLI today and the MCP server later.

## 2. Deliverables

- Published React/TypeScript library: `elij-ui-library@0.2.1`.
- Published registry data at `elij-ui-library/registry`.
- Registry schema at `elij-ui-library/registry/schema`.
- Storybook `Registry/Catalog` story for human review.
- Registry tests covering structure, uniqueness, required metadata, and key components.
- README installation and future tooling guidance.
- Changelog-based release notes.

## 3. Repository location

```text
packages/elij-ui-library/
├── registry/
│   ├── components.json
│   └── schema.json
├── src/
│   ├── RegistryCatalog.stories.tsx
│   └── registry.test.ts
├── CHANGELOG.md
├── README.md
└── package.json
```

## 4. Registry contract

`components.json` contains the package identity, registry version, and a deterministic component list. Every entry records:

```text
name          public component name
kind          component, chart, layout, or provider
category      discovery category
description   short human-readable purpose
import        canonical import statement
story         Storybook story path
props         supported public prop names
```

The registry is descriptive metadata. It is not a replacement for TypeScript declarations and is not required at runtime by React components.

Current baseline:

```text
package:     elij-ui-library
registry:    0.2.0
components:  54
npm package: 0.2.1
```

## 5. Package exports

The package exposes:

```text
elij-ui-library              runtime components and types
elij-ui-library/styles.css   shared styles
elij-ui-library/registry     components.json
elij-ui-library/registry/schema schema.json
```

The npm `files` allowlist includes `dist` and `registry`, so a package dry-run must show both registry JSON files.

## 6. Validation

Run with Node `22.13.0` and Yarn `4.9.2`:

```bash
corepack yarn workspace elij-ui-library test
corepack yarn workspace elij-ui-library typecheck
corepack yarn workspace elij-ui-library lint
corepack yarn workspace elij-ui-library build
corepack yarn workspace elij-ui-library build-storybook
```

The registry tests must verify:

1. JSON and schema parse successfully.
2. The registry package and version are present.
3. Component names are unique.
4. Descriptions, imports, stories, and props are non-empty.
5. Key reusable components are present.

## 7. Release process

1. Update the registry metadata and changelog.
2. Update the library version according to semver.
3. Run the full validation commands.
4. Run `npm pack --ignore-scripts --dry-run` from the package directory.
5. Confirm `dist/`, `registry/components.json`, and `registry/schema.json` are included.
6. Commit the release changes.
7. Publish with `npm publish --access public`.
8. Verify with `npm view elij-ui-library version` and a clean tarball install.

## 8. Design decisions

- Registry data lives in the library package because consumers need the same versioned metadata as the runtime components.
- The website keeps event-specific data and images; the registry contains reusable component metadata only.
- CLI and MCP code must consume the registry export rather than parse source files or Storybook output.
- Registry ordering must remain deterministic to support stable CLI output and future model context caching.

## 9. Future extensions

Possible additive fields include `examples`, `accessibility`, `variants`, `deprecated`, and `relatedComponents`. Additive fields should remain backward-compatible and be reflected in `schema.json` and tests.
