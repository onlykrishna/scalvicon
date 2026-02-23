import { motion } from "framer-motion";
import { Star, TrendingUp, Calendar, Home, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { fadeUp, fadeUpWithDelay, stagger } from "@/lib/animations";
import { testimonials } from "@/data/testimonials";

const metricIconMap: Record<string, LucideIcon> = {
  TrendingUp,
  Calendar,
  Home,
  UtensilsCrossed,
};

const siteStats = [
  { value: "50+", label: "Websites Delivered" },
  { value: "4.9★", label: "Average Rating" },
  { value: "₹0", label: "Hidden Fees" },
  { value: "100%", label: "On-Time Delivery" },
];

const Testimonials = () => (
  <section id="testimonials" className="section-padding relative">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
    <div className="container mx-auto px-4 md:px-8 relative z-10">
      {/* Heading */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="text-center mb-12"
      >
        <span className="text-primary font-mono text-xs uppercase tracking-widest">
          Client Stories
        </span>
        <h2
          className="font-display font-extrabold text-foreground mt-3"
          style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
        >
          Businesses That Grew With Us
        </h2>
        <p className="text-muted-foreground mt-3 max-w-md mx-auto">
          Real results for real Indian businesses. No paid reviews, no stock photos.
        </p>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14"
      >
        {siteStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={fadeUpWithDelay(i * 0.08)}
            className="bg-card rounded-card border border-border p-5 text-center card-shadow"
          >
            <p className="font-display font-extrabold text-2xl text-primary">
              {stat.value}
            </p>
            <p className="text-muted-foreground text-xs mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Testimonial cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((t, i) => {
          const MetricIcon = metricIconMap[t.metricIcon] ?? TrendingUp;
          return (
            <motion.div
              key={t.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUpWithDelay(i * 0.1)}
              className="bg-card rounded-card border border-border p-6 card-shadow flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} size={14} className="fill-gold text-gold" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground/80 text-sm leading-relaxed flex-1">
                "{t.text}"
              </p>

              {/* Metric badge */}
              <span
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium px-3 py-1.5 rounded-full w-fit"
                style={{
                  background: "rgba(0, 229, 160, 0.08)",
                  border: "1px solid rgba(0, 229, 160, 0.2)",
                  color: "hsl(162, 100%, 45%)",
                }}
              >
                <MetricIcon size={12} />
                {t.metric}
              </span>

              {/* Author */}
              <div className="flex items-center gap-3 pt-1 border-t border-border">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-xs font-bold text-white font-display shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-foreground font-semibold text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {t.role}, {t.business} · {t.location}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Testimonials;
