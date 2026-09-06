import type { ReactNode } from 'react';

export interface FilterTabItem { id: string; label: ReactNode; disabled?: boolean }
export interface FilterTabsProps { items: readonly FilterTabItem[]; activeKey: string; onChange?: (key: string) => void; ariaLabel?: string; className?: string }

export function FilterTabs({ items, activeKey, onChange, ariaLabel = 'Filter options', className = '' }: FilterTabsProps) {
  return <div className={`ui-filter-tabs${className ? ` ${className}` : ''}`} role="group" aria-label={ariaLabel}>{items.map((item) => <button key={item.id} type="button" aria-pressed={activeKey === item.id} disabled={item.disabled} onClick={() => onChange?.(item.id)}>{item.label}</button>)}</div>;
}
