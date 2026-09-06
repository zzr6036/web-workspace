import type { Meta, StoryObj } from '@storybook/react-vite'; import { useUI } from '../../provider'; import { Link, Paragraph, Text, Title } from './Typography';
const meta = { title: 'General/Typography', component: Title, tags: ['autodocs'] } satisfies Meta<typeof Title>; export default meta; type Story = StoryObj<typeof meta>;
function TypographyDemo() { const { locale } = useUI(); const zh = locale === 'zh-CN'; return <div><Title level={1}>Elij UI</Title><Paragraph>{zh ? '清晰的排版可建立明确的视觉层级。' : 'Clear typography creates a useful visual hierarchy.'}</Paragraph><Text tone="secondary">{zh ? '次要文本' : 'Secondary text'}</Text>{' · '}<Link href="#">{zh ? '了解更多' : 'Learn more'}</Link></div>; }
export const Overview: Story = { args: { children: 'Heading' }, render: () => <TypographyDemo /> };
