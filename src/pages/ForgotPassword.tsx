import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/lib/validations/auth";
import { AuthLeftPanel } from "@/components/auth/AuthLeftPanel";
import { AuthInput } from "@/components/auth/AuthInput";
import { cn } from "@/lib/utils";

export default function ForgotPassword() {
    const { resetPassword } = useAuth();
    const [sent, setSent] = useState(false);
    const [sentEmail, setSentEmail] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordFormData>({ resolver: zodResolver(forgotPasswordSchema) });

    const onSubmit = async (data: ForgotPasswordFormData) => {
        try {
            await resetPassword(data.email);
            setSentEmail(data.email);
            setSent(true);
        } catch {
            // error already toasted in AuthContext
        }
    };

    return (
        <div className="h-screen grid lg:grid-cols-2 overflow-hidden">
            {/* LEFT — Decorative panel */}
            <AuthLeftPanel
                headline="Grow Your Business Online"
                subtext="Join 50+ Indian SMEs who trust Scalvicon to build websites that actually convert."
            />

            {/* RIGHT — Form */}
            <div
                className="flex flex-col items-center justify-center px-6 py-12 overflow-y-auto"
                style={{ background: "hsl(220 20% 4%)" }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-[420px]"
                >
                    {/* Logo */}
                    <Link to="/" className="inline-block mb-8">
                        <span className="font-display text-2xl font-bold text-white">
                            Scalvi<span style={{ color: "hsl(162 100% 45%)" }}>con</span>
                        </span>
                    </Link>

                    <AnimatePresence mode="wait">
                        {sent ? (
                            /* Success state */
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.35 }}
                                className="text-center"
                            >
                                <div className="flex justify-center mb-5">
                                    <div
                                        className="w-16 h-16 rounded-full flex items-center justify-center"
                                        style={{ background: "rgba(0, 229, 160, 0.1)" }}
                                    >
                                        <CheckCircle size={32} style={{ color: "hsl(162 100% 45%)" }} />
                                    </div>
                                </div>
                                <h2 className="font-display font-bold text-white text-2xl mb-2">
                                    Check your inbox!
                                </h2>
                                <p className="text-white/40 text-sm leading-relaxed mb-6">
                                    We've sent a password reset link to{" "}
                                    <span className="text-white/70 font-medium">{sentEmail}</span>.
                                    Click the link in the email to set a new password.
                                </p>
                                <button
                                    onClick={() => setSent(false)}
                                    className="text-sm underline mb-4"
                                    style={{ color: "hsl(162 100% 45%)" }}
                                >
                                    Try a different email
                                </button>
                            </motion.div>
                        ) : (
                            /* Form */
                            <motion.div
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <div className="mb-8">
                                    <h1 className="font-display font-extrabold text-white text-3xl mb-1.5">
                                        Reset your password
                                    </h1>
                                    <p className="text-white/40 text-sm">
                                        Enter your email and we'll send you a reset link.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                    <AuthInput<ForgotPasswordFormData>
                                        label="Email address"
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        icon={Mail}
                                        register={register}
                                        error={errors.email?.message}
                                    />

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={cn(
                                            "w-full flex items-center justify-center gap-2 py-3.5 rounded-lg",
                                            "font-semibold text-sm transition-all duration-200",
                                            "text-[hsl(210_67%_2%)]",
                                            isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:brightness-110",
                                        )}
                                        style={{
                                            background: "hsl(162 100% 45%)",
                                            boxShadow: "0 0 28px hsla(162, 100%, 45%, 0.30)",
                                        }}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <motion.span
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="w-4 h-4 rounded-full border-2 border-current border-t-transparent"
                                                />
                                                Sending...
                                            </>
                                        ) : (
                                            <>Send reset link <ArrowRight size={16} /></>
                                        )}
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Back to login */}
                    <p className="text-center text-sm text-white/30 mt-8">
                        Remember your password?{" "}
                        <Link
                            to="/login"
                            className="font-medium hover:underline"
                            style={{ color: "hsl(162 100% 45%)" }}
                        >
                            Back to login
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
