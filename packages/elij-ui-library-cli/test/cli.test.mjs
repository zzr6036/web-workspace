import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const currentDir = dirname(fileURLToPath(import.meta.url));
const cliPath = join(currentDir, "..", "dist", "index.js");

function runCli(...args) {
    return execFileSync(process.execPath, [cliPath, ...args], {
        encoding: "utf8",
    });
}

test("doctor reports a ready registry", () => {
    const output = runCli("doctor");

    assert.match(output, /Registry package: elij-ui-library/);
    assert.match(output, /Components: 54/);
    assert.match(output, /Status: ready/);
});

test("list prints the component inventory", () => {
    const output = runCli("list");

    assert.match(output, /Button/);
    assert.match(output, /SectionHeading/);
});

test("info prints component details", () => {
    const output = runCli("info", "Button");

    assert.match(output, /Name: Button/);
    assert.match(output, /Import:/);
    assert.match(output, /Props:/);
});

test("search finds matching components", () => {
    const output = runCli("search", "button");

    assert.match(output, /Button/);
});

test("info returns an error for an unknown component", () => {
    assert.throws(() => runCli("info", "UnknownComponent"));
});