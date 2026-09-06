import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../components/Button';
import { useUI } from './UIContext';
import { UIProvider } from './UIProvider';

function LocalizedExample() {
  const { locale, theme, t } = useUI();

  return (
    <div style={{ display: 'grid', gap: 16, minWidth: 280 }}>
      <strong>{locale} / {theme}</strong>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button>{t('next')}</Button>
        <Button variant="secondary">{t('previous')}</Button>
      </div>
    </div>
  );
}

const meta = {
  title: 'Foundation/UIProvider',
  component: UIProvider,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof UIProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EnglishLight: Story = {
  args: { children: <LocalizedExample /> },
};

export const ChineseDark: Story = {
  args: {
    children: <LocalizedExample />,
    locale: 'zh-CN',
    theme: 'dark',
  },
};

export const OceanTheme: Story = {
  args: {
    children: <LocalizedExample />,
    theme: 'ocean',
  },
};

export const CustomTranslation: Story = {
  args: {
    children: <LocalizedExample />,
    locale: 'en-SG',
    messages: { next: 'Carry on', previous: 'Go back' },
  },
};
