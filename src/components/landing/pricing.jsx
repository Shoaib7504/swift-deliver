import { CheckCircle2, ArrowRight } from 'lucide-react';
import Section from './section';
import { toast } from 'sonner';

export default function Pricing() {
  const tiers = [
    {
      name: "Starter",
      price: "$0",
      cadence: "/mo",
      desc: "Pay-as-you-go for occasional orders.",
      features: ["Standard delivery", "Live tracking", "Email support"],
      cta: "Get started",
      featured: false,
    },
    {
      name: "Swift+",
      price: "$9",
      cadence: "/mo",
      desc: "Free delivery & priority routing.",
      features: ["Free delivery on $15+", "Priority dispatch", "Member-only deals", "24/7 chat"],
      cta: "Start free trial",
      featured: true,
    },
    {
      name: "Business",
      price: "Custom",
      cadence: "",
      desc: "For offices and growing teams.",
      features: ["Team billing", "Spend controls", "Dedicated CSM", "API access"],
      cta: "Contact sales",
      featured: false,
    },
  ];

  const handlePricingAction = (tierName) => {
    toast.success(`Redirecting to payment setup for ${tierName}...`);
  };

  return (
    <Section id="pricing" eyebrow="Simple pricing" title="Pay for delivery, never for the app.">
      <div className="grid gap-5 md:grid-cols-3 text-left">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative rounded-3xl border p-7 transition-transform hover:-translate-y-1 ${
              tier.featured
                ? "bg-foreground text-background shadow-glow"
                : "bg-card shadow-soft"
            }`}
          >
            {tier.featured && (
              <span className="absolute -top-3 left-7 rounded-full bg-gradient-brand px-3 py-1 text-xs font-bold text-white shadow-glow">
                Most popular
              </span>
            )}
            <h4 className={`text-lg font-bold ${tier.featured ? 'text-background' : 'text-foreground'}`}>{tier.name}</h4>
            <div className="mt-4 flex items-baseline gap-1">
              <span className={`font-display text-5xl font-extrabold tracking-tight ${tier.featured ? 'text-background' : 'text-foreground'}`}>
                {tier.price}
              </span>
              <span className={`text-sm ${tier.featured ? "text-background/80" : "text-muted-foreground"}`}>
                {tier.cadence}
              </span>
            </div>
            <p className={`mt-2 text-sm ${tier.featured ? "text-background/80" : "text-muted-foreground"} leading-relaxed`}>
              {tier.desc}
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {tier.features.map((feature) => (
                <li key={feature} className={`flex items-center gap-2 ${tier.featured ? 'text-background/90' : 'text-foreground/90'}`}>
                  <CheckCircle2
                    className={`h-4 w-4 shrink-0 ${
                      tier.featured ? "text-brand-2" : "text-success"
                    }`}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handlePricingAction(tier.name)}
              className={`mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold transition-transform hover:scale-[1.01] cursor-pointer ${
                tier.featured
                  ? "bg-gradient-brand text-white shadow-glow"
                  : "border bg-secondary text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
            >
              {tier.cta} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </Section>
  );
}
