import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { AuthLeftPanel } from "@/components/auth/AuthLeftPanel";
import { AuthInput } from "@/components/auth/AuthInput";
import { SocialButton } from "@/components/auth/SocialButton";
import { cn } from "@/lib/utils";

export default function Login() {
    const { currentUser, signInWithEmail, signInWithGoogle, loading } = useAuth();
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

    // Redirect if already logged in
    if (!loading && currentUser) return <Navigate to="/dashboard" replace />;

    const onSubmit = async (data: LoginFormData) => {
        try {
            await signInWithEmail(data.email, data.password);
            toast.success("Welcome back!");
            navigate("/dashboard");
        } catch {
            // error already toasted in AuthContext
        }
    };

    const handleGoogle = async () => {
        setGoogleLoading(true);
        try {
            await signInWithGoogle();
            toast.success("Signed in with Google!");
            navigate("/dashboard");
        } catch {
            // error already toasted
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <div className="h-screen grid lg:grid-cols-2 overflow-hidden">
            {/* LEFT — Decorative panel */}
            <AuthLeftPanel
                headline="Grow Your Business Online"
                subtext="Join 50+ Indian SMEs who trust Scalvicon to build websites that actually convert."
            />

            {/* RIGHT — Login form */}
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

                    {/* Heading */}
                    <div className="mb-8">
                        <h1 className="font-display font-extrabold text-white text-3xl mb-1.5">
                            Welcome back
                        </h1>
                        <p className="text-white/40 text-sm">
                            Don't have an account?{" "}
                            <Link to="/signup" className="font-medium" style={{ color: "hsl(162 100% 45%)" }}>
                                Sign up for free
                            </Link>
                        </p>
                    </div>

                    {/* Google */}
                    <div className="mb-6">
                        <SocialButton provider="google" onClick={handleGoogle} loading={googleLoading} />
                    </div>

                    {/* Divider */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/8" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-3 text-xs text-white/30" style={{ background: "hsl(220 20% 4%)" }}>
                                Or continue with email
                            </span>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <AuthInput<LoginFormData>
                            label="Email address"
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            icon={Mail}
                            register={register}
                            error={errors.email?.message}
                        />

                        <AuthInput<LoginFormData>
                            label="Password"
                            id="password"
                            type={showPass ? "text" : "password"}
                            placeholder="Enter your password"
                            icon={Lock}
                            register={register}
                            error={errors.password?.message}
                            rightElement={
                                <div className="flex items-center gap-3">
                                    <Link
                                        to="/forgot-password"
                                        className="text-xs hover:underline"
                                        style={{ color: "hsl(162 100% 45%)" }}
                                    >
                                        Forgot password?
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => setShowPass((p) => !p)}
                                        className="text-white/30 hover:text-white/60 transition-colors"
                                        aria-label={showPass ? "Hide password" : "Show password"}
                                    >
                                        {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                                    </button>
                                </div>
                            }
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
                                    Signing in...
                                </>
                            ) : (
                                <>Sign in <ArrowRight size={16} /></>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
