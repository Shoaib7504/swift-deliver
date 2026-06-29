import { Link } from 'react-router-dom';
import {
  Home,
  Package,
  UtensilsCrossed,
  ShoppingBasket,
  Heart,
  MapPin,
  Wallet,
  Settings,
  Bike,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';

export default function Sidebar() {
  const items = [
    { icon: Home, label: "Overview", active: true },
    { icon: Package, label: "Orders" },
    { icon: UtensilsCrossed, label: "Restaurants" },
    { icon: ShoppingBasket, label: "Groceries" },
    { icon: Heart, label: "Favorites" },
    { icon: MapPin, label: "Addresses" },
    { icon: Wallet, label: "Wallet" },
    { icon: Settings, label: "Settings" },
  ];

  const handleNavClick = (label) => {
    toast.info(`Navigating to ${label}...`);
  };

  return (
    <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-64 shrink-0 flex-col rounded-3xl border bg-card p-4 shadow-soft lg:flex text-left">
      <Link to="/" className="flex items-center gap-2 px-2 py-2 font-display text-lg font-bold text-foreground">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-white shadow-glow">
          <Bike className="h-5 w-5" />
        </span>
        Swift
      </Link>
      <nav className="mt-4 flex flex-1 flex-col gap-1">
        {items.map((i) => (
          <button
            key={i.label}
            onClick={() => handleNavClick(i.label)}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
              i.active
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
            }`}
          >
            <i.icon className="h-4 w-4 shrink-0" /> {i.label}
            {i.active && <ChevronRight className="ml-auto h-4 w-4" />}
          </button>
        ))}
      </nav>
      <div className="mt-4 rounded-2xl bg-gradient-brand p-4 text-white shadow-glow">
        <p className="text-sm font-semibold">Swift+ Member</p>
        <p className="mt-1 text-xs opacity-90 leading-normal">Free delivery on orders over $15.</p>
        <button
          onClick={() => toast.success("You are already enjoying Swift+ benefits!")}
          className="mt-3 inline-flex h-9 items-center justify-center rounded-full bg-white/20 px-4 text-xs font-semibold backdrop-blur hover:bg-white/30 cursor-pointer text-white"
        >
          View benefits
        </button>
      </div>
    </aside>
  );
}
