import type { Meta, StoryObj } from '@storybook/react-vite';
import { WhatsAppIcon } from './WhatsAppIcon';

const meta = {
  title: 'Icons/WhatsAppIcon',
  component: WhatsAppIcon,
  tags: ['autodocs'],
  args: { size: 48 },
} satisfies Meta<typeof WhatsAppIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithAccessibleTitle: Story = { args: { title: 'WhatsApp' } };
