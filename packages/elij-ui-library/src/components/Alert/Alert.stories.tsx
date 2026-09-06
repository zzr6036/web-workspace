import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';
const meta = { title: 'Feedback/Alert', component: Alert, tags: ['autodocs'], args: { title: 'Update available', children: 'Refresh the page to use the latest version.', variant: 'info' }, argTypes: { variant: { control: 'select', options: ['info', 'success', 'warning', 'error'] } } } satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Info: Story = {};
export const Success: Story = { args: { title: 'Saved', children: 'Your changes have been saved.', variant: 'success' } };
export const Error: Story = { args: { title: 'Could not save', children: 'Try again in a moment.', variant: 'error' } };
export const Dismissible: Story = { args: { onDismiss: () => undefined } };
