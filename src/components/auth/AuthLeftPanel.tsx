import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AuthLeftPanelProps {
    headline: string;
    subtext: string;
}

const stats = [
    { value: "50+", label: "Clients" },
    { value: "90+", label: "PageSpeed" },
    { value: "4 Week", label: "Delivery" },
];

const avatars = [
    { initial: "R", bg: "bg-primary/30" },
    { initial: "S", bg: "bg-accent-blue/30" },
    { initial: "A", bg: "bg-gold/30" },
];

export function AuthLeftPanel({ headline, subtext }: AuthLeftPanelProps) {
    return (
        <div
            className="hidden lg:flex flex-col items-center justify-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, hsl(220 20% 6%), hsl(220 15% 10%))" }}
        >
            {/* Animated glow orbs */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/[0.06] blur-[120px] animate-drift pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-accent-blue/[0.05] blur-[100px] animate-drift pointer-events-none" style={{ animationDelay: "-4s" }} />

            {/* Glassmorphism card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 max-w-sm w-full mx-8 p-8 rounded-2xl"
                style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                }}
            >
                {/* Logo mark */}
                <div className="mb-8">
                    <span className="font-display text-lg font-bold text-white">
                        Scalvi<span style={{ color: "hsl(162 100% 45%)" }}>con</span>
                    </span>
                </div>

                {/* Headline */}
                <h2 className="font-display font-extrabold text-white text-3xl leading-tight mb-3">
                    {headline}
                </h2>
                <p className="text-white/50 text-sm leading-relaxed mb-8">{subtext}</p>

                {/* Stat pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {stats.map((s) => (
                        <span
                            key={s.label}
                            className="text-xs font-medium px-3.5 py-1.5 rounded-full font-mono"
                            style={{
                                background: "rgba(0, 229, 160, 0.08)",
                                border: "1px solid rgba(0, 229, 160, 0.2)",
                                color: "hsl(162, 100%, 45%)",
                            }}
                        >
                            {s.value} {s.label}
                        </span>
                    ))}
                </div>

                {/* Avatar stack */}
                <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                        {avatars.map(({ initial, bg }) => (
                            <div
                                key={initial}
                                className={`w-8 h-8 rounded-full ${bg} border border-white/10 flex items-center justify-center text-xs font-bold text-white font-display`}
                            >
                                {initial}
                            </div>
                        ))}
                    </div>
                    <span className="text-white/40 text-xs">50+ businesses trust us</span>
                </div>
            </motion.div>
        </div>
    );
}
