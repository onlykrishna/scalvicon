import { useMemo } from "react";
import { Users, Inbox, Phone, TrendingUp } from "lucide-react";
import type { Lead } from "@/types/lead";
import { isToday } from "date-fns";

interface Props {
    leads: Lead[];
}

const SummaryCards = ({ leads }: Props) => {
    const stats = useMemo(() => {
        const total = leads.length;
        const newToday = leads.filter((l) => {
            if (!l.createdAt) return false;
            return isToday(l.createdAt.toDate());
        }).length;
        const contacted = leads.filter((l) => l.status === "contacted").length;
        const converted = leads.filter((l) => l.status === "converted").length;
        const rate = total > 0 ? Math.round((converted / total) * 100) : 0;
        return { total, newToday, contacted, converted, rate };
    }, [leads]);

    const cards = [
        {
            label: "Total Leads",
            value: stats.total,
            icon: Users,
            color: "text-primary",
            bg: "bg-primary/10",
        },
        {
            label: "New Today",
            value: stats.newToday,
            icon: Inbox,
            color: "text-accent-blue",
            bg: "bg-accent-blue/10",
        },
        {
            label: "Contacted",
            value: stats.contacted,
            icon: Phone,
            color: "text-gold",
            bg: "bg-gold/10",
        },
        {
            label: "Converted",
            value: stats.converted,
            icon: TrendingUp,
            color: "text-emerald-400",
            bg: "bg-emerald-400/10",
        },
        {
            label: "Conversion Rate",
            value: `${stats.rate}%`,
            icon: TrendingUp,
            color: "text-purple-400",
            bg: "bg-purple-400/10",
        },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {cards.map((c) => (
                <div
                    key={c.label}
                    className="bg-card border border-border rounded-card p-4 card-shadow"
                >
                    <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center mb-3`}>
                        <c.icon size={18} className={c.color} />
                    </div>
                    <p className={`font-display font-extrabold text-2xl ${c.color}`}>{c.value}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{c.label}</p>
                </div>
            ))}
        </div>
    );
};

export default SummaryCards;
