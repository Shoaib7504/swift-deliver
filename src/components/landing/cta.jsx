import { Link } from 'react-router-dom';
import { Zap, ShieldCheck, Clock, Wallet } from 'lucide-react';

export default function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-brand p-10 text-white sm:p-16 text-left shadow-glow">
        <div aria-hidden className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_30%_20%,white_0,transparent_40%),radial-gradient(circle_at_80%_70%,white_0,transparent_35%)]" />
        <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl text-white leading-tight">
              Hungry? Out of milk?<br /> Need it across town?
            </h3>
            <p className="mt-3 max-w-lg text-white/95 text-sm sm:text-base leading-relaxed">
              Download Swift and get $10 off your first three orders.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/dashboard"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-neutral-900 shadow-soft transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Zap className="h-4 w-4 text-primary" /> Open Swift
            </Link>
            <a
              href="#"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/40 px-6 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              <ShieldCheck className="h-4 w-4" /> For business
            </a>
          </div>
        </div>
        <div className="relative mt-10 grid gap-4 border-t border-white/20 pt-6 text-sm sm:grid-cols-3">
          {[
            [Clock, "Live in 5 minutes"],
            [Wallet, "Transparent fees"],
            [ShieldCheck, "Money-back guarantee"],
          ].map(([Icon, label], index) => {
            const I = Icon;
            return (
              <div key={index} className="flex items-center gap-2 opacity-90 text-white font-medium">
                <I className="h-4 w-4" /> {label}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
