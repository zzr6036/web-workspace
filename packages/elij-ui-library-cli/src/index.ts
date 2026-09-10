#!/usr/bin/env node

import { createRequire } from "node:module";

type RegistryEntry = {
    name: string;
    kind: string;
    category: string;
    description: string;
    import: string;
    story: string;
    props: string[];
};

type Registry = {
    package: string;
    version: string;
    components: RegistryEntry[];
};

const require = createRequire(import.meta.url);
const registry = require("elij-ui-library/registry") as Registry;

const [, , command, value] = process.argv;

function listComponents() {
    for (const component of registry.components) {
        console.log(`${component.name} — ${component.category}`);
    }
}

function searchComponents(query: string) {
    const normalizedQuery = query.toLowerCase();

    const results = registry.components.filter((component) =>
        `${component.name} ${component.category} ${component.description}`
            .toLowerCase()
            .includes(normalizedQuery),
    );

    for (const component of results) {
        console.log(`${component.name} — ${component.description}`);
    }
}

function showInfo(name: string) {
    const component = registry.components.find(
        (item) => item.name.toLowerCase() === name.toLowerCase(),
    );

    if (!component) {
        console.error(`Component not found: ${name}`);
        process.exitCode = 1;
        return;
    }

    console.log(`Name: ${component.name}`);
    console.log(`Category: ${component.category}`);
    console.log(`Description: ${component.description}`);
    console.log(`Import: ${component.import}`);
    console.log(`Story: ${component.story}`);
    console.log(`Props: ${component.props.join(", ")}`);
}

function doctor() {
    console.log(`Registry package: ${registry.package}`);
    console.log(`Registry version: ${registry.version}`);
    console.log(`Components: ${registry.components.length}`);
    console.log("Status: ready");
}

switch (command) {
    case "list":
        listComponents();
        break;
    case "search":
        searchComponents(value ?? "");
        break;
    case "info":
        showInfo(value ?? "");
        break;
    case "doctor":
        doctor();
        break;
    default:
        console.log(`
Elij UI LIBRARY CLI

Commands:
    elij-ui list                         (also: elij-ui-library, elij-ui-library-cli)
    elij-ui search <keyword>
    elij-ui info <component>
    elij-ui doctor
`);
}
