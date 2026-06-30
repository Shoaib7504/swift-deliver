import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Sparkles, 
  Sun, 
  Moon,
  ChevronDown
} from 'lucide-react';
import useAuth from '../hooks/UseAuth';
import useTheme from '../hooks/useTheme';
import { toast } from 'sonner';

export default function UserDropdown() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    navigate('/');
  };

  // Determine badge styling based on user tier
  const getTierBadgeClass = (tier) => {
    switch (tier?.toLowerCase()) {
      case 'pro merchant':
      case 'pro':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'standard':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-neutral-500/10 text-neutral-600 dark:text-neutral-400 border-neutral-500/20';
    }
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-1.5 rounded-xl border border-borderColor-light/80 dark:border-borderColor-dark/80 hover:bg-neutral-50 dark:hover:bg-zinc-900 transition-all text-left focus:outline-none cursor-pointer"
      >
        <img src={user?.photoURL} className="w-8 h-8 rounded-lg bg-gradient-brand text-white flex items-center justify-center font-bold text-sm shadow-sm">
        </img>
        <div className="hidden sm:block pr-1">
          <p className="text-xs font-semibold leading-tight text-neutral-800 dark:text-neutral-200">
            {user.name}
          </p>
          <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">
            {user.tier || 'Merchant'}
          </p>
        </div>
        <ChevronDown size={14} className={`text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Popover overlay to close */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            
            {/* Dropdown Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute right-0 mt-2.5 w-64 rounded-2xl bg-card dark:bg-zinc-900 border border-borderColor-light dark:border-borderColor-dark shadow-xl p-2.5 z-50 overflow-hidden"
            >
              {/* User Header Block */}
              <div className="px-3.5 py-3 border-b border-borderColor-light dark:border-borderColor-dark text-left bg-neutral-50/55 dark:bg-zinc-800/40 rounded-xl mb-2">
                <div className="flex items-center space-x-3">
                  <img src={user?.photoURL} className="w-10 h-10 rounded-xl bg-gradient-brand text-white flex items-center justify-center font-bold text-base shadow-sm">
                  </img>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 leading-tight truncate">
                      {user.name}
                    </h4>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 font-medium truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="mt-2.5 flex items-center justify-between">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getTierBadgeClass(user.tier)}`}>
                    {user.tier || 'Starter'}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-medium flex items-center">
                    <Sparkles size={10} className="text-amber-500 mr-1 animate-pulse" /> Active
                  </span>
                </div>
              </div>

              {/* Menu Links */}
              <div className="space-y-0.5">
                <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                  <button className="w-full text-left px-3 py-2 text-xs font-medium rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-zinc-800 flex items-center space-x-2.5 transition-colors cursor-pointer">
                    <LayoutDashboard size={14} className="text-neutral-400 dark:text-neutral-500" />
                    <span>Merchant Dashboard</span>
                  </button>
                </Link>

                <button
                  onClick={() => {
                    toast.success("Account Settings will be loaded in production.");
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-medium rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-zinc-800 flex items-center space-x-2.5 transition-colors cursor-pointer"
                >
                  <Settings size={14} className="text-neutral-400 dark:text-neutral-500" />
                  <span>Account Settings</span>
                </button>

                {/* Inline Theme Switcher */}
                <button
                  onClick={() => {
                    toggleTheme();
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-medium rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-zinc-800 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-2.5">
                    {theme === 'dark' ? (
                      <Sun size={14} className="text-yellow-500" />
                    ) : (
                      <Moon size={14} className="text-blue-500" />
                    )}
                    <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-zinc-700 text-neutral-500 dark:text-neutral-400">
                    Switch
                  </span>
                </button>

                <button
                  onClick={() => {
                    toast.success("Support center loaded!");
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-medium rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-zinc-800 flex items-center space-x-2.5 transition-colors cursor-pointer"
                >
                  <HelpCircle size={14} className="text-neutral-400 dark:text-neutral-500" />
                  <span>Help & Support</span>
                </button>
              </div>

              {/* Logout Block */}
              <div className="border-t border-borderColor-light dark:border-borderColor-dark mt-2 pt-1.5">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-xs font-medium rounded-xl text-error hover:bg-error/10 flex items-center space-x-2.5 transition-colors cursor-pointer"
                >
                  <LogOut size={14} />
                  <span>Log out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
