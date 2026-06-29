import { useState } from 'react';
import { cn } from '../../lib/utils';

export default function Input({
  label,
  id,
  type = 'text',
  className,
  error,
  helperText,
  icon: Icon,
  placeholder,
  value,
  onChange,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== undefined && value !== null && value !== '';

  return (
    <div className="relative w-full mb-5 text-left">
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-neutral-400 dark:text-neutral-500">
            <Icon size={18} />
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "w-full px-4 py-3.5 rounded-lg text-sm bg-neutral-100/50 dark:bg-neutral-800/40 text-neutral-800 dark:text-neutral-200 border transition-all duration-200 focus:outline-none",
            Icon ? "pl-11" : "pl-4",
            error
              ? "border-error focus:ring-2 focus:ring-error/20"
              : "border-borderColor-light dark:border-borderColor-dark focus:border-primary focus:ring-2 focus:ring-primary/20",
            (isFocused || hasValue) ? "pt-5 pb-2" : "py-3.5",
            className
          )}
          placeholder={isFocused ? placeholder : ""}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          {...props}
        />
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "absolute left-4 pointer-events-none transition-all duration-200 text-neutral-400 dark:text-neutral-500 font-medium",
              Icon ? "left-11" : "left-4",
              (isFocused || hasValue)
                ? "text-[10px] top-1.5 translate-y-0 text-primary dark:text-accent-light"
                : "text-sm top-1/2 -translate-y-1/2"
            )}
          >
            {label}
          </label>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-error font-medium flex items-center">
          <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={`${id}-helper`} className="mt-1.5 text-xs text-neutral-400 dark:text-neutral-500">
          {helperText}
        </p>
      )}
    </div>
  );
}
