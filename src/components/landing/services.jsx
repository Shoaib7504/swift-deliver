import { motion } from 'framer-motion';
import { UtensilsCrossed, ShoppingBasket, Package, Timer, ArrowUpRight } from 'lucide-react';
import Section from './section';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Services() {
  const services = [
    {
      icon: UtensilsCrossed,
      title: "Food",
      desc: "8,000+ restaurants — from 24-hour ramen to wood-fired pizza.",
      tag: "30 min avg",
      gradient: "from-brand to-brand-3",
    },
    {
      icon: ShoppingBasket,
      title: "Groceries",
      desc: "Fresh produce, pantry staples, and household essentials.",
      tag: "15 min express",
      gradient: "from-brand-2 to-brand",
    },
    {
      icon: Package,
      title: "Parcels",
      desc: "Same-city courier with live tracking and proof of delivery.",
      tag: "Door to door",
      gradient: "from-brand-4 to-brand-3",
    },
  ];

  return (
    <Section
      id="services"
      eyebrow="One app, three superpowers"
      title={
        <>
          Everything you need, <span className="text-gradient-brand">delivered.</span>
        </>
      }
      subtitle="Swap between food, groceries and parcels without leaving Swift."
    >
      <div className="grid gap-5 md:grid-cols-3 text-left">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ delay: index * 0.08 }}
            className="group relative overflow-hidden rounded-3xl border bg-card p-7 shadow-soft transition-transform duration-300 hover:-translate-y-1"
          >
            <div
              className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${service.gradient} text-white shadow-glow`}
            >
              <service.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-foreground">{service.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
            <div className="mt-6 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground">
                <Timer className="h-3.5 w-3.5" /> {service.tag}
              </span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground/80 transition-transform group-hover:translate-x-1">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
