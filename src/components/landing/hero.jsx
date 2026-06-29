import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Sparkles,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Bike,
  Star,
  Leaf
} from 'lucide-react';
import Button from '../ui/button';
import { toast } from 'sonner';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    toast.success("Delivery address configured! Redirecting to Merchant Portal...");
    setTimeout(() => {
      navigate('/dashboard');
    }, 800);
  };

  return (
    <section ref={ref} className="relative overflow-hidden pt-12 md:pt-16 pb-20">
      {/* Gradient Blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-brand opacity-30 blur-3xl animate-pulse-slow" />
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-[oklch(0.77_0.17_65)] opacity-25 blur-3xl" />
        <div className="absolute -left-20 top-72 h-72 w-72 rounded-full bg-[oklch(0.55_0.22_285)] opacity-25 blur-3xl animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] [background-size:24px_24px] opacity-50" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] text-left">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <span className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-3 py-1.5 text-xs font-medium backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            New · Swift Eco riders are now in your city
          </span>
          <h1 className="mt-6 font-display text-[44px] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[72px] text-foreground">
            Delivery that feels{" "}
            <span className="text-gradient-brand">effortlessly fast.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Food, groceries and parcels — one beautiful app. Live tracking,
            transparent pricing, and riders who actually smile at the door.
          </p>

          <form
            onSubmit={handleSearchSubmit}
            className="mt-8 flex w-full max-w-lg flex-col gap-2 rounded-2xl border bg-card/80 p-2 shadow-soft backdrop-blur sm:flex-row sm:items-center sm:rounded-full sm:pl-5"
          >
            <div className="flex items-center flex-1 px-2">
              <MapPin className="hidden h-5 w-5 text-muted-foreground sm:block shrink-0" />
              <input
                type="text"
                required
                placeholder="Enter your delivery address"
                className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Find food <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              No subscription fees
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              Live order tracking
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              24/7 support
            </div>
          </div>
        </motion.div>

        {/* Parallax Card column */}
        <motion.div style={{ y }} className="relative">
          <HeroCard />
        </motion.div>
      </div>
    </section>
  );
}

function HeroCard() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative rounded-[28px] border bg-card p-5 shadow-glow text-left"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-brand text-white shadow-glow">
              <Bike className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Order #SW-48213</p>
              <p className="text-sm font-semibold text-foreground">Arriving in 8 min</p>
            </div>
          </div>
          <span className="rounded-full bg-success/15 px-2.5 py-1 text-xs font-medium text-success">
            On the way
          </span>
        </div>

        <div className="mt-5 rounded-2xl bg-secondary/60 p-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Picked up</span>
            <span>Delivered</span>
          </div>
          <div className="relative mt-2 h-2 overflow-hidden rounded-full bg-background">
            <motion.div
              initial={{ width: "10%" }}
              animate={{ width: "68%" }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-brand"
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
            {[
              ["Confirmed", true],
              ["Picked", true],
              ["Delivered", false],
            ].map(([label, completed]) => (
              <div key={label} className="rounded-xl bg-card p-2 border">
                <p className={`font-medium ${completed ? "text-foreground" : "text-muted-foreground"}`}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {[
            { name: "Truffle mushroom pizza", qty: 1, price: "$18.00" },
            { name: "Caesar salad", qty: 2, price: "$22.00" },
            { name: "Sparkling lemonade", qty: 1, price: "$4.50" },
          ].map((item) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <span className="truncate text-muted-foreground">
                {item.qty}× {item.name}
              </span>
              <span className="font-semibold text-foreground">{item.price}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating Chips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute -left-6 top-10 hidden rounded-2xl border bg-card px-3 py-2 shadow-soft sm:flex sm:items-center sm:gap-2 text-left"
      >
        <Star className="h-4 w-4 fill-brand-2 text-brand-2" />
        <span className="text-xs font-semibold text-foreground">4.9 · 12k reviews</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="absolute -right-4 bottom-10 hidden rounded-2xl border bg-card px-3 py-2 shadow-soft sm:flex sm:items-center sm:gap-2 text-left"
      >
        <Leaf className="h-4 w-4 text-success" />
        <span className="text-xs font-semibold text-foreground">Carbon-neutral</span>
      </motion.div>
    </div>
  );
}
