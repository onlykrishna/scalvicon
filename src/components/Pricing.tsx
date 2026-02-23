import { motion } from "framer-motion";
import { Check, Wrench } from "lucide-react";
import { fadeUp, fadeUpWithDelay } from "@/lib/animations";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const plans = [
    {
        name: "Starter",
        price: "₹14,999",
        period: "one-time",
        color: "border-t-accent-blue",
        accent: "text-accent-blue",
        popular: false,
        features: [
            "Up to 5 pages (Home, About, Services, Contact, Gallery)",
            "Mobile-responsive design",
            "Basic on-page SEO",
            "WhatsApp chat button",
            "Google Maps integration",
            "Contact form",
            "30 days post-launch support",
            "Delivery: 3 weeks",
        ],
        notIncluded: ["Custom animations", "Blog", "Booking system"],
    },
    {
        name: "Business",
        price: "₹24,999",
        period: "one-time",
        color: "border-t-primary",
        accent: "text-primary",
        popular: true,
        features: [
            "Up to 10 pages",
            "Premium custom design",
            "Full on-page SEO + Google Search Console",
            "WhatsApp + Instagram integration",
            "Online inquiry / booking form",
            "Portfolio / case study section",
            "Blog setup (up to 5 posts)",
            "Speed optimization (90+ PageSpeed)",
            "30 days post-launch support",
            "Delivery: 4 weeks",
        ],
        notIncluded: [],
    },
    {
        name: "Premium",
        price: "₹34,999",
        period: "one-time",
        color: "border-t-gold",
        accent: "text-gold",
        popular: false,
        features: [
            "Unlimited pages",
            "Bespoke design with custom animations",
            "Complete SEO package + 3-month strategy",
            "E-commerce ready (Razorpay / UPI)",
            "Admin dashboard for content management",
            "Priority WhatsApp support (7 days)",
            "Analytics dashboard (GA4 setup)",
            "60 days post-launch support",
            "Delivery: 4–5 weeks",
        ],
        notIncluded: [],
    },
];

const Pricing = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

    const handleGetStarted = () => {
        if (currentUser) {
            window.open(
                `https://wa.me/${whatsappNumber}?text=Hi%20Scalvicon%2C%20I%27d%20like%20to%20book%20a%20free%20call`,
                "_blank",
                "noopener,noreferrer",
            );
        } else {
            navigate("/signup");
        }
    };

    return (
        <section id="pricing" className="section-padding dot-grid-bg relative">
            <div className="container mx-auto px-4 md:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    className="text-center mb-16"
                >
                    <span className="text-primary font-mono text-xs uppercase tracking-widest">
                        Packages
                    </span>
                    <h2
                        className="font-display font-extrabold text-foreground mt-3"
                        style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
                    >
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-muted-foreground mt-3 max-w-md mx-auto">
                        No hidden costs. No surprises. Choose what works for your business.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-80px" }}
                            variants={fadeUpWithDelay(i * 0.1)}
                            whileHover={{ y: -6 }}
                            className={`relative bg-card rounded-card card-shadow border border-border border-t-[3px] ${plan.color} p-8 ${plan.popular ? "md:scale-105 md:z-10" : ""}`}
                        >
                            {plan.popular && (
                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                                    Most Popular
                                </span>
                            )}
                            <p className={`text-xs uppercase tracking-widest font-mono ${plan.accent}`}>
                                {plan.name}
                            </p>
                            <p className="font-display font-extrabold text-foreground text-4xl mt-3">
                                {plan.price}
                            </p>
                            <p className="text-muted-foreground text-sm mt-1">{plan.period}</p>
                            <div className="h-px bg-border my-6" />
                            <ul className="space-y-2.5">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                                        <Check size={15} className={`mt-0.5 shrink-0 ${plan.accent}`} />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={handleGetStarted}
                                className={`w-full mt-8 py-3 rounded-button font-semibold text-sm transition-all ${plan.popular
                                        ? "bg-primary text-primary-foreground glow-green hover:brightness-110"
                                        : "border border-foreground/10 text-foreground hover:bg-foreground/5"
                                    }`}
                            >
                                Get Started
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Maintenance add-on */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUpWithDelay(0.35)}
                    className="mt-10 max-w-2xl mx-auto bg-card border border-border rounded-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4 card-shadow"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Wrench size={20} className="text-primary" />
                        </div>
                        <div>
                            <p className="font-display font-bold text-foreground">
                                Maintenance Add-on — <span className="text-primary">₹2,999/month</span>
                            </p>
                            <p className="text-muted-foreground text-sm mt-0.5">
                                Hosting, backups, security updates &amp; 2 content changes/month included.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleGetStarted}
                        className="shrink-0 border border-primary/30 text-primary px-5 py-2 rounded-button text-sm hover:bg-primary/10 transition-all"
                    >
                        Add to plan
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Pricing;
