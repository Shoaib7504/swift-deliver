import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Tooltip({ children, content, delay = 0.2 }) {
  const [show, setShow] = useState(false);
  let timeout;

  const handleMouseEnter = () => {
    timeout = setTimeout(() => setShow(true), delay * 1000);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeout);
    setShow(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute z-50 px-2.5 py-1.5 text-xs text-white bg-neutral-900 dark:bg-neutral-800 border border-borderColor-light/20 dark:border-borderColor-dark/40 rounded shadow-soft-dark whitespace-nowrap bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none"
            role="tooltip"
          >
            {content}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-width border-4 border-transparent border-t-neutral-900 dark:border-t-neutral-800" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
