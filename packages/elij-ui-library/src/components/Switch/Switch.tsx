import { forwardRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';

export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: ReactNode;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch({ checked, defaultChecked = false, onCheckedChange, label, disabled, className = '', ...props }, ref) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = checked ?? internalChecked;
  const toggle = () => {
    if (disabled) return;
    const next = !isChecked;
    if (checked === undefined) setInternalChecked(next);
    onCheckedChange?.(next);
  };
  return (
    <div className={`ui-switch-row${disabled ? ' ui-switch-row--disabled' : ''}`}>
      <button ref={ref} type="button" role="switch" aria-checked={isChecked} aria-label={typeof label === 'string' ? label : undefined} disabled={disabled} className={`ui-switch${className ? ` ${className}` : ''}`} onClick={toggle} {...props}><span className="ui-switch__thumb" /></button>
      {label && <span>{label}</span>}
    </div>
  );
});
