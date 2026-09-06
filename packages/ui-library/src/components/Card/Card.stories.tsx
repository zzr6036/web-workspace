import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Card, CardBody, CardFooter, CardHeader } from './Card';
const meta = { title: 'Data Display/Card', component: Card, tags: ['autodocs'], parameters: { layout: 'centered' } } satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { children: <><CardHeader><strong>Project summary</strong></CardHeader><CardBody>Reusable content inside a structured surface.</CardBody><CardFooter><Button size="small">Open</Button></CardFooter></> }, decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>] };
export const Interactive: Story = { ...Default, args: { ...Default.args, interactive: true } };
