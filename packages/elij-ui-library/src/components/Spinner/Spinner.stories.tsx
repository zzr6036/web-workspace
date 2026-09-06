import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';
const meta = { title: 'Feedback/Spinner', component: Spinner, tags: ['autodocs'], args: { size: 'medium' }, argTypes: { size: { control: 'select', options: ['small', 'medium', 'large'] } } } satisfies Meta<typeof Spinner>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Medium: Story = {};
export const Small: Story = { args: { size: 'small' } };
export const Large: Story = { args: { size: 'large' } };
