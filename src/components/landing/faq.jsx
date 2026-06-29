import Section from './section';

export default function FAQ() {
  const faqs = [
    ["How fast is Swift?", "Median delivery is 28 minutes; groceries via Express land in 15."],
    ["What cities are live?", "120 cities across North America and Europe — and counting."],
    ["Is there a subscription?", "Only Swift+ ($9/mo) — and you can pay-as-you-go forever."],
    ["Are riders fairly paid?", "Yes. Every order includes a transparent rider tip and base."],
  ];

  return (
    <Section id="faq" eyebrow="FAQ" title="The short answers." tone="muted">
      <div className="mx-auto grid max-w-3xl gap-3 text-left">
        {faqs.map(([question, answer], index) => (
          <details
            key={index}
            className="group rounded-2xl border bg-card p-5 open:shadow-soft transition-all duration-300"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between text-base font-bold text-foreground focus:outline-none select-none">
              <span>{question}</span>
              <span className="ml-4 grid h-7 w-7 place-items-center rounded-full bg-secondary text-foreground/80 font-bold transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
