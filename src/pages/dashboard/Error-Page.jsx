import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Package, MapPin, LayoutDashboard, Headphones } from "lucide-react";

export default function ErrorPage({
  code = "404",
  title = "Lost in transit",
  description = "This page has gone off the grid — just like a parcel with no tracking number. Let's get you back on route.",
}) {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">

      {/* Ambient orbs — use your brand tokens as inline colours */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 -top-20 h-80 w-80 rounded-full"
        style={{
          background: "oklch(0.71 0.19 38)",
          filter: "blur(80px)",
          opacity: 0.18,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-10 h-64 w-64 rounded-full"
        style={{
          background: "oklch(0.64 0.23 5)",
          filter: "blur(72px)",
          opacity: 0.16,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[55%] top-[40%] h-48 w-48 rounded-full"
        style={{
          background: "oklch(0.55 0.22 285)",
          filter: "blur(60px)",
          opacity: 0.14,
        }}
      />

      {/* Badge */}
      <span className="relative mb-7 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
        Page not found
      </span>

      {/* Error code */}
      <p
        className="relative font-display text-gradient-brand select-none"
        style={{ fontSize: "clamp(96px, 18vw, 140px)", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.04em" }}
        aria-label={`Error ${code}`}
      >
        {code}
      </p>

      {/* Title & description */}
      <h1 className="relative mt-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h1>
      <p className="relative mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
        {description}
      </p>

      {/* Primary actions */}
      <div className="relative mt-9 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => navigate("/")}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-brand px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90 active:scale-[0.98]"
        >
          <Home size={15} />
          Go home
        </button>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-transparent px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-secondary active:scale-[0.98]"
        >
          <ArrowLeft size={15} />
          Go back
        </button>
      </div>

      {/* Divider */}
      <div className="relative mt-10 flex w-full max-w-sm items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or jump to</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {/* Quick-link chips */}
      <div className="relative mt-5 flex flex-wrap justify-center gap-2">
        {[
          { icon: Package,         label: "Track a parcel",  to: "#tracking"   },
          { icon: MapPin,          label: "Coverage areas",  to: "#coverage"   },
          { icon: LayoutDashboard, label: "Dashboard",       to: "/dashboard"  },
          { icon: Headphones,      label: "Support",         to: "#support"    },
        ].map(({ icon: Icon, label, to }) => (
          <button
            key={to}
            onClick={() => navigate(to)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-medium text-muted-foreground transition hover:border-brand/40 hover:bg-brand/5 hover:text-brand"
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}