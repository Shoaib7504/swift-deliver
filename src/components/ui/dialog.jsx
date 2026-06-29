import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import Button from './button';

export default function Dialog({
  isOpen,
  onClose,
  title,
  children,
  className,
  size = 'md'
}) {
  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/40 dark:bg-neutral-950/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={cn(
              "relative w-full overflow-hidden rounded-xl bg-cardBg-light dark:bg-cardBg-dark border border-borderColor-light dark:border-borderColor-dark shadow-soft-dark dark:shadow-soft-dark z-10 flex flex-col max-h-[90vh]",
              sizes[size],
              className
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-borderColor-light dark:border-borderColor-dark">
              {title && (
                <h3 id="modal-title" className="text-base font-semibold text-neutral-800 dark:text-neutral-200">
                  {title}
                </h3>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-1 rounded-full text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300"
                aria-label="Close dialog"
              >
                <X size={18} />
              </Button>
            </div>

            {/* Content body */}
            <div className="flex-1 p-6 overflow-y-auto text-left text-neutral-600 dark:text-neutral-300">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
