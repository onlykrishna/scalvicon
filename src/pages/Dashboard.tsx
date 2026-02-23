import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, LayoutDashboard, User, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { fadeUp, fadeUpWithDelay, stagger } from "@/lib/animations";

export default function Dashboard() {
    const { currentUser, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut();
            toast.success("Signed out successfully.");
            navigate("/");
        } catch {
            // error already toasted
        }
    };

    const initials = currentUser?.displayName
        ? currentUser.displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
        : currentUser?.email?.[0].toUpperCase() ?? "U";

    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%20Scalvicon%2C%20I%27d%20like%20to%20discuss%20my%20project`;

    return (
        <div className="min-h-screen bg-background dot-grid-bg relative overflow-hidden">
            {/* Glow orb */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[140px] animate-drift pointer-events-none" />

            {/* Top nav bar */}
            <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-40">
                <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16">
                    <Link to="/" className="font-display text-xl font-bold">
                        Scalvi<span className="text-primary">con</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                            {initials}
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <LogOut size={16} />
                            <span className="hidden sm:inline">Sign Out</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main content */}
            <div className="container mx-auto px-4 md:px-8 py-12 relative z-10">
                <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl mx-auto">
                    {/* Welcome header */}
                    <motion.div variants={fadeUp} className="mb-10">
                        <span className="text-primary font-mono text-xs uppercase tracking-widest">Dashboard</span>
                        <h1 className="font-display font-extrabold text-foreground mt-2" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
                            Welcome back,{" "}
                            <span className="text-gradient-green">
                                {currentUser?.displayName?.split(" ")[0] ?? "there"}
                            </span>
                            ! 👋
                        </h1>
                        <p className="text-muted-foreground mt-2">{currentUser?.email}</p>
                    </motion.div>

                    {/* Profile card */}
                    <motion.div variants={fadeUpWithDelay(0.1)} className="bg-card rounded-card card-shadow border border-border p-6 mb-6">
                        <div className="flex items-center gap-4">
                            {currentUser?.photoURL ? (
                                <img
                                    src={currentUser.photoURL}
                                    alt="Profile"
                                    className="w-16 h-16 rounded-full border-2 border-primary/30"
                                />
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary font-display">
                                    {initials}
                                </div>
                            )}
                            <div>
                                <p className="font-display font-bold text-foreground text-lg">
                                    {currentUser?.displayName ?? "Account"}
                                </p>
                                <p className="text-muted-foreground text-sm">{currentUser?.email}</p>
                                <span className="inline-block mt-1 text-xs font-mono text-primary uppercase tracking-wider border border-primary/30 px-2 py-0.5 rounded-full">
                                    Client
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Action cards */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <motion.div variants={fadeUpWithDelay(0.2)} className="bg-card rounded-card card-shadow border border-border p-6 space-y-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <LayoutDashboard size={20} className="text-primary" />
                            </div>
                            <h3 className="font-display font-bold text-foreground">Your Projects</h3>
                            <p className="text-muted-foreground text-sm">
                                Your website projects will appear here once we start working together.
                            </p>
                            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Coming Soon</span>
                        </motion.div>

                        <motion.div variants={fadeUpWithDelay(0.3)} className="bg-card rounded-card card-shadow border border-border p-6 space-y-3">
                            <div className="w-10 h-10 rounded-full bg-accent-blue/10 flex items-center justify-center">
                                <User size={20} className="text-accent-blue" />
                            </div>
                            <h3 className="font-display font-bold text-foreground">Book a Free Call</h3>
                            <p className="text-muted-foreground text-sm">
                                Ready to start? Chat with us directly on WhatsApp.
                            </p>
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline"
                            >
                                Open WhatsApp <ExternalLink size={14} />
                            </a>
                        </motion.div>
                    </div>

                    {/* Sign out */}
                    <motion.div variants={fadeUpWithDelay(0.4)} className="mt-8 text-center">
                        <button
                            onClick={handleSignOut}
                            className="inline-flex items-center gap-2 border border-foreground/10 text-foreground/70 hover:text-foreground hover:bg-foreground/5 px-6 py-2.5 rounded-button transition-all text-sm"
                        >
                            <LogOut size={16} /> Sign Out
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
