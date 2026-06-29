import { motion } from 'framer-motion';
import { MapPin, Sparkles, Bike, CheckCircle2 } from 'lucide-react';
import Section from './section';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HowItWorks() {
  const steps = [
    { icon: MapPin, title: "Set address", desc: "We auto-detect for instant ETAs and surcharges." },
    { icon: Sparkles, title: "Pick anything", desc: "From a single coffee to a full week of groceries." },
    { icon: Bike, title: "Track live", desc: "Watch your rider on the map, every step of the way." },
    { icon: CheckCircle2, title: "Enjoy", desc: "Contactless drop-off and rate in one tap." },
  ];

  return (
    <Section
      id="how-it-works"
      eyebrow="How it works"
      title="Four taps. That's it."
      subtitle="No clutter, no upsells — just the fastest path from craving to doorstep."
      tone="muted"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 text-left">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ delay: index * 0.08 }}
            className="relative rounded-3xl border bg-card p-6 shadow-soft hover:shadow-glow transition-shadow duration-300"
          >
            <span className="font-display text-5xl font-extrabold text-gradient-brand">
              0{index + 1}
            </span>
            <div className="mt-6 flex items-center gap-3">
              <step.icon className="h-5 w-5 text-primary" />
              <h4 className="text-lg font-bold text-foreground">{step.title}</h4>
            </div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
