import type { HTMLAttributes } from 'react';
import { useUI } from '../../provider';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> { size?: 'small' | 'medium' | 'large'; label?: string }
export function Spinner({ size = 'medium', label, className = '', ...props }: SpinnerProps) {
  const { t } = useUI();
  return <span className={`ui-spinner ui-spinner--${size}${className ? ` ${className}` : ''}`} role="status" aria-label={label ?? t('loading')} {...props} />;
}
