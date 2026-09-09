import registry from '../registry/components.json';
import { describe, expect, it } from 'vitest';

describe('public component registry', () => {
  it('contains stable metadata for the published package', () => {
    expect(registry.schemaVersion).toBe(1);
    expect(registry.package).toBe('elij-ui-library');
    expect(registry.components.length).toBeGreaterThan(40);

    const names = registry.components.map((component) => component.name);
    expect(new Set(names).size).toBe(names.length);

    for (const component of registry.components) {
      expect(component.description.length).toBeGreaterThan(0);
      expect(component.import).toBe(component.name);
      expect(component.story.length).toBeGreaterThan(0);
      expect(Array.isArray(component.props)).toBe(true);
    }
  });

  it('describes the website-specific shared components', () => {
    expect(registry.components.find(({ name }) => name === 'EventCarousel')?.category).toBe('content');
    expect(registry.components.find(({ name }) => name === 'WhatsAppButton')?.category).toBe('actions');
    expect(registry.components.find(({ name }) => name === 'FilterTabs')?.category).toBe('navigation');
  });
});
