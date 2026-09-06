import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup } from './RadioGroup';
const options = [{ label: 'Email', value: 'email' }, { label: 'SMS', value: 'sms' }, { label: 'Push notification', value: 'push', disabled: true }];
const meta = { title: 'Forms/RadioGroup', component: RadioGroup, tags: ['autodocs'], args: { label: 'Notification channel', options, defaultValue: 'email' } } satisfies Meta<typeof RadioGroup>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Vertical: Story = {};
export const Horizontal: Story = { args: { orientation: 'horizontal' } };
