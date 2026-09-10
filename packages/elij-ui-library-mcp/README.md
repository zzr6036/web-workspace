# Elij UI Library MCP

An MCP server that lets AI clients discover components from the published Elij UI Library registry.

## Quick start

Run it without installing globally:

```bash
npx -y elij-ui-library-mcp
```

The server uses the MCP stdio transport. Keep stdout reserved for MCP messages; diagnostic output is written to stderr.

## MCP client configuration

Add the following server entry to an MCP-compatible client such as Claude Desktop, Cursor, or VS Code:

```json
{
  "mcpServers": {
    "elij-ui-library": {
      "command": "npx",
      "args": ["-y", "elij-ui-library-mcp"]
    }
  }
}
```

If the client supports a local executable configuration, the equivalent command is:

```bash
elij-ui-library-mcp
```

## Available tools

### `list_components`

Lists all components in the registry. Pass an optional `category` to filter the result.

### `search_components`

Searches component names, categories, and descriptions. It accepts `query`, an optional `category`, and an optional `limit` from 1 to 50.

### `get_component`

Returns the import path, category, description, props, and Storybook story for a component by name.

## Development

From the monorepo root:

```bash
corepack yarn workspace elij-ui-library-mcp build
corepack yarn workspace elij-ui-library-mcp test
```

The server depends on the published `elij-ui-library` registry package, so the registry data remains versioned with the UI library release.
