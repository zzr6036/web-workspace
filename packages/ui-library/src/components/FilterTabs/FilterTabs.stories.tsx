import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ComponentProps } from 'react';
import { FilterTabs } from './FilterTabs';

const items = [
  { id: 'all', label: 'All' },
  { id: 'wedding', label: 'Wedding' },
  { id: 'birthday', label: 'Birthday' },
];

const meta = { title: 'Navigation/FilterTabs', component: FilterTabs, tags: ['autodocs'], args: { items, activeKey: 'all', ariaLabel: 'Filter examples' } } satisfies Meta<typeof FilterTabs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithDisabledOption: Story = { args: { items: [...items, { id: 'corporate', label: 'Corporate', disabled: true }] } };
export const LongLabels: Story = { args: { items: [{ id: 'all', label: 'All occasions' }, { id: 'rom', label: 'Weddings & ROMs' }, { id: 'corporate', label: 'Corporate events' }], activeKey: 'rom' } };
function InteractiveExample(args: ComponentProps<typeof FilterTabs>) {
  const [activeKey, setActiveKey] = useState(args.activeKey);
  return <FilterTabs {...args} activeKey={activeKey} onChange={setActiveKey} />;
}
export const Interactive: Story = { render: (args) => <InteractiveExample {...args} /> };
