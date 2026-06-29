export default function Stats() {
  const stats = [
    { v: "2.4M+", l: "Orders delivered" },
    { v: "120", l: "Cities live" },
    { v: "28 min", l: "Median delivery" },
    { v: "4.9", l: "Avg. rider rating" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
      <div className="relative overflow-hidden rounded-[32px] border bg-foreground p-10 text-background">
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gradient-brand opacity-40 blur-3xl" />
        <div className="grid gap-10 md:grid-cols-4 text-left">
          {stats.map((stat) => (
            <div key={stat.l}>
              <p className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl text-background">
                {stat.v}
              </p>
              <p className="mt-2 text-sm opacity-70 text-background">{stat.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
