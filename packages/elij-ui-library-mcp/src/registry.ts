import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

export type RegistryEntry = {
    name: string;
    kind: string;
    category: string;
    description: string;
    import: string;
    story: string;
    props: string[];
};

export type Registry = {
    package: string;
    version: string;
    components: RegistryEntry[];
};

export const registry = require(
    "elij-ui-library/registry",
) as Registry;

export function listComponents(category?: string) {
    const components = category
        ? registry.components.filter(
            (component) => component.category === category,
        )
        : registry.components;

    return {
        registryVersion: registry.version,
        count: components.length,
        components,
    };
}

export function searchComponents(query: string, category?: string) {
    const normalizedQuery = query.trim().toLowerCase();

    const components = registry.components.filter((component) => {
        const matchesCategory = category
            ? component.category === category
            : true;

        const searchableText = [
            component.name,
            component.category,
            component.description,
        ]
            .join(" ")
            .toLowerCase();

        return matchesCategory && searchableText.includes(normalizedQuery);
    });

    return {
        registryVersion: registry.version,
        count: components.length,
        components,
    };
}

export function getComponent(name: string) {
    return registry.components.find(
        (component) => component.name.toLowerCase() === name.toLowerCase(),
    );
}