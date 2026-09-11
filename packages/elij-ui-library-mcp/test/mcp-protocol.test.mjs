import assert from "node:assert/strict";
import { once } from "node:events";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import { createInterface } from "node:readline";
import test from "node:test";

const serverPath = fileURLToPath(new URL("../dist/index.js", import.meta.url));
const packageMetadata = JSON.parse(
    readFileSync(new URL("../package.json", import.meta.url), "utf8"),
);

function startServer() {
    const child = spawn(process.execPath, [serverPath], {
        stdio: ["pipe", "pipe", "pipe"],
    });
    const lines = createInterface({ input: child.stdout });
    const pending = new Map();
    let nextId = 1;

    lines.on("line", (line) => {
        if (!line.trim()) return;
        const message = JSON.parse(line);
        const resolve = pending.get(message.id);
        if (resolve) {
            pending.delete(message.id);
            resolve(message);
        }
    });

    function request(method, params = {}) {
        const id = nextId++;
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                pending.delete(id);
                reject(new Error(`Timed out waiting for ${method}`));
            }, 5000);
            pending.set(id, (message) => {
                clearTimeout(timer);
                resolve(message);
            });
            child.stdin.write(`${JSON.stringify({
                jsonrpc: "2.0",
                id,
                method,
                params,
            })}\n`);
        });
    }

    async function close() {
        lines.close();
        child.stdin.end();
        if (!child.killed) child.kill();
        await once(child, "close").catch(() => undefined);
    }

    return { child, request, close };
}

test("MCP server exposes tools through the stdio protocol", async (t) => {
    const server = startServer();
    t.after(() => server.close());

    const initialized = await server.request("initialize", {
        protocolVersion: "2025-06-18",
        capabilities: {},
        clientInfo: { name: "elij-ui-library-mcp-test", version: "1.0.0" },
    });

    assert.equal(initialized.result.serverInfo.name, "elij-ui-library");
    assert.equal(initialized.result.serverInfo.version, packageMetadata.version);
    assert.ok(initialized.result.capabilities.tools);

    const tools = await server.request("tools/list");
    const names = tools.result.tools.map((tool) => tool.name);
    assert.deepEqual(names, [
        "list_components",
        "search_components",
        "get_component",
    ]);

    const result = await server.request("tools/call", {
        name: "get_component",
        arguments: { name: "Button" },
    });
    const payload = JSON.parse(result.result.content[0].text);
    assert.equal(payload.component.name, "Button");
});
