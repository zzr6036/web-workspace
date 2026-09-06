import { createContext, useContext } from 'react';
import { defaultMessages, type MessageKey, type Messages } from '../i18n/messages';
import type { ThemeName } from './UIProvider';

export interface UIContextValue {
  locale: string;
  messages: Messages;
  theme: ThemeName;
  t: (key: MessageKey | (string & {}), fallback?: string) => string;
}

const fallbackMessages = defaultMessages.en as Messages;

export const UIContext = createContext<UIContextValue>({
  locale: 'en',
  messages: fallbackMessages,
  theme: 'light',
  t: (key, fallback) => fallback ?? fallbackMessages[key] ?? key,
});

export function useUI() {
  return useContext(UIContext);
}
