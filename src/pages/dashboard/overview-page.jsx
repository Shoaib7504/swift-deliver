import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  TrendingUp,
  Package,
  Clock,
  ArrowUpRight,
  PlusCircle,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import Button from '../../components/ui/button';
import CountUp from '../../components/ui/count-up';

export default function OverviewPage() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);

  // Mock dashboard analytics data
  const chartData = [
    { name: 'Mon', Standard: 45, Express: 20 },
    { name: 'Tue', Standard: 59, Express: 35 },
    { name: 'Wed', Standard: 80, Express: 40 },
    { name: 'Thu', Standard: 51, Express: 22 },
    { name: 'Fri', Standard: 95, Express: 55 },
    { name: 'Sat', Standard: 120, Express: 80 },
    { name: 'Sun', Standard: 140, Express: 92 },
  ];

  const recentDeliveries = [
    { id: 'ZP-9403', name: 'Kabir Ahmed', dest: 'Uttara, Dhaka', date: 'Just now', price: 95, status: 'In Transit', type: 'express' },
    { id: 'ZP-8291', name: 'Mahrin Rahman', dest: 'Boalmari, Faridpur', date: '2 hours ago', price: 110, status: 'Delivered', type: 'standard' },
    { id: 'ZP-7362', name: 'Zeeshan Ali', dest: 'Halishahar, Chattogram', date: 'Yesterday', price: 155, status: 'Delivered', type: 'express' },
    { id: 'ZP-6391', name: 'Sadia Islam', dest: 'Sylhet Sadar', date: '3 days ago', price: 95, status: 'Returned', type: 'standard' },
  ];

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-success/15 text-success';
      case 'in transit': return 'bg-info/15 text-info';
      case 'returned': return 'bg-error/15 text-error';
      default: return 'bg-neutral-100 text-neutral-500';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 bg-neutral-200 dark:bg-zinc-800 rounded w-1/4 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-neutral-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="h-96 bg-neutral-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Overview Dashboard</h1>
          <p className="text-xs text-neutral-400">Welcome back, John! Monitor shipping speeds and payout remittances.</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Link to="/dashboard/create">
            <Button size="sm" className="bg-primary text-white hover:bg-primary-dark">
              <PlusCircle size={15} className="mr-1.5" />
              Create Shipment
            </Button>
          </Link>
        </div>
      </div>

      {/* 1. ANALYTICS SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="p-6 rounded-xl border border-borderColor-light dark:border-borderColor-dark bg-white dark:bg-zinc-900/40 text-left space-y-4 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400">Total Shipments</span>
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
              <Package size={16} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-white">
              <CountUp start={0} end={590} duration={1.2} />
            </h3>
            <p className="text-[10px] text-success font-semibold flex items-center">
              <TrendingUp size={12} className="mr-1" />
              +14% from last month
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-6 rounded-xl border border-borderColor-light dark:border-borderColor-dark bg-white dark:bg-zinc-900/40 text-left space-y-4 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400">Success Rate</span>
            <div className="p-1.5 rounded-lg bg-success/10 text-success">
              <CheckCircle size={16} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-white">
              <CountUp start={0} end={98.4} decimals={1} suffix="%" duration={1} />
            </h3>
            <p className="text-[10px] text-neutral-400">Target goal: &gt;97% success</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-6 rounded-xl border border-borderColor-light dark:border-borderColor-dark bg-white dark:bg-zinc-900/40 text-left space-y-4 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400">Avg Delivery Speed</span>
            <div className="p-1.5 rounded-lg bg-info/10 text-info">
              <Clock size={16} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-white">
              <CountUp start={0} end={28.6} decimals={1} suffix="h" duration={1} />
            </h3>
            <p className="text-[10px] text-success font-semibold flex items-center">
              <TrendingUp size={12} className="mr-1" />
              -2.1 hours dispatch time
            </p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-6 rounded-xl border border-borderColor-light dark:border-borderColor-dark bg-white dark:bg-zinc-900/40 text-left space-y-4 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400">COD Return Rate</span>
            <div className="p-1.5 rounded-lg bg-error/10 text-error">
              <AlertCircle size={16} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-white">
              <CountUp start={0} end={1.6} decimals={1} suffix="%" duration={1} />
            </h3>
            <p className="text-[10px] text-success font-semibold">Low Return Risk</p>
          </div>
        </div>
      </div>

      {/* 2. RECHARTS ACTIVITY GRAPH */}
      <div className="p-6 rounded-xl border border-borderColor-light dark:border-borderColor-dark bg-white dark:bg-zinc-900/40 text-left space-y-6 shadow-soft">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-extrabold text-base">Logistics Volume Stream</h3>
            <p className="text-[11px] text-neutral-400">Volume tracking comparison between Express and Standard delivery services.</p>
          </div>
          
          <div className="flex items-center space-x-4 text-xs font-medium text-neutral-500">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              <span>Standard</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
              <span>Express</span>
            </div>
          </div>
        </div>

        {/* Chart Window */}
        <div className="h-80 w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorStandard" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpress" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#27272a' : '#e4e4e7'} />
              <XAxis dataKey="name" stroke="#a3a3a3" tickLine={false} />
              <YAxis stroke="#a3a3a3" tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#121214' : '#ffffff',
                  borderColor: theme === 'dark' ? '#27272a' : '#e4e4e7',
                  borderRadius: '8px',
                  color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
                }}
              />
              <Area type="monotone" dataKey="Standard" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorStandard)" />
              <Area type="monotone" dataKey="Express" stroke="#14b8a6" strokeWidth={2} fillOpacity={1} fill="url(#colorExpress)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. RECENT ACTIVITY FEED & QUICK BENTO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Deliveries Table snippet */}
        <div className="p-6 rounded-xl border border-borderColor-light dark:border-borderColor-dark bg-white dark:bg-zinc-900/40 text-left space-y-4 shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base">Recent Deliveries</h3>
            <Link to="/dashboard/shipments">
              <Button variant="ghost" size="sm" className="text-xs">
                View All
                <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-neutral-500 dark:text-neutral-400">
              <thead>
                <tr className="border-b border-borderColor-light dark:border-borderColor-dark text-neutral-400 font-bold">
                  <th className="py-2.5 text-left font-semibold">Order ID</th>
                  <th className="py-2.5 text-left font-semibold">Customer</th>
                  <th className="py-2.5 text-left font-semibold">Destination</th>
                  <th className="py-2.5 text-left font-semibold">Status</th>
                  <th className="py-2.5 text-right font-semibold">Fare</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderColor-light/40 dark:divide-borderColor-dark/40">
                {recentDeliveries.map((del) => (
                  <tr key={del.id} className="hover:bg-neutral-50/50 dark:hover:bg-zinc-800/20">
                    <td className="py-3 font-semibold text-neutral-900 dark:text-white">{del.id}</td>
                    <td className="py-3 font-medium text-neutral-700 dark:text-neutral-300">{del.name}</td>
                    <td className="py-3">{del.dest}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusColor(del.status)}`}>
                        {del.status}
                      </span>
                    </td>
                    <td className="py-3 text-right font-bold text-neutral-800 dark:text-neutral-200">৳{del.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions Bento */}
        <div className="p-6 rounded-xl border border-borderColor-light dark:border-borderColor-dark bg-white dark:bg-zinc-900/40 text-left space-y-4 shadow-soft">
          <h3 className="font-extrabold text-base">Quick Actions</h3>
          
          <div className="space-y-3.5">
            <Link to="/dashboard/create" className="block">
              <div className="p-3 rounded-lg border border-borderColor-light dark:border-borderColor-dark hover:border-primary dark:hover:border-accent-light bg-neutral-50 dark:bg-zinc-900/50 transition-colors flex items-center justify-between group">
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <PlusCircle size={15} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Book Shipping</p>
                    <p className="text-[10px] text-neutral-400">Dispatch local or express courier</p>
                  </div>
                </div>
                <ArrowUpRight size={14} className="text-neutral-400 group-hover:text-primary dark:group-hover:text-accent-light" />
              </div>
            </Link>

            <Link to="/dashboard/coverage" className="block">
              <div className="p-3 rounded-lg border border-borderColor-light dark:border-borderColor-dark hover:border-secondary dark:hover:border-accent-light bg-neutral-50 dark:bg-zinc-900/50 transition-colors flex items-center justify-between group">
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 rounded-md bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                    <ArrowUpRight size={15} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Fulfillment Hubs</p>
                    <p className="text-[10px] text-neutral-400">View coordinates, capacity, limits</p>
                  </div>
                </div>
                <ArrowUpRight size={14} className="text-neutral-400 group-hover:text-secondary" />
              </div>
            </Link>

            <div className="p-4 rounded-lg bg-primary/5 dark:bg-accent/5 border border-primary/10 text-xs text-neutral-500 dark:text-neutral-400 leading-normal flex items-start space-x-2.5">
              <FileSpreadsheet size={16} className="text-primary shrink-0 mt-0.5" />
              <div>
                <strong>Weekly Remittance report:</strong> Your payout remittance summary has been auto-generated. Next remittance release is July 3rd.
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
