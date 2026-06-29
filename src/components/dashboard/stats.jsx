import { motion } from 'framer-motion';
import { Package, TrendingUp, Clock, Star, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function Stats() {
  const cards = [
    { label: "Active orders", value: 2, delta: "+1", up: true, icon: Package, tint: "var(--brand)" },
    { label: "This month", value: "$214.80", delta: "+12%", up: true, icon: TrendingUp, tint: "var(--brand-3)" },
    { label: "Avg. delivery", value: "26 min", delta: "-3 min", up: true, icon: Clock, tint: "var(--brand-2)" },
    { label: "Loyalty points", value: "1,420", delta: "+85", up: true, icon: Star, tint: "var(--brand-4)" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 text-left">
      {cards.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="relative overflow-hidden rounded-3xl border bg-card p-5 shadow-soft"
        >
          <div
            aria-hidden
            className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-30 blur-2xl"
            style={{ background: c.tint }}
          />
          <div className="flex items-center justify-between">
            <span
              className="grid h-10 w-10 place-items-center rounded-xl text-white shadow-glow"
              style={{ background: c.tint }}
            >
              <c.icon className="h-4 w-4" />
            </span>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                c.up
                  ? "bg-success/15 text-success"
                  : "bg-destructive/15 text-destructive"
              }`}
            >
              {c.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {c.delta}
            </span>
          </div>
          <p className="mt-5 font-display text-3xl font-extrabold tracking-tight text-foreground">{c.value}</p>
          <p className="mt-1 text-sm text-muted-foreground">{c.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
