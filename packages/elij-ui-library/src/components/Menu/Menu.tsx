import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { useUI } from '../../provider';
export interface MenuItem { key: string; label: ReactNode; icon?: ReactNode; disabled?: boolean; danger?: boolean }
export interface MenuProps { items: MenuItem[]; selectedKey?: string; defaultSelectedKey?: string; onSelect?: (key: string) => void; mode?: 'vertical' | 'horizontal'; ariaLabel?: string; className?: string }
export function Menu({ items, selectedKey, defaultSelectedKey, onSelect, mode = 'vertical', ariaLabel, className = '' }: MenuProps) {
  const { t } = useUI();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const [internalSelected, setInternalSelected] = useState(defaultSelectedKey);
  const activeKey = selectedKey ?? internalSelected;
  const activate = (item: MenuItem) => { if (!item.disabled) { if (selectedKey === undefined) setInternalSelected(item.key); onSelect?.(item.key); } };
  const onKeyDown = (event: KeyboardEvent, index: number) => {
    const forward = mode === 'horizontal' ? 'ArrowRight' : 'ArrowDown'; const backward = mode === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
    if (![forward, backward, 'Home', 'End'].includes(event.key)) return;
    event.preventDefault(); let next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (index + (event.key === forward ? 1 : -1) + items.length) % items.length;
    while (items[next]?.disabled && next !== index) next = (next + (event.key === backward ? -1 : 1) + items.length) % items.length;
    refs.current[next]?.focus();
  };
  return <div className={`ui-menu ui-menu--${mode}${className ? ` ${className}` : ''}`} role="menu" aria-label={ariaLabel ?? t('menu')}>{items.map((item, index) => { const active = activeKey === item.key; return <button ref={(node) => { refs.current[index] = node; }} key={item.key} type="button" role="menuitem" disabled={item.disabled} aria-current={active ? 'page' : undefined} className={`ui-menu__item${active ? ' ui-menu__item--active' : ''}${item.danger ? ' ui-menu__item--danger' : ''}`} onClick={() => activate(item)} onKeyDown={(event) => onKeyDown(event, index)}>{item.icon}<span>{item.label}</span></button>; })}</div>;
}
