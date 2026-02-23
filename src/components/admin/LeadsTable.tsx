import { useState, useMemo } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { MessageCircle, Phone, CheckCircle2, Search, Filter } from "lucide-react";
import { format, isToday, isThisWeek, isThisMonth } from "date-fns";
import type { Lead, LeadStatus } from "@/types/lead";
import { cn } from "@/lib/utils";
import { BUSINESS_TYPES } from "@/lib/validations/contact";

// ─── Status badge ──────────────────────────────────────────────────────────────
const statusConfig: Record<LeadStatus, { label: string; classes: string }> = {
    new: { label: "New", classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
    contacted: { label: "Contacted", classes: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
    converted: { label: "Converted", classes: "bg-purple-500/15 text-purple-400 border-purple-500/30" },
    closed: { label: "Closed", classes: "bg-gray-500/15 text-gray-400 border-gray-500/30" },
};

const StatusBadge = ({ status }: { status: LeadStatus }) => {
    const cfg = statusConfig[status] ?? statusConfig.new;
    return (
        <span className={cn("text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full border", cfg.classes)}>
            {cfg.label}
        </span>
    );
};

// ─── Update helper ─────────────────────────────────────────────────────────────
async function updateStatus(id: string, status: LeadStatus) {
    try {
        await updateDoc(doc(db, "leads", id), { status });
        toast.success(`Lead marked as ${status}`);
    } catch {
        toast.error("Failed to update lead status");
    }
}

// ─── Date-range label → filter fn ─────────────────────────────────────────────
type DateRange = "all" | "today" | "week" | "month";

function passesDateFilter(lead: Lead, range: DateRange): boolean {
    if (range === "all" || !lead.createdAt) return true;
    const d = lead.createdAt.toDate();
    if (range === "today") return isToday(d);
    if (range === "week") return isThisWeek(d);
    return isThisMonth(d);
}

// ─── Main component ────────────────────────────────────────────────────────────
interface Props {
    leads: Lead[];
}

const LeadsTable = ({ leads }: Props) => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [dateRange, setDateRange] = useState<DateRange>("all");

    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER as string;

    const filtered = useMemo(() => {
        return leads.filter((l) => {
            const q = search.toLowerCase();
            const matchSearch =
                !q || l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q);
            const matchStatus = statusFilter === "all" || l.status === statusFilter;
            const matchType = typeFilter === "all" || l.businessType === typeFilter;
            const matchDate = passesDateFilter(l, dateRange);
            return matchSearch && matchStatus && matchType && matchDate;
        });
    }, [leads, search, statusFilter, typeFilter, dateRange]);

    const selectClass =
        "bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40";

    const makeWAUrl = (lead: Lead) => {
        const msg = encodeURIComponent(
            `Hi ${lead.name}! This is Scalvicon team. We received your inquiry for ${lead.businessType} website. Are you available for a quick call?`,
        );
        return `https://wa.me/${lead.phone}?text=${msg}`;
    };

    return (
        <div className="space-y-5">
            {/* ── Filters ─────────────────────────────────────────────────── */}
            <div className="flex flex-wrap gap-3 items-center">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search name or email…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={cn(selectClass, "pl-8 w-full")}
                    />
                </div>

                {/* Status */}
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as LeadStatus | "all")} className={selectClass}>
                    <option value="all">All Statuses</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted</option>
                    <option value="closed">Closed</option>
                </select>

                {/* Business Type */}
                <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className={selectClass}>
                    <option value="all">All Types</option>
                    {BUSINESS_TYPES.map((bt) => (
                        <option key={bt} value={bt}>{bt}</option>
                    ))}
                </select>

                {/* Date range */}
                <select value={dateRange} onChange={(e) => setDateRange(e.target.value as DateRange)} className={selectClass}>
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                </select>

                <span className="text-xs text-muted-foreground ml-auto">
                    <Filter size={12} className="inline mr-1" />
                    {filtered.length} of {leads.length} leads
                </span>
            </div>

            {/* ── Table ───────────────────────────────────────────────────── */}
            <div className="overflow-x-auto rounded-card border border-border bg-card">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border bg-background/40">
                            {["Name / Business", "Type", "Phone", "Email", "Budget", "Date", "Status", "Actions"].map((h) => (
                                <th key={h} className="text-left px-4 py-3 text-xs font-mono text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center py-16 text-muted-foreground">
                                    No leads found matching your filters.
                                </td>
                            </tr>
                        ) : (
                            filtered.map((lead) => (
                                <tr key={lead.id} className="border-b border-border/50 hover:bg-foreground/[0.02] transition-colors">
                                    {/* Name + Business */}
                                    <td className="px-4 py-3">
                                        <p className="font-medium text-foreground">{lead.name}</p>
                                        <p className="text-xs text-muted-foreground">{lead.businessName}</p>
                                    </td>
                                    {/* Business Type */}
                                    <td className="px-4 py-3">
                                        <span className="text-xs text-muted-foreground whitespace-nowrap">{lead.businessType}</span>
                                    </td>
                                    {/* Phone */}
                                    <td className="px-4 py-3">
                                        <a href={`tel:+91${lead.phone}`} className="text-primary hover:underline text-xs font-mono">
                                            {lead.phone}
                                        </a>
                                    </td>
                                    {/* Email */}
                                    <td className="px-4 py-3">
                                        <a href={`mailto:${lead.email}`} className="text-xs hover:underline text-muted-foreground">
                                            {lead.email}
                                        </a>
                                    </td>
                                    {/* Budget */}
                                    <td className="px-4 py-3">
                                        <span className="text-xs text-muted-foreground whitespace-nowrap">{lead.budget}</span>
                                    </td>
                                    {/* Date */}
                                    <td className="px-4 py-3">
                                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                                            {lead.createdAt ? format(lead.createdAt.toDate(), "dd MMM, HH:mm") : "—"}
                                        </span>
                                    </td>
                                    {/* Status */}
                                    <td className="px-4 py-3">
                                        <StatusBadge status={lead.status} />
                                    </td>
                                    {/* Actions */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2 whitespace-nowrap">
                                            {/* WhatsApp */}
                                            <a
                                                href={makeWAUrl(lead)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="WhatsApp"
                                                className="p-1.5 rounded-lg bg-[#25d366]/15 hover:bg-[#25d366]/30 text-[#25d366] transition-colors"
                                            >
                                                <MessageCircle size={14} />
                                            </a>
                                            {/* Mark Contacted */}
                                            {lead.status === "new" && (
                                                <button
                                                    onClick={() => updateStatus(lead.id, "contacted")}
                                                    title="Mark Contacted"
                                                    className="p-1.5 rounded-lg bg-blue-500/15 hover:bg-blue-500/30 text-blue-400 transition-colors"
                                                >
                                                    <Phone size={14} />
                                                </button>
                                            )}
                                            {/* Convert */}
                                            {(lead.status === "new" || lead.status === "contacted") && (
                                                <button
                                                    onClick={() => updateStatus(lead.id, "converted")}
                                                    title="Mark Converted"
                                                    className="p-1.5 rounded-lg bg-purple-500/15 hover:bg-purple-500/30 text-purple-400 transition-colors"
                                                >
                                                    <CheckCircle2 size={14} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeadsTable;
