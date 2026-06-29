export default function Section({
  eyebrow,
  title,
  subtitle,
  children,
  tone = "default",
  id
}) {
  return (
    <section id={id} className={tone === "muted" ? "bg-secondary/40" : ""}>
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-block rounded-full border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground">
            {eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-5xl text-foreground leading-tight">
            {title}
          </h2>
          {subtitle && <p className="mt-4 text-base text-muted-foreground">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
