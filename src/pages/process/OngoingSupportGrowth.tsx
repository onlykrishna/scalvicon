import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
    Clock, 
    CheckCircle, 
    ShieldCheck, 
    Database, 
    Edit3, 
    BarChart3, 
    Zap, 
    Cpu, 
    ArrowRight, 
    ArrowLeft,
    Check,
    Star,
    MapPin,
    PenTool,
    Link2,
    ShieldAlert,
    MessageSquare,
    Phone
} from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const OngoingSupportGrowth = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: currentUser?.displayName || "",
        callingNumber: "",
        whatsappNumber: ""
    });

    const steps = [
        { number: 1, title: "Discovery", color: "bg-[#00e5a0]", status: "completed", slug: "week-1-discovery-design" },
        { number: 2, title: "Development", color: "bg-[#22d3ee]", status: "completed", slug: "week-2-development" },
        { number: 3, title: "Content", color: "bg-[#f59e0b]", status: "completed", slug: "week-3-content-integrations" },
        { number: 4, title: "Testing", color: "bg-[#f97316]", status: "completed", slug: "week-4-testing-launch" },
        { number: 5, title: "Launch", color: "bg-[#00e5a0]", status: "active", slug: "ongoing-support-growth" },
    ];

    const supportFeatures = [
        {
            title: "Security & Uptime Monitoring",
            description: "24/7 uptime monitoring, security patches, malware scans, SSL renewal.",
            icon: <ShieldCheck className="h-6 w-6 text-[#00e5a0]" />
        },
        {
            title: "Weekly Backups",
            description: "Automated daily backups stored securely. One-click restore if anything goes wrong.",
            icon: <Database className="h-6 w-6 text-[#00e5a0]" />
        },
        {
            title: "Content Updates",
            description: "Need to update pricing, add a new service, or change a photo? We handle it within 48 hours.",
            icon: <Edit3 className="h-6 w-6 text-[#00e5a0]" />
        },
        {
            title: "Monthly SEO Report",
            description: "Keyword ranking report, traffic analysis, and 3 actionable recommendations every month.",
            icon: <BarChart3 className="h-6 w-6 text-[#00e5a0]" />
        },
        {
            title: "Performance Maintenance",
            description: "Monthly speed audits. We keep your Core Web Vitals in the green.",
            icon: <Zap className="h-6 w-6 text-[#00e5a0]" />
        },
        {
            title: "AI & Tool Updates",
            description: "As AI tools evolve, we update your integrations to stay current and optimized.",
            icon: <Cpu className="h-6 w-6 text-[#00e5a0]" />
        }
    ];

    const pricingPlans = [
        {
            name: "Basic",
            price: "₹1,999",
            features: [
                "Uptime monitoring",
                "Monthly backup",
                "1 content update/month",
                "Monthly SEO report"
            ]
        },
        {
            name: "Growth",
            price: "₹3,999",
            popular: true,
            features: [
                "Everything in Basic",
                "5 content updates/month",
                "Quarterly design refresh",
                "Performance audit",
                "Priority 24hr support"
            ]
        },
        {
            name: "Agency/Scale",
            price: "₹9,999",
            features: [
                "Everything in Growth",
                "Unlimited content updates",
                "Monthly blog/SEO content (1 article)",
                "AI tool updates",
                "Dedicated Slack channel"
            ]
        }
    ];

    const growthStats = [
        { title: "Local SEO", desc: "Google Business Profile optimisation, local citations, map ranking", icon: <MapPin className="w-6 h-6" /> },
        { title: "Content Marketing", desc: "Monthly SEO blog posts targeting keywords your customers are searching", icon: <PenTool className="w-6 h-6" /> },
        { title: "Backlink Building", desc: "Ethical link acquisition to increase domain authority", icon: <Link2 className="w-6 h-6" /> }
    ];

    const faqItems = [
        {
            question: "Is the support plan mandatory?",
            answer: "No. You own your website 100%. While we highly recommend a maintenance plan for security and performance, you are free to manage hosting and updates yourself after launch."
        },
        {
            question: "What's your response time for support requests?",
            answer: "We aim to respond to all support tickets within 4-8 hours. Content updates are usually completed within 48 business hours."
        },
        {
            question: "Can I cancel the monthly plan anytime?",
            answer: "Yes. Our plans are month-to-month with no long-term contracts. You can upgrade, downgrade, or cancel at any time with 30 days' notice."
        },
        {
            question: "What counts as a 'content update'?",
            answer: "A content update includes text changes, swapping images, adding a new blog post you've written, or minor CSS tweaks. It does not include building entirely new pages or major custom features."
        },
        {
            question: "Do you offer SEO guarantees?",
            answer: "We guarantee that we follow industry best practices and deliver high-quality optimizations. However, since Google controls the rankings, no ethical agency can guarantee a #1 spot."
        }
    ];

    const handleGetStarted = (plan: any) => {
        if (!currentUser) {
            toast.error("Please login now to proceed", {
                description: "You need to be authenticated to select a support plan.",
                action: {
                    label: "Login",
                    onClick: () => navigate("/login")
                }
            });
            return;
        }
        setSelectedPlan(plan);
        setFormData(prev => ({ ...prev, name: currentUser.displayName || "" }));
        setIsDialogOpen(true);
    };

    const handleSend = () => {
        if (!formData.name || !formData.callingNumber || !formData.whatsappNumber) {
            toast.error("All fields are mandatory");
            return;
        }

        const message = `Hello Scalvicon! 🚀
I'm interested in the *${selectedPlan?.name}* support plan (at ${selectedPlan?.price}/mo).

*My Details:*
👤 *Name:* ${formData.name}
📞 *Calling No:* ${formData.callingNumber}
💬 *WhatsApp No:* ${formData.whatsappNumber}

Please help me get started!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/919794290960?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
        setIsDialogOpen(false);
        toast.success("Request sent via WhatsApp!");
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#94a3b8] font-body selection:bg-[#00e5a0]/30">
            <SEO 
                title="Ongoing Support & Growth | Monthly Website Maintenance | Scalvicon"
                description="After launch, Scalvicon keeps your website fast, secure, and growing. Monthly maintenance plans covering hosting, backups, SEO updates, and content changes."
                url="https://scalvicon.com/process/ongoing-support-growth"
            />
            <Helmet>
                <meta property="og:title" content="Ongoing Support & Growth | Scalvicon Monthly Plans" />
            </Helmet>

            <Navbar />

            <main className="pt-24 pb-20">
                {/* 1. Process Stepper */}
                <div className="container mx-auto px-4 mb-2 overflow-hidden">
                    <div className="flex items-center justify-between relative max-w-4xl mx-auto overflow-x-auto pb-4 scrollbar-hide">
                        <div className="absolute top-5 left-0 right-0 h-[2px] bg-white/10 -z-10 hidden md:block" />
                        {steps.map((step) => (
                            <Link 
                                key={step.number} 
                                to={`/process/${step.slug}`}
                                className="flex flex-col items-center min-w-[100px] group transition-all"
                            >
                                <div className={`
                                    w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-black mb-2
                                    ${step.status === 'active' ? 'bg-[#00e5a0] shadow-[0_0_20px_rgba(0,229,160,0.5)] scale-110' : 
                                      step.status === 'completed' ? 'bg-[#00e5a0]' : 'bg-white/10 text-white/40 group-hover:bg-white/20'}
                                    transition-all duration-300
                                `}>
                                    {step.status === 'completed' ? <Check className="w-5 h-5" /> : step.number}
                                </div>
                                <span className={`text-[10px] uppercase tracking-widest font-bold font-display ${step.status === 'active' ? 'text-white' : 'text-white/40'}`}>
                                    Step {step.number}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center mb-16">
                    <span className="bg-[#111820] text-[#00e5a0] text-[10px] px-3 py-1 rounded-full border border-[#00e5a0]/20 font-bold tracking-widest uppercase">
                        ONGOING — No end date
                    </span>
                </div>

                {/* 2. Hero Section */}
                <section className="container mx-auto px-4 mb-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-[#00e5a0] font-mono text-xs tracking-[0.2em] font-bold block mb-4 uppercase">
                            ONGOING
                        </span>
                        <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 tracking-tight leading-tight">
                            Support & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5a0] to-[#22d3ee]">Growth</span>
                        </h1>
                        <p className="text-xl text-[#94a3b8] mb-8 font-light max-w-2xl mx-auto italic">
                            "We don't disappear after launch."
                        </p>
                        <div className="max-w-3xl mx-auto text-lg leading-relaxed mb-10 text-[#94a3b8]">
                            Most agencies vanish the moment your site goes live. We don't. 
                            Scalvicon offers ongoing monthly support plans to keep your website 
                            fast, secure, updated, and growing in search rankings. Think of us 
                            as your on-call web team — without the cost of hiring one.
                        </div>
                    </motion.div>
                </section>

                {/* 3. What's Included - Feature Cards */}
                <section className="container mx-auto px-4 max-w-6xl mb-32">
                    <h2 className="text-3xl font-display font-bold text-white mb-12 text-center">Everything Your Business Needs Post-Launch</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {supportFeatures.map((feature, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-[#151c25] p-8 rounded-2xl border border-white/5 hover:border-[#00e5a0]/30 transition-all group"
                            >
                                <div className="w-12 h-12 bg-[#00e5a0]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-display font-bold text-white mb-4">{feature.title}</h3>
                                <p className="text-[#94a3b8] text-sm leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 4. 30-Day Post-Launch Warranty */}
                <section className="container mx-auto px-4 max-w-4xl mb-32">
                    <div className="bg-[#111820] rounded-2xl border-2 border-[#f59e0b]/50 p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#f59e0b]/5 blur-3xl rounded-full" />
                        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                            <div className="w-20 h-20 bg-[#f59e0b]/10 rounded-full flex items-center justify-center shrink-0">
                                <ShieldAlert className="w-10 h-10 text-[#f59e0b]" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-display font-bold text-white mb-4">30-Day Free Warranty — Included With Every Project</h2>
                                <p className="text-[#94a3b8] leading-relaxed">
                                    Every Scalvicon project includes a 30-day post-launch warranty. If anything breaks, glitches, 
                                    or doesn't work as expected — we fix it at zero cost. No questions asked.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Monthly Plans Pricing Section */}
                <section className="container mx-auto px-4 max-w-6xl mb-32">
                    <h2 className="text-3xl font-display font-bold text-white mb-16 text-center">Choose Your Support Plan</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {pricingPlans.map((plan, idx) => (
                            <div 
                                key={idx}
                                className={`
                                    relative bg-[#151c25] rounded-3xl p-10 border transition-all hover:-translate-y-2
                                    ${plan.popular ? 'border-[#00e5a0] shadow-[0_30px_60px_-15px_rgba(0,229,160,0.15)] scale-105 z-10' : 'border-white/5 shadow-xl'}
                                `}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00e5a0] text-black text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-black" /> Most Popular
                                    </div>
                                )}
                                <h3 className="text-2xl font-display font-bold text-white mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-8">
                                    <span className="text-4xl font-display font-black text-white">{plan.price}</span>
                                    <span className="text-[#94a3b8] text-sm">/month</span>
                                </div>
                                <ul className="space-y-4 mb-10">
                                    {plan.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-3 text-sm text-[#94a3b8]">
                                            <Check className="w-4 h-4 text-[#00e5a0] mt-0.5 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button 
                                    onClick={() => handleGetStarted(plan)}
                                    className={`w-full py-6 rounded-xl font-bold ${plan.popular ? 'bg-[#00e5a0] text-black hover:bg-[#00c58a]' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all font-display'}`}
                                >
                                    Get Started
                                </Button>
                            </div>
                        ))}
                    </div>
                    <p className="mt-12 text-center text-sm italic text-[#94a3b8]/50">
                        Prices shown in INR. Custom plans available for agencies and multi-site clients.
                    </p>
                </section>

                {/* 6. SEO Growth Section */}
                <section className="container mx-auto px-4 max-w-6xl mb-32">
                    <div className="bg-[#111820] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#00e5a0]/5 to-transparent" />
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 relative z-10">Your Website Should Get Better Over Time</h2>
                        <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto mb-16 relative z-10 leading-relaxed">
                            A launched website is just the starting point. With our Growth plan, we actively 
                            work on improving your Google rankings every month — new content, keyword 
                            targeting, backlink strategy, and technical SEO fixes based on real data.
                        </p>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                            {growthStats.map((stat, idx) => (
                                <div key={idx} className="bg-black/40 p-8 rounded-3xl border border-white/5 text-left hover:border-[#00e5a0]/20 transition-all">
                                    <div className="w-12 h-12 bg-[#00e5a0]/10 rounded-xl flex items-center justify-center mb-6 text-[#00e5a0]">
                                        {stat.icon}
                                    </div>
                                    <h3 className="text-xl font-display font-bold text-white mb-3">{stat.title}</h3>
                                    <p className="text-[#94a3b8] text-sm leading-relaxed">{stat.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 7. FAQ Section */}
                <section className="container mx-auto px-4 max-w-4xl mb-32">
                    <h2 className="text-3xl font-display font-bold text-white mb-12 text-center">Post-Launch Support — FAQ</h2>
                    <Accordion type="single" collapsible className="space-y-4">
                        {faqItems.map((item, idx) => (
                            <AccordionItem 
                                key={idx} 
                                value={`item-${idx}`}
                                className="border border-white/5 bg-[#111820] rounded-xl px-2 overflow-hidden"
                            >
                                <AccordionTrigger className="hover:no-underline text-white font-bold py-6 text-left hover:text-[#00e5a0] transition-colors">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-[#94a3b8] pb-6 leading-relaxed">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </section>

                {/* 8. Final CTA Section */}
                <section className="container mx-auto px-4 max-w-5xl mb-32">
                    <div className="relative rounded-[2.5rem] p-12 md:p-20 overflow-hidden border border-white/5 group bg-[#111820]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from),_transparent_70%)] from-[#00e5a0]/10 opacity-70" />
                        <div className="relative z-10 text-center">
                            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-6">Ready to Build Something That Lasts?</h2>
                            <p className="text-[#94a3b8] mb-12 text-xl max-w-xl mx-auto">
                                "From idea to live website in 4 weeks — then we grow it together."
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Link to="/#contact">
                                    <Button size="lg" className="bg-[#00e5a0] hover:bg-[#00c58a] text-black font-bold h-16 px-12 text-xl rounded-2xl shadow-[0_0_40px_rgba(0,229,160,0.3)] hover:scale-105 transition-all">
                                        Start Your Project <ArrowRight className="ml-2 w-6 h-6" />
                                    </Button>
                                </Link>
                                <Link to="/portfolio">
                                    <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 h-16 px-12 text-xl rounded-2xl transition-all">
                                        View Our Work
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 9. Bottom Nav */}
                <section className="container mx-auto px-4 max-w-4xl border-t border-white/5 pt-12">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <Link to="/process/week-4-testing-launch" className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors">
                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all text-xs font-bold font-mono">
                                04
                            </div>
                            <div className="text-left">
                                <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-1 font-bold">Previous Step</span>
                                <span className="font-display font-bold text-lg text-white group-hover:text-[#f97316]">Week 4: Testing & Launch</span>
                            </div>
                        </Link>

                        <Link to="/#process" className="group text-right flex items-center gap-3 text-white/50 hover:text-white transition-colors">
                            <div className="text-right">
                                <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-1 font-bold">Flow Complete</span>
                                <span className="font-display font-bold text-lg text-white group-hover:text-primary">Back to Overview</span>
                            </div>
                        </Link>
                    </div>
                </section>
            </main>

            {/* Lead Form Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px] bg-[#111820] border-white/10 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-display font-bold flex items-center gap-2">
                            Select Plan: <span className="text-[#00e5a0]">{selectedPlan?.name}</span>
                        </DialogTitle>
                        <DialogDescription className="text-[#94a3b8]">
                            Please provide your contact details. We will reach out on WhatsApp to finalize your activation.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-sm font-medium">Full Name <span className="text-red-500">*</span></Label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]">
                                    <Edit3 className="w-4 h-4" />
                                </div>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="bg-black/20 border-white/5 pl-10 h-12 focus:border-[#00e5a0]/50 transition-all"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="calling" className="text-sm font-medium">Calling Number <span className="text-red-500">*</span></Label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <Input
                                    id="calling"
                                    type="tel"
                                    value={formData.callingNumber}
                                    onChange={(e) => setFormData({ ...formData, callingNumber: e.target.value })}
                                    className="bg-black/20 border-white/5 pl-10 h-12 focus:border-[#00e5a0]/50 transition-all"
                                    placeholder="+91 XXXXX XXXXX"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="whatsapp" className="text-sm font-medium">WhatsApp Number <span className="text-red-500">*</span></Label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]">
                                    <MessageSquare className="w-4 h-4" />
                                </div>
                                <Input
                                    id="whatsapp"
                                    type="tel"
                                    value={formData.whatsappNumber}
                                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                                    className="bg-black/20 border-white/5 pl-10 h-12 focus:border-[#00e5a0]/50 transition-all"
                                    placeholder="+91 XXXXX XXXXX"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 mt-2">
                        <Button 
                            onClick={handleSend}
                            className="bg-[#00e5a0] hover:bg-[#00c58a] text-black font-bold h-12 rounded-xl flex items-center justify-center gap-2 group transition-all"
                        >
                            Send Request via WhatsApp
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <p className="text-[10px] text-[#94a3b8] text-center italic">
                            By clicking send, you agree to be contacted via WhatsApp regarding your support plan request.
                        </p>
                    </div>
                </DialogContent>
            </Dialog>

            <Footer />
        </div>
    );
};

export default OngoingSupportGrowth;
