import {
  useMemo,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import {
  defaultMessages,
  type BuiltInLocale,
  type Messages,
} from '../i18n/messages';
import { UIContext, type UIContextValue } from './UIContext';

export type ThemeName = 'light' | 'dark' | 'ocean' | (string & {});

export interface UIProviderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ReactNode;
  locale?: BuiltInLocale | (string & {});
  messages?: Partial<Messages>;
  theme?: ThemeName;
}

const fallbackMessages = defaultMessages.en as Messages;

export function UIProvider({
  children,
  locale = 'en',
  messages,
  theme = 'light',
  className = '',
  style,
  ...props
}: UIProviderProps) {
  const value = useMemo<UIContextValue>(() => {
    const builtInMessages =
      locale in defaultMessages
        ? defaultMessages[locale as BuiltInLocale]
        : fallbackMessages;
    const mergedMessages = Object.fromEntries(
      Object.entries({ ...fallbackMessages, ...builtInMessages, ...messages }).filter(
        (entry): entry is [string, string] => entry[1] !== undefined,
      ),
    ) as Messages;

    return {
      locale,
      messages: mergedMessages,
      theme,
      t: (key, fallback) => mergedMessages[key] ?? fallback ?? key,
    };
  }, [locale, messages, theme]);

  const providerStyle = {
    colorScheme: theme === 'dark' ? 'dark' : 'light',
    ...style,
  } as CSSProperties;

  return (
    <UIContext.Provider value={value}>
      <div
        className={['ui-provider', className].filter(Boolean).join(' ')}
        data-ui-locale={locale}
        data-ui-theme={theme}
        lang={locale}
        style={providerStyle}
        {...props}
      >
        {children}
      </div>
    </UIContext.Provider>
  );
}
