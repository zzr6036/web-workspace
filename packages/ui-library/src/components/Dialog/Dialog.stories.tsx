import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { useUI } from '../../provider';
import { Dialog, type DialogProps } from './Dialog';

function DialogDemo(args: DialogProps) {
  const [open, setOpen] = useState(false);
  const { t } = useUI();
  return <><Button onClick={() => setOpen(true)}>{t('open')}</Button><Dialog {...args} open={open} onOpenChange={setOpen} footer={<><Button variant="ghost" onClick={() => setOpen(false)}>{t('cancel')}</Button><Button onClick={() => setOpen(false)}>{t('confirm')}</Button></>}/></>;
}
const meta = { title: 'Overlay/Dialog', component: Dialog, tags: ['autodocs'], args: { open: false, onOpenChange: () => undefined, title: 'Confirm action', description: 'Review the details before continuing.', children: 'This action can be changed later.' } } satisfies Meta<typeof Dialog>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Interactive: Story = { render: (args) => <DialogDemo {...args} /> };
