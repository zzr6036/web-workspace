import type { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> { children: ReactNode; variant?: BadgeVariant }

export function Badge({ children, variant = 'neutral', className = '', ...props }: BadgeProps) {
  return <span className={`ui-badge ui-badge--${variant}${className ? ` ${className}` : ''}`} {...props}>{children}</span>;
}
