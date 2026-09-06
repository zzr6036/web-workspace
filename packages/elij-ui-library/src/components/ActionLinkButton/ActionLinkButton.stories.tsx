import type { Meta, StoryObj } from '@storybook/react-vite';
import { ActionLinkButton } from './ActionLinkButton';

const meta = { title: 'Navigation/ActionLinkButton', component: ActionLinkButton, tags: ['autodocs'], args: { href: '#destination', children: 'Open details', size: 'medium', variant: 'primary' } } satisfies Meta<typeof ActionLinkButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const WithIcon: Story = { args: { icon: <span aria-hidden="true">→</span> } };
export const Large: Story = { args: { size: 'large', children: 'Get started' } };
