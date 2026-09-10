# Elij UI — Phase 3 MCP Server Technical Design

**Status:** Proposed  
**Last updated:** 2026-09-10  
**Scope:** Read-only Model Context Protocol server for Elij UI discovery

## 1. Executive summary

Phase 3 adds `elij-ui-library-mcp`, an MCP server that exposes the published Elij UI registry to MCP-compatible AI clients. The first release is intentionally read-only: it helps an AI discover components, understand props, and produce accurate import guidance without changing a user's files.

The server should consume `elij-ui-library/registry`, exactly like the CLI. It must not parse source code, Storybook internals, or the Moment Booth website.

## 2. Goals

### Goals

- Expose a standards-compliant MCP server over local stdio transport.
- Provide deterministic, validated component discovery.
- Return structured results that are useful to both models and human-facing clients.
- Reuse the published registry and its schema.
- Make the server easy to test locally and configure in an MCP host.
- Keep the first release safe by avoiding file writes and arbitrary command execution.

### Non-goals for 0.1.0

- Generating or modifying project files.
- Installing npm dependencies.
- Editing Storybook stories.
- Accessing private repositories or user files.
- Remote hosting or authentication.
- Dynamic registry mutation.

## 3. Package and repository structure

```text
packages/elij-ui-library-mcp/
├── src/
│   ├── index.ts              # server entry point
│   ├── registry.ts           # typed registry loading and filtering
│   └── tools.ts              # MCP tool definitions
├── test/
│   ├── registry.test.mjs
│   └── server.test.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Recommended package identity:

```text
npm package: elij-ui-library-mcp
server name: elij-ui-library
initial version: 0.1.0
runtime: Node 22.13.0+
```

## 4. Runtime dependencies

Use the current official TypeScript MCP server package and stdio transport shown in the MCP server tutorial:

```text
@modelcontextprotocol/server
@modelcontextprotocol/server/stdio
zod
elij-ui-library ^0.2.1
```

Before implementation, confirm the currently published SDK package and API names because MCP SDK packages can evolve. Pin a compatible version in `package.json` and commit the root Yarn lockfile.

## 5. Transport choice

### Initial transport: stdio

```text
MCP host → child process → elij-ui-library-mcp → registry
```

stdio is the right first transport for Claude Desktop, Cursor, and local development. The host launches the compiled entry point with an absolute path.

The server must never write logs to stdout when using stdio. stdout is reserved for JSON-RPC protocol messages; diagnostics must use stderr.

### Later transport: Streamable HTTP

Add HTTP only when a remote, multi-user service is needed. That phase requires authentication, authorization, rate limits, origin policy, deployment, and observability. It should not be mixed into the first local server release.

## 6. Server capabilities

The server declares the `tools` capability. The initial tool list is static and deterministic, so `listChanged` can remain false unless a later version supports runtime registry changes.

The MCP tools specification requires unique tool names, human-readable descriptions, and valid JSON Schema input definitions. Results may include structured content and should include an accompanying text representation for compatibility.

## 7. Tool API

### `list_components`

Input:

```json
{
  "category": "optional category filter"
}
```

Output:

```json
{
  "components": [
    {
      "name": "Button",
      "category": "actions",
      "description": "..."
    }
  ],
  "count": 1,
  "registryVersion": "0.2.0"
}
```

### `search_components`

Input:

```json
{
  "query": "chart",
  "category": "optional category filter",
  "limit": 20
}
```

Rules:

- `query` is required and trimmed.
- Matching is case-insensitive across name, category, and description.
- Results use registry order, not relevance randomness.
- `limit` is bounded, for example 1–50.

### `get_component`

Input:

```json
{
  "name": "Button"
}
```

Output includes the full registry entry:

```json
{
  "name": "Button",
  "kind": "component",
  "category": "actions",
  "description": "...",
  "import": "import { Button } from 'elij-ui-library'",
  "story": "Components/Button",
  "props": ["variant", "size", "disabled"]
}
```

Unknown names should return a tool execution error with actionable text, not a process crash.

## 8. Registry loading boundary

`registry.ts` should:

1. Load `elij-ui-library/registry` through the package export.
2. Validate the loaded object against the registry schema or equivalent runtime checks.
3. Freeze or treat the data as immutable for the process lifetime.
4. Sort only through deterministic registry-preserving rules.
5. Expose typed functions to `tools.ts`.

The MCP package must not import Moment Booth content, local image paths, or website-specific data.

## 9. Error handling

Use protocol errors for malformed requests or unknown tool names. Use tool execution errors for actionable problems such as an unknown component or invalid limit. Include a concise human-readable message and keep the process alive for recoverable tool errors.

Do not leak filesystem paths, environment variables, npm tokens, or internal stack traces into tool results.

## 10. Security and trust model

The first release is read-only and has no filesystem write capability. Still:

- Validate every tool input with Zod/JSON Schema.
- Bound query length and result limits.
- Avoid evaluating registry fields as code.
- Log only to stderr.
- Do not expose environment variables.
- Do not add tools that execute shell commands.
- Keep user confirmation available in the host for future write tools.

If write tools are added later, they need explicit opt-in, path restrictions, conflict detection, backups, and confirmation before execution.

## 11. Testing strategy

### Unit tests

- Registry loads from the published package export.
- Search is case-insensitive and deterministic.
- Category and limit filters work.
- `get_component` returns the expected Button metadata.
- Unknown components return a tool execution error.
- Malformed input is rejected.

### Protocol smoke test

Start the compiled server over stdio and use an MCP-compatible inspector/client to verify:

1. Initialization succeeds.
2. `tools/list` returns exactly the three expected tools.
3. `tools/call` returns structured output.
4. An invalid call returns an error without terminating the server.
5. stdout contains protocol messages only; logs appear on stderr.

### Release checks

```bash
corepack yarn workspace elij-ui-library-mcp test
corepack yarn workspace elij-ui-library-mcp build
cd packages/elij-ui-library-mcp
npm pack --ignore-scripts --dry-run
```

## 12. MCP host configuration example

After building, a local host can launch the server using an absolute path:

```json
{
  "mcpServers": {
    "elij-ui-library": {
      "command": "node",
      "args": [
        "/ABSOLUTE/PATH/web-workspace/packages/elij-ui-library-mcp/dist/index.js"
      ]
    }
  }
}
```

Restart the host after changing its configuration. Keep the server process independent of the Moment Booth website deployment; Vercel hosting is not required for a local stdio server.

## 13. Release plan

### 0.1.0

- Three read-only tools.
- stdio transport.
- Registry validation.
- Unit and protocol smoke tests.
- README with host configuration.
- npm publish as a public package.

### 0.2.0 candidate

- Optional `resources/list` exposure for registry documentation.
- JSON output mode for CLI interoperability.
- Better category and tag filtering.
- MCP Inspector test automation.

### Future major capability

Only after user research and security design:

- `scaffold_component`
- `add_component`
- project-aware import updates

These must be separate from the read-only discovery tools.

## 14. Acceptance criteria

Phase 3 is complete when:

- `elij-ui-library-mcp` builds under Node 22.13.0.
- The server starts over stdio without writing non-protocol output to stdout.
- `tools/list` exposes `list_components`, `search_components`, and `get_component`.
- All three tools return validated, deterministic results from registry `0.2.0`.
- Invalid calls produce recoverable tool errors.
- Tests and npm dry-run pass.
- A clean installation works outside the monorepo.
- The package README includes an MCP host configuration example.
