import { Search, Bell, LayoutGrid } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../context/auth-context';

export default function Topbar() {
  const { user } = useAuth();

  const handleAlertClick = () => {
    toast.success("No new notifications");
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      toast.info(`Searching for "${e.target.value}"...`);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-3xl border bg-card p-3 shadow-soft text-left">
      <div className="flex flex-1 items-center gap-2 rounded-2xl bg-secondary px-4">
        <Search className="h-4 w-4 text-muted-foreground shrink-0" />
        <input
          onKeyDown={handleSearchKeyPress}
          placeholder="Search orders, restaurants, items…"
          className="h-11 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground"
        />
        <kbd className="rounded border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">⌘K</kbd>
      </div>
      <button
        onClick={handleAlertClick}
        aria-label="Notifications"
        className="relative grid h-11 w-11 place-items-center rounded-2xl border bg-card hover:bg-secondary cursor-pointer text-foreground"
      >
        <Bell className="h-4 w-4" />
        <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-brand-3" />
      </button>
      <button
        onClick={() => toast.info("Opening dashboard panel layout settings...")}
        className="grid h-11 w-11 place-items-center rounded-2xl border bg-card hover:bg-secondary cursor-pointer text-foreground"
      >
        <LayoutGrid className="h-4 w-4" />
      </button>
      <div className="flex items-center gap-3 rounded-2xl border bg-card px-2 py-1.5 text-foreground">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-brand text-sm font-semibold text-white">
          {user?.avatarInitials || 'A'}
        </span>
        <div className="pr-2 text-right text-xs leading-tight">
          <p className="font-semibold">{user?.name || 'Alex Rivera'}</p>
          <p className="text-muted-foreground">{user?.tier || 'Swift+'}</p>
        </div>
      </div>
    </div>
  );
}
