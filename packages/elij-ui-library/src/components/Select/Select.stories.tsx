import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';
const options = [{ label: 'Singapore', value: 'sg' }, { label: 'Australia', value: 'au' }, { label: 'Japan', value: 'jp' }];
const meta = { title: 'Forms/Select', component: Select, tags: ['autodocs'], args: { label: 'Country', options, placeholder: 'Select a country', defaultValue: '', helperText: 'Used to localize your experience.' } } satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Error: Story = { args: { error: true, errorMessage: 'Select a country.' } };
export const Disabled: Story = { args: { disabled: true } };
