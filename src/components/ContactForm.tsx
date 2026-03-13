import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { User, Briefcase, Phone, Mail, MessageSquare, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import {
    contactSchema,
    type ContactFormData,
    BUSINESS_TYPES,
    BUDGET_RANGES,
} from "@/lib/validations/contact";
import { AuthInput } from "@/components/auth/AuthInput";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const ContactForm = () => {
    const { currentUser } = useAuth();
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

    const {
        register,
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

    // Pre-fill fields if user is logged in
    useEffect(() => {
        if (currentUser) {
            if (currentUser.displayName) setValue("name", currentUser.displayName);
            if (currentUser.email) setValue("email", currentUser.email);
        }
    }, [currentUser, setValue]);

    const onSubmit = async (data: ContactFormData) => {
        try {
            await addDoc(collection(db, "leads"), {
                ...data,
                createdAt: serverTimestamp(),
                status: "new",
                source: "contact_form",
            });

            // Track conversion in Google Analytics
            // @ts-expect-error - gtag is defined in index.html
            if (typeof gtag !== 'undefined') {
                // @ts-expect-error - gtag is defined in index.html
                gtag('event', 'generate_lead', {
                    event_category: 'contact',
                    event_label: data.businessType,
                    value: 1
                });
            }

            toast.success("Thanks! We'll reach out within 24 hours 🚀");
            reset();
        } catch (err) {
            console.error("Contact form error:", err);
            toast.error("Failed to send. Please try WhatsApp instead.");
        }
    };

    const inputClass = cn(
        "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-foreground",
        "placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50",
        "focus:ring-1 focus:ring-primary/30 transition-all duration-200",
    );

    return (
        <section id="contact" className="section-padding relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    className="text-center mb-12"
                >
                    <span className="text-primary font-mono text-xs uppercase tracking-widest">
                        Get In Touch
                    </span>
                    <h2
                        className="font-display font-extrabold text-foreground mt-3"
                        style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
                    >
                        Let's Build Something Great
                    </h2>
                    <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
                        Tell us about your business. We'll get back to you within 24 hours
                        — no sales pitch, just straight talk.
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={fadeUp}
                    className="max-w-2xl mx-auto"
                >
                    <div className="bg-card rounded-card border border-white/[0.06] card-shadow p-8">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            {/* Name + Business Name row */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <AuthInput<ContactFormData>
                                    label="Full Name"
                                    id="name"
                                    type="text"
                                    placeholder="Your Name"
                                    icon={User}
                                    register={register}
                                    error={errors.name?.message}
                                />
                                <AuthInput<ContactFormData>
                                    label="Business Name"
                                    id="businessName"
                                    type="text"
                                    placeholder="Your Business"
                                    icon={Briefcase}
                                    register={register}
                                    error={errors.businessName?.message}
                                />
                            </div>

                            {/* Business Type */}
                            <div className="space-y-1.5">
                                <label htmlFor="businessType" className="text-sm text-white/60 font-medium">
                                    Business Type
                                </label>
                                <Controller
                                    name="businessType"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            id="businessType"
                                            className={cn(
                                                inputClass,
                                                "appearance-none",
                                                errors.businessType ? "border-red-500/60" : "",
                                            )}
                                        >
                                            <option value="" disabled>
                                                Select your industry
                                            </option>
                                            {BUSINESS_TYPES.map((bt) => (
                                                <option key={bt} value={bt} className="bg-card">
                                                    {bt}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                />
                                {errors.businessType && (
                                    <p className="text-red-400 text-xs">
                                        {errors.businessType.message}
                                    </p>
                                )}
                            </div>

                            {/* Phone + Email row */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <AuthInput<ContactFormData>
                                    label="Phone Number"
                                    id="phone"
                                    type="tel"
                                    placeholder="10-digit mobile number"
                                    icon={Phone}
                                    register={register}
                                    error={errors.phone?.message}
                                />
                                <AuthInput<ContactFormData>
                                    label="Email"
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    icon={Mail}
                                    register={register}
                                    error={errors.email?.message}
                                />
                            </div>

                            {/* Message */}
                            <div className="space-y-1.5">
                                <label className="text-sm text-white/60 font-medium">
                                    What do you need? <span className="text-white/30">(optional)</span>
                                </label>
                                <div className="relative">
                                    <MessageSquare
                                        size={16}
                                        className="absolute left-3 top-3.5 text-white/30 pointer-events-none"
                                    />
                                    <textarea
                                        {...register("message")}
                                        placeholder="Describe your project, goals, or any specific requirements..."
                                        rows={3}
                                        className={cn(inputClass, "pl-9 resize-none")}
                                    />
                                </div>
                            </div>

                            {/* Budget */}
                            <div className="space-y-2">
                                <label className="text-sm text-white/60 font-medium">
                                    Budget Range
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {BUDGET_RANGES.map((range) => (
                                        <label
                                            key={range}
                                            className="flex items-center gap-2 cursor-pointer"
                                        >
                                            <input
                                                type="radio"
                                                value={range}
                                                {...register("budget")}
                                                className="accent-primary"
                                            />
                                            <span className="text-sm text-foreground/80">{range}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.budget && (
                                    <p className="text-red-400 text-xs">{errors.budget.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={cn(
                                    "w-full flex items-center justify-center gap-2 py-4 rounded-button",
                                    "font-semibold text-sm transition-all duration-200 mt-2",
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
                                    <>Send Message <ArrowRight size={16} /></>
                                )}
                            </button>

                            <p className="text-center text-xs text-muted-foreground">
                                Or chat directly on{" "}
                                <a
                                    href={`https://wa.me/${whatsappNumber}?text=Hi%20Scalvicon%2C%20I%27d%20like%20a%20free%20consultation`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline font-medium"
                                >
                                    WhatsApp
                                </a>{" "}
                                — we reply within minutes.
                            </p>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactForm;
