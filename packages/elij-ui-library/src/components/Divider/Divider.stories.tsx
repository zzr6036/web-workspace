import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';
const meta = { title: 'Layout/Divider', component: Divider, tags: ['autodocs'], args: { orientation: 'horizontal' } } satisfies Meta<typeof Divider>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Horizontal: Story = { decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>] };
export const WithLabel: Story = { args: { label: 'OR' }, decorators: Horizontal.decorators };
export const Vertical: Story = { args: { orientation: 'vertical' }, decorators: [(Story) => <div style={{ height: 48 }}><Story /></div>] };
