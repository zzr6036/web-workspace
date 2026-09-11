import assert from "node:assert/strict";
import test from "node:test";

import {
    getComponent,
    listComponents,
    searchComponents,
} from "../dist/registry.js";

test("lists all registry components", () => {
    const result = listComponents();

    assert.equal(result.registryVersion, "0.2.2");
    assert.equal(result.count, 54);
});

test("filters components by category", () => {
    const result = listComponents("actions");

    assert.ok(result.components.length > 0);
    assert.ok(result.components.every((item) => item.category === "actions"));
});

test("searches components by query", () => {
    const result = searchComponents("button");

    assert.ok(
        result.components.some((item) => item.name === "Button"),
    );
});

test("gets one component", () => {
    const component = getComponent("Button");

    assert.equal(component?.name, "Button");
    assert.ok(component?.props.length);
});

test("returns undefined for an unknown component", () => {
    assert.equal(getComponent("UnknownComponent"), undefined);
});