import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';
const meta = { title: 'Forms/Textarea', component: Textarea, tags: ['autodocs'], args: { label: 'Message', placeholder: 'Write your message', helperText: 'Maximum 500 characters.' } } satisfies Meta<typeof Textarea>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Error: Story = { args: { error: true, errorMessage: 'A message is required.' } };
