import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';
const meta = { title: 'Forms/Input', component: Input, tags: ['autodocs'], args: { label: 'Email', placeholder: 'you@example.com', helperText: 'We will never share your email.' } } satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Error: Story = { args: { error: true, errorMessage: 'Enter a valid email address.' } };
export const Disabled: Story = { args: { disabled: true, value: 'you@example.com' } };
