import { forwardRef, useId, type ReactNode, type SelectHTMLAttributes } from 'react';

export interface SelectOption { label: ReactNode; value: string; disabled?: boolean }
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: boolean;
  errorMessage?: ReactNode;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ id, label, helperText, error = false, errorMessage, options, placeholder, fullWidth = false, className = '', ...props }, ref) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const description = error && errorMessage ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined;
  return (
    <div className={`ui-field${fullWidth ? ' ui-field--full' : ''}`}>
      {label && <label className="ui-field__label" htmlFor={selectId}>{label}</label>}
      <select ref={ref} id={selectId} className={`ui-select${error ? ' ui-select--error' : ''}${className ? ` ${className}` : ''}`} aria-invalid={error || undefined} aria-describedby={description} {...props}>
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((option) => <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>)}
      </select>
      {error && errorMessage ? <span className="ui-field__message ui-field__message--error" id={`${selectId}-error`}>{errorMessage}</span> : helperText ? <span className="ui-field__message" id={`${selectId}-helper`}>{helperText}</span> : null}
    </div>
  );
});
