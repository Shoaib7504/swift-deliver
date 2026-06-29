/**
 * Combines multiple class names or conditional values into a single string.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Formats a currency value.
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
  }).format(value);
}

/**
 * Formats a date string.
 */
export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Smoothly interpolates values (useful for dashboard charts).
 */
export function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}
