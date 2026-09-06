import type { Meta, StoryObj } from '@storybook/react-vite'; import { Button } from '../Button'; import { Empty } from './Empty';
const meta = { title: 'Data Display/Empty', component: Empty, tags: ['autodocs'], args: { children: <Button size="small">Create item</Button> } } satisfies Meta<typeof Empty>; export default meta; type Story = StoryObj<typeof meta>; export const Default: Story = {};
