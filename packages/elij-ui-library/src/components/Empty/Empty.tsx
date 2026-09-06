import type { ReactNode } from 'react'; import { useUI } from '../../provider';
export interface EmptyProps { description?: ReactNode; image?: ReactNode; children?: ReactNode; compact?: boolean; className?: string }
export function Empty({ description, image, children, compact = false, className = '' }: EmptyProps) { const { t } = useUI(); return <div className={`ui-empty${compact ? ' ui-empty--compact' : ''}${className ? ` ${className}` : ''}`}>{image ?? <span className="ui-empty__image" aria-hidden="true">◇</span>}<span>{description ?? t('noData')}</span>{children}</div>; }
