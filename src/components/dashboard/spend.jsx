import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Spend() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const data = [22, 35, 18, 48, 30, 62, 41];
  const max = Math.max(...data);
  const [hover, setHover] = useState(null);
  const [activeTab, setActiveTab] = useState("Week");

  return (
    <div className="rounded-3xl border bg-card p-6 shadow-soft text-left">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-foreground">Weekly spend</h3>
          <p className="text-sm text-muted-foreground">Across food, grocery and parcels.</p>
        </div>
        <div className="flex gap-1 rounded-full border bg-secondary p-1 text-xs">
          {["Week", "Month", "Year"].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`rounded-full px-3 py-1.5 font-semibold transition-colors cursor-pointer ${
                activeTab === t ? "bg-card text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex h-52 items-end justify-between gap-3">
        {data.map((v, i) => (
          <button
            key={i}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            className="group relative flex h-full flex-1 flex-col items-center justify-end border-0 bg-transparent p-0 cursor-pointer"
          >
            <motion.span
              initial={{ height: 0 }}
              animate={{ height: `${(v / max) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.05 }}
              className={`w-full rounded-t-xl transition-colors ${
                hover === i ? "bg-gradient-brand shadow-glow" : "bg-secondary group-hover:bg-secondary/85"
              }`}
            />
            <span className="mt-2 text-xs font-semibold text-muted-foreground">{days[i]}</span>
            {hover === i && (
              <span className="pointer-events-none absolute -top-2 -translate-y-full rounded-lg bg-foreground px-2.5 py-1 text-xs font-semibold text-background shadow-soft whitespace-nowrap z-10">
                ${v}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
