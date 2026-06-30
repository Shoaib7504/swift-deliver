import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  PlusCircle,
  Table,
  MapPin,
  Bell,
  Search,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Info,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  Command
} from 'lucide-react';
import useTheme from '../hooks/useTheme';
import Button from '../components/ui/button';
import Dialog from '../components/ui/dialog';
import { Toaster, toast } from 'sonner';
import useAuth from '../hooks/UseAuth';


export default function DashboardLayout({ children }) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Sidebar collapse state
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Modal / drawer states
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');

  // Mock Notifications Data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Package Dispatched',
      desc: 'Order #ZP-9403 has been handed over to the courier in Dhaka.',
      time: '10 mins ago',
      type: 'info',
      unread: true
    },
    {
      id: 2,
      title: 'Delivery Successful',
      desc: 'Order #ZP-8291 was successfully delivered to Chattogram.',
      time: '2 hours ago',
      type: 'success',
      unread: true
    },
    {
      id: 3,
      title: 'Warehouse Limit Alert',
      desc: 'Faridpur warehouse has reached 90% storage capacity.',
      time: '5 hours ago',
      type: 'warning',
      unread: false
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  // Listen for Ctrl+K / Cmd+K to trigger command palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const menuItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'New Shipment', path: '/dashboard/create', icon: PlusCircle },
    { name: 'Shipments List', path: '/dashboard/shipments', icon: Table },
    { name: 'Coverage Map', path: '/dashboard/coverage', icon: MapPin },
  ];

  // Actions for Command Palette
  const allCommands = [
    { label: 'Go to Dashboard Overview', action: () => { navigate('/dashboard'); setIsCommandOpen(false); } },
    { label: 'Create New Shipment', action: () => { navigate('/dashboard/create'); setIsCommandOpen(false); } },
    { label: 'View Shipments List', action: () => { navigate('/dashboard/shipments'); setIsCommandOpen(false); } },
    { label: 'Explore Warehouse Coverage', action: () => { navigate('/dashboard/coverage'); setIsCommandOpen(false); } },
    { label: 'Toggle Light/Dark Theme', action: () => { toggleTheme(); toast.success('Theme changed successfully'); setIsCommandOpen(false); } },
    { label: 'Clear Notifications', action: () => { setNotifications([]); toast.info('Notifications cleared'); setIsCommandOpen(false); } }
  ];

  const filteredCommands = allCommands.filter(cmd =>
    cmd.label.toLowerCase().includes(commandQuery.toLowerCase())
  );

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    toast.success('Marked all as read');
  };

  return (
    <div className="min-h-screen flex bg-bg-light dark:bg-bg-dark text-neutral-800 dark:text-neutral-200 transition-colors duration-300">
      <Toaster richColors position="top-right" />

      {/* 1. COLLAPSIBLE SIDEBAR */}
      <motion.aside
        animate={{ width: isCollapsed ? 76 : 260 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex flex-col border-r border-borderColor-light dark:border-borderColor-dark bg-white dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 h-screen z-30"
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-borderColor-light dark:border-borderColor-dark">
          <Link to="/" className="flex items-center space-x-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent to-primary flex items-center justify-center text-white shrink-0">
              <span className="font-extrabold text-sm">⚡</span>
            </div>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent"
              >
                ZapShift
              </motion.span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-md text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hidden md:inline-flex"
            aria-label="Toggle Sidebar"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                className="relative flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium transition-all group hover:bg-neutral-100 dark:hover:bg-zinc-900/60"
              >
                {/* Active Slider Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute inset-0 bg-primary/10 dark:bg-accent/15 border-l-2 border-primary dark:border-accent-light rounded-lg pointer-events-none"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                <div className="flex items-center space-x-3 z-10">
                  <Icon
                    size={18}
                    className={
                      isActive
                        ? 'text-primary dark:text-accent-light'
                        : 'text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-300'
                    }
                  />
                  {!isCollapsed && (
                    <span className={isActive ? 'text-neutral-950 dark:text-white font-semibold' : 'text-neutral-600 dark:text-neutral-400'}>
                      {item.name}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-borderColor-light dark:border-borderColor-dark flex flex-col items-center justify-center space-y-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-full justify-start text-xs text-neutral-500 dark:text-neutral-400 p-2 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              {theme === 'dark' ? (
                <>
                  <Sun size={16} className="text-yellow-400" />
                  {!isCollapsed && <span>Light Mode</span>}
                </>
              ) : (
                <>
                  <Moon size={16} />
                  {!isCollapsed && <span>Dark Mode</span>}
                </>
              )}
            </div>
          </Button>

          <Link to="/" className="w-full">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-xs text-error p-2 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <LogOut size={16} />
                {!isCollapsed && <span>Exit Portal</span>}
              </div>
            </Button>
          </Link>
        </div>
      </motion.aside>

      {/* 2. MAIN LAYOUT WORKSPACE */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        
        {/* Top Navbar */}
        <header className="h-16 border-b border-borderColor-light dark:border-borderColor-dark bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6">
          {/* Left search triggering palette */}
          <div className="flex items-center space-x-4">
            {/* Logo on mobile only */}
            <Link to="/" className="flex items-center space-x-2 md:hidden">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent to-primary flex items-center justify-center text-white">
                <span className="font-extrabold text-sm">⚡</span>
              </div>
            </Link>

            <button
              onClick={() => setIsCommandOpen(true)}
              className="flex items-center space-x-2.5 px-3 py-1.5 rounded-lg border border-borderColor-light dark:border-borderColor-dark text-xs text-neutral-400 dark:text-neutral-500 hover:bg-neutral-50 dark:hover:bg-zinc-900 transition-all font-medium"
            >
              <Search size={14} />
              <span className="hidden sm:inline">Search actions or features...</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-[10px]">
                Ctrl K
              </kbd>
            </button>
          </div>

          {/* Right actions */}
          <div className="flex items-center space-x-3">
            {/* Mobile Nav Trigger Links (Only visible when mobile layout active) */}
            <div className="flex items-center md:hidden space-x-2">
              <Link to="/dashboard" className="p-2 text-neutral-500 hover:text-neutral-800 dark:hover:text-white" title="Dashboard">
                <LayoutDashboard size={18} />
              </Link>
              <Link to="/dashboard/create" className="p-2 text-neutral-500 hover:text-neutral-800 dark:hover:text-white" title="New Shipment">
                <PlusCircle size={18} />
              </Link>
              <Link to="/dashboard/shipments" className="p-2 text-neutral-500 hover:text-neutral-800 dark:hover:text-white" title="Shipments">
                <Table size={18} />
              </Link>
              <Link to="/dashboard/coverage" className="p-2 text-neutral-500 hover:text-neutral-800 dark:hover:text-white" title="Coverage">
                <MapPin size={18} />
              </Link>
            </div>

            {/* Notifications Toggler */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsNotificationsOpen(true)}
                className="p-2 rounded-lg relative text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white"
                aria-label="Notifications"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-error border-2 border-white dark:border-zinc-950 animate-pulse" />
                )}
              </Button>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-1 rounded-full border border-borderColor-light dark:border-borderColor-dark text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white"
                aria-label="User Profile"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-accent/30 to-primary/30 flex items-center justify-center text-primary-dark dark:text-accent-light text-xs font-semibold uppercase">
                  {user?.avatarInitials || 'US'}
                </div>
              </Button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    {/* Popover overlay to close */}
                    <div className="fixed inset-0 z-30" onClick={() => setIsProfileOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute right-0 mt-2.5 w-60 rounded-xl bg-cardBg-light dark:bg-cardBg-dark border border-borderColor-light dark:border-borderColor-dark shadow-soft-dark p-2 z-40"
                    >
                      <div className="px-3 py-2 border-b border-borderColor-light dark:border-borderColor-dark text-left">
                        <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 truncate">{user?.name || 'John Seller'}</p>
                        <p className="text-xs text-neutral-400 truncate">{user?.email || 'merchant@zapshift.com'}</p>
                      </div>
                      <div className="py-1">
                        <Link to="/" onClick={() => setIsProfileOpen(false)}>
                          <button className="w-full text-left px-3 py-2 text-xs font-medium rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-zinc-800 flex items-center space-x-2">
                            <Sparkles size={14} className="text-amber-500" />
                            <span>Landing Page</span>
                          </button>
                        </Link>
                        <button
                          onClick={() => { toggleTheme(); setIsProfileOpen(false); }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-zinc-800 flex items-center space-x-2"
                        >
                          <Sun size={14} className="text-primary" />
                          <span>Toggle Dark Mode</span>
                        </button>
                      </div>
                      <div className="border-t border-borderColor-light dark:border-borderColor-dark pt-1.5">
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            logout();
                            navigate('/');
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium rounded-lg text-error hover:bg-error/10 flex items-center space-x-2 cursor-pointer"
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
          </div>
        </header>

        {/* Dashboard Content Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* 3. NOTIFICATION SLIDE-OVER DRAWER */}
      <AnimatePresence>
        {isNotificationsOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNotificationsOpen(false)}
              className="absolute inset-0 bg-neutral-950/30 dark:bg-neutral-950/60 backdrop-blur-xs"
            />
            {/* Panel */}
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="w-screen max-w-md bg-cardBg-light dark:bg-cardBg-dark border-l border-borderColor-light dark:border-borderColor-dark shadow-soft-dark flex flex-col h-full"
              >
                <div className="px-6 py-5 border-b border-borderColor-light dark:border-borderColor-dark flex items-center justify-between bg-neutral-50 dark:bg-zinc-950/50">
                  <div className="flex items-center space-x-2">
                    <Bell size={18} className="text-primary dark:text-accent-light" />
                    <h3 className="font-bold text-neutral-800 dark:text-neutral-200">Alert Center</h3>
                  </div>
                  <button
                    onClick={() => setIsNotificationsOpen(false)}
                    className="p-1 rounded-md text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Notifications list */}
                <div className="flex-1 overflow-y-auto py-4 divide-y divide-borderColor-light dark:divide-borderColor-dark">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-5 flex items-start space-x-3.5 transition-colors ${
                          notif.unread ? 'bg-primary/5 dark:bg-accent/5' : 'hover:bg-neutral-50 dark:hover:bg-zinc-900/30'
                        }`}
                      >
                        {notif.type === 'success' && (
                          <div className="p-1.5 rounded-lg bg-success/10 text-success shrink-0">
                            <CheckCircle size={16} />
                          </div>
                        )}
                        {notif.type === 'warning' && (
                          <div className="p-1.5 rounded-lg bg-warning/10 text-warning shrink-0">
                            <AlertTriangle size={16} />
                          </div>
                        )}
                        {notif.type === 'info' && (
                          <div className="p-1.5 rounded-lg bg-info/10 text-info shrink-0">
                            <Info size={16} />
                          </div>
                        )}

                        <div className="flex-1 text-left space-y-1">
                          <div className="flex justify-between items-start">
                            <p className={`text-sm ${notif.unread ? 'font-bold text-neutral-900 dark:text-white' : 'font-medium text-neutral-700 dark:text-neutral-300'}`}>
                              {notif.title}
                            </p>
                            <span className="text-[10px] text-neutral-400 shrink-0">{notif.time}</span>
                          </div>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-normal">
                            {notif.desc}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-20 text-center text-neutral-400">
                      <Bell size={32} className="mx-auto text-neutral-300 dark:text-neutral-700 mb-3" />
                      <p className="text-sm">No new alerts to show</p>
                    </div>
                  )}
                </div>

                {/* Footer action */}
                {notifications.length > 0 && (
                  <div className="p-4 border-t border-borderColor-light dark:border-borderColor-dark bg-neutral-50 dark:bg-zinc-950/30">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={markAllRead}
                      className="w-full text-xs font-semibold py-2.5"
                    >
                      Mark All as Read
                    </Button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. KEYBOARD-TRIGGERED COMMAND PALETTE DIALOG */}
      <Dialog
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        title={
          <div className="flex items-center space-x-2 text-neutral-400">
            <Command size={16} />
            <span className="text-xs uppercase font-bold tracking-wider">Command Palette</span>
          </div>
        }
        size="md"
      >
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input
              type="text"
              autoFocus
              value={commandQuery}
              onChange={(e) => setCommandQuery(e.target.value)}
              placeholder="Type a command or page (e.g. create, coverage, dark)..."
              className="w-full pl-11 pr-4 py-3.5 rounded-lg border border-borderColor-light dark:border-borderColor-dark bg-neutral-100/50 dark:bg-neutral-800/40 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-neutral-800 dark:text-neutral-200"
            />
          </div>

          <div className="space-y-1 max-h-60 overflow-y-auto">
            {filteredCommands.length > 0 ? (
              filteredCommands.map((cmd, idx) => (
                <button
                  key={idx}
                  onClick={cmd.action}
                  className="w-full text-left px-4 py-3 rounded-lg text-sm text-neutral-600 dark:text-neutral-300 hover:bg-primary/5 hover:text-primary dark:hover:bg-accent/10 dark:hover:text-accent-light transition-all flex items-center justify-between group font-medium"
                >
                  <span>{cmd.label}</span>
                  <span className="text-xs text-neutral-400 group-hover:text-primary dark:group-hover:text-accent-light">Press Enter ⏎</span>
                </button>
              ))
            ) : (
              <div className="py-6 text-center text-xs text-neutral-400">
                No matching actions found. Try "Overview", "Shipment", or "Theme".
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
}
