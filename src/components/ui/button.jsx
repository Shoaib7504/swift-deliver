import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

export default function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-soft hover:shadow-premium',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark shadow-soft',
    outline: 'border border-borderColor-light dark:border-borderColor-dark text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60',
    ghost: 'text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60',
    danger: 'bg-error text-white hover:bg-error-dark shadow-soft',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-base',
  };

  const buttonContent = (
    <>
      {isLoading ? (
        <span className="flex items-center space-x-2">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </>
  );

  if (shouldReduceMotion || disabled) {
    return (
      <button
        type={type}
        disabled={disabled || isLoading}
        onClick={onClick}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {buttonContent}
      </button>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      {...props}
    >
      {buttonContent}
    </motion.button>
  );
}
