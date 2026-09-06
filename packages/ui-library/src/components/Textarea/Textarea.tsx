import { forwardRef, useId, type ReactNode, type TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: boolean;
  errorMessage?: ReactNode;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({
  id, label, helperText, error = false, errorMessage, fullWidth = false, className = '', ...props
}, ref) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const description = error && errorMessage ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined;

  return (
    <div className={`ui-field${fullWidth ? ' ui-field--full' : ''}`}>
      {label && <label className="ui-field__label" htmlFor={inputId}>{label}</label>}
      <textarea ref={ref} id={inputId} className={`ui-textarea${error ? ' ui-textarea--error' : ''}${className ? ` ${className}` : ''}`} aria-invalid={error || undefined} aria-describedby={description} {...props} />
      {error && errorMessage ? <span className="ui-field__message ui-field__message--error" id={`${inputId}-error`}>{errorMessage}</span> : helperText ? <span className="ui-field__message" id={`${inputId}-helper`}>{helperText}</span> : null}
    </div>
  );
});
