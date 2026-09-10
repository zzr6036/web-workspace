#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { z } from "zod";
import {
    getComponent,
    listComponents,
    registry,
    searchComponents,
} from "./registry.js";

const server = new McpServer({
    name: "elij-ui-library",
    version: "0.1.0",
});

function textResult(value: unknown) {
    return {
        content: [
            {
                type: "text" as const,
                text: JSON.stringify(value, null, 2),
            },
        ],
    };
}

server.registerTool(
    "list_components",
    {
        description: "List Elij UI components from the published registry.",
        inputSchema: z.object({
            category: z.string().optional(),
        }),
    },
    async ({ category }) => {
        return textResult(listComponents(category));
    },
);

server.registerTool(
    "search_components",
    {
        description:
            "Search Elij UI components by name, category, or description.",
        inputSchema: z.object({
            query: z.string().trim().min(1).max(100),
            category: z.string().optional(),
            limit: z.number().int().min(1).max(50).default(20),
        }),
    },
    async ({ query, category, limit }) => {
        const result = searchComponents(query, category);

        return textResult({
            ...result,
            components: result.components.slice(0, limit),
        });
    },
);

server.registerTool(
    "get_component",
    {
        description:
            "Get import path, props, category, description, and Storybook story for one Elij UI component.",
        inputSchema: z.object({
            name: z.string().trim().min(1).max(100),
        }),
    },
    async ({ name }) => {
        const component = getComponent(name);

        if (!component) {
            return {
                isError: true,
                content: [
                    {
                        type: "text" as const,
                        text: `Component not found: ${name}`,
                    },
                ],
            };
        }

        return textResult({
            registryVersion: registry.version,
            component,
        });
    },
);

async function main() {
    const transport = new StdioServerTransport();

    await server.connect(transport);

    // stdio MCP server 不要使用 console.log
    console.error("Elij UI MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in Elij UI MCP Server:", error);
    process.exit(1);
});