import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> { level?: 1 | 2 | 3 | 4 | 5 | 6; children: ReactNode }
export function Title({ level = 2, className = '', children, ...props }: TitleProps) { const Tag = `h${level}` as const; return <Tag className={`ui-title ui-title--${level}${className ? ` ${className}` : ''}`} {...props}>{children}</Tag>; }
export interface TextProps extends HTMLAttributes<HTMLSpanElement> { children: ReactNode; tone?: 'default' | 'secondary' | 'success' | 'warning' | 'danger'; strong?: boolean; code?: boolean }
export function Text({ children, tone = 'default', strong, code, className = '', ...props }: TextProps) { const Tag = code ? 'code' : 'span'; return <Tag className={`ui-text ui-text--${tone}${strong ? ' ui-text--strong' : ''}${code ? ' ui-text--code' : ''}${className ? ` ${className}` : ''}`} {...props}>{children}</Tag>; }
export function Paragraph({ className = '', ...props }: HTMLAttributes<HTMLParagraphElement>) { return <p className={`ui-paragraph${className ? ` ${className}` : ''}`} {...props} />; }
export function Link({ className = '', ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) { return <a className={`ui-link${className ? ` ${className}` : ''}`} {...props} />; }
