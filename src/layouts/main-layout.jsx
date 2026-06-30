import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import useTheme from '../hooks/useTheme';
import Button from '../components/ui/button';
import { Toaster } from 'sonner';

export default function MainLayout({ children }) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    
    <div className=" min-height-screen flex flex-col transition-colors duration-300 bg-bg-light dark:bg-bg-dark text-neutral-800 dark:text-neutral-200">
      <Toaster richColors position="top-right" />
      
      {/* Sticky Premium Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-borderColor-light/60 dark:border-borderColor-dark/60 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-accent to-primary flex items-center justify-center text-white shadow-soft transition-transform group-hover:scale-105">
                <img src="https://img.freepik.com/free-vector/modern-logo-design-with-circle-shape_343694-1748.jpg?semt=ais_hybrid&w=740&q=80" className="font-extrabold text-lg tracking-tighter"></img>
              </div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent">
                ZapShift
              </span>
            </Link>

            {/* <nav className="hidden md:flex items-center space-x-6">
              <a href="#services" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors">Services</a>
              <a href="#coverage" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors">Coverage</a>
              <a href="#calculator" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors">Cost Calculator</a>
              <a href="#testimonials" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors">Reviews</a>
            </nav> */}
          </div>

          <div className="flex items-center space-x-4">
            {/* Dark Mode Switcher */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-zinc-800 text-neutral-500 dark:text-neutral-400"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
            </Button>

            <Link to="/dashboard">
              <Button size="sm" variant="outline" className="hidden sm:inline-flex">
                Merchant Portal
              </Button>
            </Link>

            <Link to="/dashboard">
              <Button size="sm" className="bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:text-neutral-950 font-semibold">
                Get Started
                <ArrowRight size={14} className="ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Premium Footer */}
      <footer className="border-t border-borderColor-light dark:border-borderColor-dark bg-white dark:bg-zinc-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4 md:col-span-1">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-md bg-gradient-to-tr from-accent to-primary flex items-center justify-center text-white text-xs font-bold">
                  ⚡
                </div>
                <span className="font-bold text-lg tracking-tight">ZapShift</span>
              </Link>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xs">
                Premium nationwide fulfillment and delivery services operating at the speed of shift.
              </p>
            </div>
            
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-600 mb-3">Services</h4>
              <ul className="space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
                <li><a href="#services" className="hover:text-primary transition-colors">Express Courier</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Nationwide Shipping</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Fulfillment Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-600 mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Coverage Areas</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API Docs</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-600 mb-3">Compliance</h4>
              <div className="space-y-3 text-xs text-neutral-500 dark:text-neutral-400">
                <p className="flex items-center">
                  <ShieldCheck size={14} className="text-success mr-1.5" />
                  WCAG 2.1 AA Compliant
                </p>
                <div className="flex space-x-3 pt-1">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-white" title="Global Network">
                    <Globe size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-borderColor-light dark:border-borderColor-dark mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-xs text-neutral-400 dark:text-neutral-600">
              &copy; {new Date().getFullYear()} ZapShift Ltd. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 sm:mt-0 text-xs text-neutral-400 dark:text-neutral-600">
              <a href="#" className="hover:text-neutral-600 dark:hover:text-neutral-400">Privacy Policy</a>
              <a href="#" className="hover:text-neutral-600 dark:hover:text-neutral-400">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    
  );
}
