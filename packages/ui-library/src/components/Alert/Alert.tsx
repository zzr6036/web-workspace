import type { HTMLAttributes, ReactNode } from 'react';
import { useUI } from '../../provider';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';
export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> { children: ReactNode; title?: ReactNode; variant?: AlertVariant; onDismiss?: () => void; dismissLabel?: string }

export function Alert({ children, title, variant = 'info', onDismiss, dismissLabel, className = '', ...props }: AlertProps) {
  const { t } = useUI();
  return (
    <div role={variant === 'error' ? 'alert' : 'status'} className={`ui-alert ui-alert--${variant}${className ? ` ${className}` : ''}`} {...props}>
      <div className="ui-alert__content">{title && <strong className="ui-alert__title">{title}</strong>}<div>{children}</div></div>
      {onDismiss && <button className="ui-alert__dismiss" type="button" aria-label={dismissLabel ?? t('close')} onClick={onDismiss}>×</button>}
    </div>
  );
}
