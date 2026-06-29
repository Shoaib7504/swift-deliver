/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Design system colors
        primary: {
          DEFAULT: '#6366f1', // Indigo
          dark: '#4f46e5',
          light: '#a5b4fc',
        },
        secondary: {
          DEFAULT: '#14b8a6', // Teal
          dark: '#0d9488',
          light: '#99f6e4',
        },
        accent: {
          DEFAULT: '#8b5cf6', // Violet
          dark: '#7c3aed',
          light: '#c084fc',
        },
        success: {
          DEFAULT: '#10b981', // Emerald
          dark: '#059669',
          light: '#a7f3d0',
        },
        warning: {
          DEFAULT: '#f59e0b', // Amber
          dark: '#d97706',
          light: '#fde68a',
        },
        error: {
          DEFAULT: '#ef4444', // Red
          dark: '#dc2626',
          light: '#fca5a5',
        },
        info: {
          DEFAULT: '#06b6d4', // Cyan
          dark: '#0891b2',
          light: '#a5f3fc',
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        // Dashboard specific semantic tokens
        bg: {
          light: '#fafafa',
          dark: '#09090b',
        },
        cardBg: {
          light: '#ffffff',
          dark: '#121214',
        },
        borderColor: {
          light: '#e4e4e7',
          dark: '#27272a',
        }
      },
      borderRadius: {
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 8px -1px rgba(0, 0, 0, 0.03)',
        'soft-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.3), 0 2px 8px -1px rgba(0, 0, 0, 0.2)',
        'premium': '0 10px 30px -10px rgba(99, 102, 241, 0.15), 0 1px 3px rgba(0, 0, 0, 0.05)',
        'premium-dark': '0 10px 30px -10px rgba(139, 92, 246, 0.3), 0 1px 3px rgba(255, 255, 255, 0.02)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 3s',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
