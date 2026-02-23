const items = [
  { label: "🍽️ Restaurants" },
  { label: "🏥 Clinics" },
  { label: "💇 Salons" },
  { label: "🏠 Real Estate" },
  { label: "🛒 Retail Stores" },
  { label: "🎓 Education" },
  { label: "🧘 Wellness" },
  { label: "⚖️ Legal Firms" },
];

const MarqueeTicker = () => (
  <section className="border-y border-border py-5 overflow-hidden bg-card/50">
    <div className="flex animate-ticker whitespace-nowrap">
      {[...items, ...items].map((item, i) => (
        <span
          key={`${item.label}-${i}`}
          className="mx-8 text-muted-foreground text-sm font-mono uppercase tracking-wider flex items-center gap-2"
        >
          {item.label}
          <span className="text-primary/40">•</span>
        </span>
      ))}
    </div>
  </section>
);

export default MarqueeTicker;
