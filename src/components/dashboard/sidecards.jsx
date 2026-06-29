import { Link } from 'react-router-dom';
import { Heart, Bike } from 'lucide-react';
import MiniMap from './minimap';
import { toast } from 'sonner';

export default function Sidecards() {
  const favorites = ["Truffle Pizza Co.", "Whole Greens Market", "Sushi Den"];

  const handleOrderFavorite = (name) => {
    toast.success(`Booking dispatch for favorite store: ${name}`);
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      {/* Active delivery mapping widget */}
      <div className="rounded-3xl border bg-card p-6 shadow-soft">
        <h3 className="text-lg font-bold text-foreground">Active delivery</h3>
        <p className="text-sm text-muted-foreground">Order SW-48213 · Truffle Pizza Co.</p>
        <div className="mt-4 overflow-hidden rounded-2xl border">
          <MiniMap />
        </div>
        <div className="mt-4 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-brand text-white shadow-glow">
            <Bike className="h-4 w-4" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Marcus is on the way</p>
            <p className="text-xs text-muted-foreground">Arrives in ~8 min</p>
          </div>
          <button
            onClick={() => toast.success("Opening live GPS tracking view...")}
            className="inline-flex h-10 items-center rounded-full bg-foreground px-4 text-xs font-semibold text-background hover:opacity-90 cursor-pointer border-0"
          >
            Track
          </button>
        </div>
      </div>

      {/* Favorites shortcuts */}
      <div className="rounded-3xl border bg-card p-6 shadow-soft">
        <h3 className="text-lg font-bold text-foreground">Favorites</h3>
        <div className="mt-4 space-y-3">
          {favorites.map((n) => (
            <div key={n} className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-secondary text-foreground">
                <Heart className="h-4 w-4 fill-brand-3 text-brand-3" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{n}</p>
                <p className="text-xs text-muted-foreground">Re-order in 1 tap</p>
              </div>
              <button
                onClick={() => handleOrderFavorite(n)}
                className="rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold hover:bg-secondary/80 cursor-pointer border-0 text-foreground"
              >
                Order
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
