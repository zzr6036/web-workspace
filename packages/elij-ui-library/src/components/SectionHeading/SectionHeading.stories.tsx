import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeading } from './SectionHeading';

const meta = { title: 'Layout/SectionHeading', component: SectionHeading, tags: ['autodocs'], args: { eyebrow: 'Eyebrow', title: 'A clear section title.', description: 'Use this pattern to introduce a section with an optional supporting description.' } } satisfies Meta<typeof SectionHeading>;
export default meta;
type Story = StoryObj<typeof meta>;
export const WithDescription: Story = {};
export const WithoutDescription: Story = { args: { description: undefined } };
