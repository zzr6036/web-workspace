import type { HTMLAttributes, ReactNode } from 'react';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> { orientation?: 'horizontal' | 'vertical'; label?: ReactNode }
export function Divider({ orientation = 'horizontal', label, className = '', ...props }: DividerProps) {
  return <div className={`ui-divider ui-divider--${orientation}${label ? ' ui-divider--labelled' : ''}${className ? ` ${className}` : ''}`} role="separator" aria-orientation={orientation} {...props}>{label && <span>{label}</span>}</div>;
}
