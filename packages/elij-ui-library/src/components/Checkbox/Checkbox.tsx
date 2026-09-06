import { forwardRef, useEffect, useRef, type InputHTMLAttributes, type ReactNode } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({ label, indeterminate = false, className = '', ...props }, forwardedRef) {
  const localRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (localRef.current) localRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const setRef = (node: HTMLInputElement | null) => {
    localRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  return (
    <label className={`ui-check${props.disabled ? ' ui-check--disabled' : ''}`}>
      <input ref={setRef} className={`ui-check__input${className ? ` ${className}` : ''}`} type="checkbox" {...props} />
      <span className="ui-check__control" aria-hidden="true" />
      {label && <span className="ui-check__label">{label}</span>}
    </label>
  );
});
