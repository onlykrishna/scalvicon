import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Inbox,
    BarChart2,
    Settings,
    LogOut,
    Menu,
    X,
    Home,
    RefreshCw,
} from "lucide-react";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
} from "firebase/firestore";
import { toast } from "sonner";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import type { Lead } from "@/types/lead";
import SummaryCards from "@/components/admin/SummaryCards";
import LeadsTable from "@/components/admin/LeadsTable";
import AnalyticsView from "@/components/admin/AnalyticsView";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/animations";

// ─── Sidebar items ──────────────────────────────────────────────────────────────
type Tab = "leads" | "analytics" | "settings";

const sidebarItems: { id: Tab; label: string; icon: typeof Inbox }[] = [
    { id: "leads", label: "Leads", icon: Inbox },
    { id: "analytics", label: "Analytics", icon: BarChart2 },
    { id: "settings", label: "Settings", icon: Settings },
];

// ─── Settings tab ──────────────────────────────────────────────────────────────
const SettingsPanel = () => {
    const { currentUser } = useAuth();
    return (
        <div className="max-w-lg space-y-6">
            <div className="bg-card border border-border rounded-card p-6 card-shadow space-y-4">
                <h3 className="font-display font-bold text-foreground">Admin Account</h3>
                <div className="space-y-3">
                    <div>
                        <label className="text-xs text-muted-foreground uppercase tracking-wider">Name</label>
                        <p className="text-foreground mt-1">{currentUser?.displayName ?? "—"}</p>
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground uppercase tracking-wider">Email</label>
                        <p className="text-foreground mt-1">{currentUser?.email}</p>
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground uppercase tracking-wider">Role</label>
                        <span className="inline-block mt-1 text-xs font-mono text-primary border border-primary/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Admin
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-card border border-border rounded-card p-6 card-shadow space-y-4">
                <h3 className="font-display font-bold text-foreground">Firestore Rules Reminder</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                    Ensure the Firestore security rules restrict lead reads to the admin
                    email only. Go to{" "}
                    <a
                        href="https://console.firebase.google.com/project/scalvicon/firestore/rules"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                    >
                        Firebase Console → Firestore → Rules
                    </a>
                    .
                </p>
            </div>
        </div>
    );
};

// ─── Main Admin page ───────────────────────────────────────────────────────────
export default function Admin() {
    const [activeTab, setActiveTab] = useState<Tab>("leads");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loadingLeads, setLoadingLeads] = useState(true);
    const { currentUser, signOut } = useAuth();
    const navigate = useNavigate();

    // Real-time Firestore listener
    useEffect(() => {
        const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
        const unsub = onSnapshot(
            q,
            (snap) => {
                const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Lead[];
                setLeads(docs);
                setLoadingLeads(false);
            },
            (err) => {
                console.error("Firestore error:", err);
                toast.error("Failed to load leads. Check Firestore rules.");
                setLoadingLeads(false);
            },
        );
        return () => unsub();
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut();
            toast.success("Signed out.");
            navigate("/");
        } catch {
            /* toasted in context */
        }
    };

    const initials = currentUser?.displayName
        ? currentUser.displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
        : currentUser?.email?.[0].toUpperCase() ?? "A";

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* ── Mobile sidebar overlay ─────────────────────────────────── */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-40 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* ── Sidebar ────────────────────────────────────────────────── */}
            <aside
                className={cn(
                    "fixed md:sticky top-0 left-0 h-screen z-50 w-60 bg-card border-r border-border flex flex-col transition-transform duration-300",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
                )}
            >
                {/* Logo */}
                <div className="flex items-center justify-between h-16 px-5 border-b border-border shrink-0">
                    <span className="font-display font-bold text-lg">
                        Scalvi<span className="text-primary">con</span>{" "}
                        <span className="text-xs font-mono text-muted-foreground">Admin</span>
                    </span>
                    <button className="md:hidden text-muted-foreground" onClick={() => setSidebarOpen(false)}>
                        <X size={18} />
                    </button>
                </div>

                {/* Nav items */}
                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                                activeTab === item.id
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
                            )}
                        >
                            <item.icon size={17} />
                            {item.label}
                            {item.id === "leads" && leads.filter((l) => l.status === "new").length > 0 && (
                                <span className="ml-auto text-[10px] font-mono bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">
                                    {leads.filter((l) => l.status === "new").length}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                {/* Bottom actions */}
                <div className="p-3 border-t border-border space-y-1">
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-foreground/5 hover:text-foreground transition-all"
                    >
                        <Home size={17} /> View Site
                    </Link>
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-foreground/5 hover:text-foreground transition-all"
                    >
                        <LogOut size={17} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* ── Main area ──────────────────────────────────────────────── */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur border-b border-border flex items-center justify-between px-4 md:px-8 shrink-0">
                    <div className="flex items-center gap-3">
                        <button className="md:hidden text-foreground" onClick={() => setSidebarOpen(true)}>
                            <Menu size={22} />
                        </button>
                        <h1 className="font-display font-bold text-foreground capitalize">
                            {activeTab}
                        </h1>
                        {loadingLeads && (
                            <RefreshCw size={14} className="animate-spin text-muted-foreground" />
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground hidden sm:block">
                            {currentUser?.email}
                        </span>
                        {currentUser?.photoURL ? (
                            <img src={currentUser.photoURL} alt="avatar" className="w-8 h-8 rounded-full border border-border" />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                                {initials}
                            </div>
                        )}
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    <motion.div
                        key={activeTab}
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="space-y-6"
                    >
                        {activeTab === "leads" && (
                            <>
                                <SummaryCards leads={leads} />
                                <LeadsTable leads={leads} />
                            </>
                        )}
                        {activeTab === "analytics" && <AnalyticsView leads={leads} />}
                        {activeTab === "settings" && <SettingsPanel />}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
