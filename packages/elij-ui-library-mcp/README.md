# Elij UI Library MCP

An MCP server that lets AI clients discover components, props, categories, and Storybook stories from the published Elij UI Library registry.

## What it does

The server exposes three read-only tools:

- `list_components` — list all components or filter by category
- `search_components` — search names, categories, and descriptions
- `get_component` — inspect one component's metadata and props

It uses the MCP **stdio** transport. MCP messages stay on stdout and diagnostic logs are written to stderr.

## Quick start

Run the latest published version without installing globally:

```bash
npx -y elij-ui-library-mcp
```

For a reproducible setup, pin a version instead:

```bash
npx -y elij-ui-library-mcp@1.0.0
```

The unpinned command is convenient for trying the latest release. Pinning is recommended for production or shared team configuration.

## Configure an MCP Host

### VS Code

Create or open `.vscode/mcp.json` in your workspace and add:

```json
{
  "servers": {
    "elijUiLibrary": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "elij-ui-library-mcp"]
    }
  }
}
```

You can replace the package argument with `elij-ui-library-mcp@1.0.0` when you need a fixed version. After saving, run `MCP: List Servers` from the Command Palette and start `elijUiLibrary`.

### Claude Desktop and Cursor

Add this entry to the client's MCP configuration:

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

Restart the client after saving the configuration. If the client supports a local executable, the equivalent command is:

```bash
elij-ui-library-mcp
```

## Verify the connection

After starting the server, confirm that the Host discovers these tools:

```text
list_components
search_components
get_component
```

Then try these prompts in the Host chat:

```text
List all available Elij UI components.
```

```text
Find components suitable for a pricing card.
```

```text
Show me the props and Storybook story for EventCarousel.
```

```text
Search for components related to WhatsApp contact buttons.
```

## Tool examples

### `list_components`

Use it to browse the registry:

```text
List components in the content category.
```

Optional input:

```json
{ "category": "content" }
```

### `search_components`

Use it to find a component by concept:

```text
Search for a component that supports event image carousels.
```

Inputs include `query`, optional `category`, and `limit` from 1 to 50:

```json
{
  "query": "carousel",
  "category": "content",
  "limit": 10
}
```

### `get_component`

Use it when you need implementation details:

```text
Get the import path, props, and Storybook story for WhatsAppButton.
```

Input:

```json
{ "name": "WhatsAppButton" }
```

If the component does not exist, the server returns an MCP error response instead of silently returning an empty result.

## Example AI-assisted workflow

```text
1. Ask the Host to search for a suitable component.
2. Ask for its props and Storybook story.
3. Ask for an import example using the returned component name.
4. Check the Storybook story before adding it to your application.
```

Example conversation:

```text
User: Find a component for a pricing card.
AI: Card is suitable. I can show its props and Storybook story.

User: Show the props and import example.
AI: Import Card from "elij-ui-library" and use the returned props from the registry.
```

## Troubleshooting

### Server not found

Check that Node.js and npm are available:

```bash
node --version
npm --version
```

Then test the package directly:

```bash
npx -y elij-ui-library-mcp
```

### No tools discovered

Restart the MCP server from the Host, confirm the configuration uses `elij-ui-library-mcp` (not the CLI package), and inspect the Host's MCP output log.

### Registry data is unavailable

The MCP package reads registry metadata from the published `elij-ui-library` dependency. Check npm connectivity and make sure the dependency version is available in the configured registry.

### Local development

From the monorepo root:

```bash
corepack yarn workspace elij-ui-library-mcp build
corepack yarn workspace elij-ui-library-mcp test
```

The server is read-only and does not modify your application files.
