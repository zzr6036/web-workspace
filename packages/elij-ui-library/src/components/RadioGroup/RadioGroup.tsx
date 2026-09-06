import { useId, type ReactNode } from 'react';

export interface RadioOption { label: ReactNode; value: string; disabled?: boolean }
export interface RadioGroupProps {
  name?: string;
  label?: ReactNode;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function RadioGroup({ name, label, options, value, defaultValue, onValueChange, disabled = false, orientation = 'vertical', className = '' }: RadioGroupProps) {
  const generatedName = useId();
  return (
    <fieldset className={`ui-radio-group ui-radio-group--${orientation}${className ? ` ${className}` : ''}`} disabled={disabled}>
      {label && <legend className="ui-field__label">{label}</legend>}
      <div className="ui-radio-group__options">
        {options.map((option) => (
          <label className="ui-radio" key={option.value}>
            <input type="radio" name={name ?? generatedName} value={option.value} checked={value === undefined ? undefined : value === option.value} defaultChecked={value === undefined ? defaultValue === option.value : undefined} disabled={option.disabled} onChange={() => onValueChange?.(option.value)} />
            <span className="ui-radio__control" aria-hidden="true" />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
