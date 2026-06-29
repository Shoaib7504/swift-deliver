import { UtensilsCrossed, ShoppingBasket, Package, CreditCard, MapPin, Calendar } from 'lucide-react';
import { toast } from 'sonner';

export default function QuickActions() {
  const actions = [
    { icon: UtensilsCrossed, label: "Order food" },
    { icon: ShoppingBasket, label: "Groceries" },
    { icon: Package, label: "Send a parcel" },
    { icon: CreditCard, label: "Top up wallet" },
    { icon: MapPin, label: "Add address" },
    { icon: Calendar, label: "Schedule" },
  ];

  const handleActionClick = (label) => {
    toast.success(`Action triggered: ${label}`);
  };

  return (
    <div className="rounded-3xl border bg-card p-6 shadow-soft text-left">
      <h3 className="text-lg font-bold text-foreground">Quick actions</h3>
      <p className="text-sm text-muted-foreground">One tap to get going.</p>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {actions.map((a) => (
          <button
            key={a.label}
            onClick={() => handleActionClick(a.label)}
            className="flex flex-col items-start gap-3 rounded-2xl border bg-secondary/60 p-4 text-left transition-all hover:-translate-y-0.5 hover:bg-secondary cursor-pointer w-full text-foreground group"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-white shadow-glow group-hover:scale-105 transition-transform">
              <a.icon className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold">{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
