import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Section from './section';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Testimonials() {
  const testimonials = [
    {
      q: "Switched our office lunches to Swift. The dashboard alone saved my ops team six hours a week.",
      a: "Maya Chen",
      r: "Head of People, Northwind",
    },
    {
      q: "The tracking is uncanny. I knew the courier was a block away before my doorbell rang.",
      a: "Daniel Park",
      r: "Product Designer",
    },
    {
      q: "Groceries in 14 minutes. I keep thinking it's magic, but it's just very good logistics.",
      a: "Priya Raman",
      r: "Swift customer",
    },
  ];

  return (
    <Section eyebrow="Loved by 2.4M people" title="Words from the doorstep." tone="muted">
      <div className="grid gap-5 md:grid-cols-3 text-left">
        {testimonials.map((x, i) => (
          <motion.figure
            key={i}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ delay: i * 0.08 }}
            className="rounded-3xl border bg-card p-7 shadow-soft hover:shadow-glow transition-shadow duration-300"
          >
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-brand-2 text-brand-2" />
              ))}
            </div>
            <blockquote className="mt-4 text-base leading-relaxed text-foreground">“{x.q}”</blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-brand font-bold text-white text-sm">
                {x.a[0]}
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{x.a}</p>
                <p className="text-xs text-muted-foreground">{x.r}</p>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}
