import type { Preview } from '@storybook/react-vite';
import { UIProvider } from '../src/provider';
import { localizeStoryArgs } from './localizeStory';
import '../src/styles/tokens.css';
import '../src/styles/components.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Global color theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'ocean', title: 'Ocean' },
        ],
      },
    },
    locale: {
      description: 'Global locale',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'zh-CN', title: '简体中文' },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => (
      <UIProvider
        locale={context.globals.locale}
        theme={context.globals.theme}
        style={{ padding: 24, borderRadius: 12 }}
      >
        <Story args={localizeStoryArgs(context.args, context.globals.locale)} />
      </UIProvider>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
};

export default preview;
