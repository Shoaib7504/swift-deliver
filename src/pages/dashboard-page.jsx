import { Plus } from 'lucide-react';
import Sidebar from '../components/dashboard/sidebar';
import Topbar from '../components/dashboard/topbar';
import Stats from '../components/dashboard/stats';
import Spend from '../components/dashboard/spend';
import QuickActions from '../components/dashboard/quick-actions';
import RecentOrders from '../components/dashboard/recent-orders';
import Sidecards from '../components/dashboard/sidecards';
import { toast } from 'sonner';
import { useAuth } from '../context/auth-context';

export default function DashboardPage() {
  const { user } = useAuth();
  
  const handleNewOrder = () => {
    toast.success("Starting new order booking form...");
  };

  return (
    <div className="min-h-screen bg-secondary/40 text-foreground transition-colors duration-300">
      <div className="mx-auto flex max-w-[1400px] gap-6 p-4 sm:p-6 text-left">
        <Sidebar />
        
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <Topbar />
          
          {/* Greeting Section */}
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
                Good evening, {user?.name || 'Alex'} 👋
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                You've saved <span className="font-semibold text-foreground">$42</span> this month with Swift+.
              </p>
            </div>
            <button
              onClick={handleNewOrder}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-gradient-brand px-5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] cursor-pointer border-0"
            >
              <Plus className="h-4 w-4" /> New order
            </button>
          </div>

          <Stats />
          
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <Spend />
            <QuickActions />
          </div>
          
          <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <RecentOrders />
            <Sidecards />
          </div>
        </div>
      </div>
    </div>
  );
}
