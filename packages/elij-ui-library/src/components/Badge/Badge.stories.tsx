import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';
const meta = { title: 'Data Display/Badge', component: Badge, tags: ['autodocs'], args: { children: 'New', variant: 'primary' }, argTypes: { variant: { control: 'select', options: ['neutral', 'primary', 'success', 'warning', 'danger'] } } } satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {};
export const Success: Story = { args: { children: 'Active', variant: 'success' } };
export const Warning: Story = { args: { children: 'Pending', variant: 'warning' } };
export const Danger: Story = { args: { children: 'Failed', variant: 'danger' } };
