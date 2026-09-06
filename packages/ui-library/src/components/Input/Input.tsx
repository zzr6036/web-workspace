import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: boolean;
  errorMessage?: ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({
  id,
  label,
  helperText,
  error = false,
  errorMessage,
  fullWidth = false,
  className = '',
  ...props
}, ref) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const description = error && errorMessage ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined;

  return (
    <div className={`ui-field${fullWidth ? ' ui-field--full' : ''}`}>
      {label && <label className="ui-field__label" htmlFor={inputId}>{label}</label>}
      <input
        ref={ref}
        id={inputId}
        className={`ui-input${error ? ' ui-input--error' : ''}${className ? ` ${className}` : ''}`}
        aria-invalid={error || undefined}
        aria-describedby={description}
        {...props}
      />
      {error && errorMessage ? (
        <span className="ui-field__message ui-field__message--error" id={`${inputId}-error`}>{errorMessage}</span>
      ) : helperText ? (
        <span className="ui-field__message" id={`${inputId}-helper`}>{helperText}</span>
      ) : null}
    </div>
  );
});
