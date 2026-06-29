import { Link } from 'react-router-dom';
import { UtensilsCrossed, ShoppingBasket, Package, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

export default function RecentOrders() {
  const orders = [
    { id: "SW-48213", name: "Truffle Pizza Co.", status: "On the way", price: "$44.50", icon: UtensilsCrossed, eta: "8 min" },
    { id: "SW-48198", name: "Whole Greens Market", status: "Delivered", price: "$86.20", icon: ShoppingBasket, eta: "Yesterday" },
    { id: "SW-48175", name: "Parcel to Mia", status: "Delivered", price: "$12.00", icon: Package, eta: "2d ago" },
    { id: "SW-48144", name: "Sushi Den", status: "Delivered", price: "$33.10", icon: UtensilsCrossed, eta: "3d ago" },
  ];

  return (
    <div className="rounded-3xl border bg-card p-6 shadow-soft text-left">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-foreground">Recent orders</h3>
          <p className="text-sm text-muted-foreground">Track or re-order in one click.</p>
        </div>
        <button
          onClick={() => toast.info("Opening complete order ledger history...")}
          className="text-xs font-semibold text-brand hover:underline cursor-pointer bg-transparent border-0 p-0"
        >
          View all
        </button>
      </div>
      <div className="mt-5 divide-y divide-border/60">
        {orders.map((o) => (
          <div
            key={o.id}
            onClick={() => toast.success(`Viewing order details for ${o.id}`)}
            className="flex items-center gap-4 py-4 transition-colors hover:bg-secondary/20 cursor-pointer rounded-xl px-2"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-secondary text-foreground">
              <o.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">{o.name}</p>
              <p className="truncate text-xs text-muted-foreground">{o.id} · {o.eta}</p>
            </div>
            <span
              className={`hidden rounded-full px-2.5 py-1 text-xs font-semibold sm:inline-flex ${
                o.status === "On the way"
                  ? "bg-brand/15 text-brand"
                  : "bg-success/15 text-success"
              }`}
            >
              {o.status}
            </span>
            <span className="w-20 text-right text-sm font-bold text-foreground">{o.price}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
