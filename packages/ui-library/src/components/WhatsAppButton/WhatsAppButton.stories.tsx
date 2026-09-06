import type { Meta, StoryObj } from '@storybook/react-vite';
import { WhatsAppButton } from './WhatsAppButton';

const meta = { title: 'Actions/WhatsAppButton', component: WhatsAppButton, tags: ['autodocs'], args: { href: '#whatsapp', children: 'WhatsApp enquire', icon: <span aria-hidden="true">◉</span> } } satisfies Meta<typeof WhatsAppButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Small: Story = { args: { size: 'small' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
