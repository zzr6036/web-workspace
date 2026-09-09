import type { Meta, StoryObj } from '@storybook/react-vite';
import registry from '../registry/components.json';

const meta = {
  title: 'Registry/Catalog',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const PublicComponents: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 920 }}>
      <div>
        <strong>{registry.package}</strong>
        <p>{registry.description}</p>
      </div>
      {registry.components.map((component) => (
        <article
          key={component.name}
          style={{ border: '1px solid var(--ui-color-border)', borderRadius: 12, padding: 16 }}
        >
          <strong>{component.name}</strong>
          <span style={{ marginLeft: 8, color: 'var(--ui-color-text-muted)' }}>
            {component.category}
          </span>
          <p>{component.description}</p>
          <code>{component.story}</code>
        </article>
      ))}
    </div>
  ),
};
