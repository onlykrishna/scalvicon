import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';
import { motion } from 'framer-motion';
import { 
    Clock, 
    CheckCircle, 
    Smartphone, 
    Zap, 
    Shield, 
    Search, 
    ArrowRight, 
    ArrowLeft,
    Check,
    Globe,
    Code2,
    BarChart3
} from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';

const Week2Development = () => {
    const steps = [
        { number: 1, title: "Discovery", color: "bg-[#00e5a0]", status: "completed", slug: "week-1-discovery-design" },
        { number: 2, title: "Development", color: "bg-[#22d3ee]", status: "active", slug: "week-2-development" },
        { number: 3, title: "Content", color: "bg-[#f59e0b]", status: "pending", slug: "week-3-content-integrations" },
        { number: 4, title: "Testing", color: "bg-[#f97316]", status: "pending", slug: "week-4-testing-launch" },
        { number: 5, title: "Launch", color: "bg-[#00e5a0]", status: "pending", slug: "ongoing-support-growth" },
    ];

    const timelineSteps = [
        {
            title: "Mobile-First Development",
            description: "We code your site to be perfect on every screen size — phone first, then tablet and desktop. Over 70% of your visitors are on mobile.",
            icon: <Smartphone className="h-6 w-6 text-[#22d3ee]" />
        },
        {
            title: "Performance Optimisation",
            description: "Every image is compressed. Every script is deferred. We target a Google PageSpeed score of 90+ so your site ranks and loads fast.",
            icon: <Zap className="h-6 w-6 text-[#22d3ee]" />
        },
        {
            title: "Security & Hosting Setup",
            description: "SSL certificate, secure hosting configuration, and a clean deployment pipeline are set up from day one.",
            icon: <Shield className="h-6 w-6 text-[#22d3ee]" />
        },
        {
            title: "On-Page SEO Foundation",
            description: "We implement meta tags, heading hierarchy, schema markup, sitemap, robots.txt, and Google Search Console setup as part of development — not an afterthought.",
            icon: <Search className="h-6 w-6 text-[#22d3ee]" />
        }
    ];

    const techBadges = [
        "React / Next.js", "Tailwind CSS", "Firebase / Vercel", 
        "Framer Motion", "Google Analytics 4", "Search Console", "Lighthouse CI"
    ];

    const seoFeatures = [
        {
            title: "Semantic HTML",
            description: "Proper H1/H2/H3 structure, alt tags, and aria labels for accessibility.",
            icon: <Code2 className="h-6 w-6 text-[#22d3ee]" />
        },
        {
            title: "Schema Markup",
            description: "LocalBusiness, WebPage, Service, and FAQ structured data included.",
            icon: <Globe className="h-6 w-6 text-[#22d3ee]" />
        },
        {
            title: "Core Web Vitals",
            description: "LCP, FID, and CLS all optimized during the build process.",
            icon: <BarChart3 className="h-6 w-6 text-[#22d3ee]" />
        }
    ];

    const faqItems = [
        {
            question: "Do you use WordPress?",
            answer: "No. We build custom React/Next.js sites. WordPress is often bloated and slow; our custom approach ensures the fastest possible load times and better security."
        },
        {
            question: "Will I be able to edit my website myself?",
            answer: "Yes! We can integrate a headless CMS that allows you to edit text and images easily without touching any code. We provide a training session at the end of the project."
        },
        {
            question: "What hosting do you use?",
            answer: "We typically use Vercel or Firebase Hosting. These are world-class, edge-optimized platforms that ensure your site is blazing fast everywhere in the world."
        },
        {
            question: "Is SEO really included in development?",
            answer: "Absolutely. Technical SEO is the foundation of our builds. While ongoing content SEO is separate, the technical structure (Schema, Meta, Sitemap, Speed) is built-in from day one."
        },
        {
            question: "What if I want changes during development?",
            answer: "We provide a staging link where you can see the progress. Minor tweaks can be handled during development, but major design changes should be finalized in Week 1."
        }
    ];

    // Schema Data
    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "Scalvicon Web Design Process: Week 2",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Mobile-First Development",
                "text": "Responsive coding optimized for mobile users first."
            },
            {
                "@type": "HowToStep",
                "name": "Performance Optimisation",
                "text": "Image compression, script deferral, and PageSpeed targeting."
            }
        ]
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#94a3b8] font-body selection:bg-[#22d3ee]/30">
            <SEO 
                title="Week 2: Development | Mobile-First Web Development"
                description="In Week 2, Scalvicon builds your approved design into a fast, mobile-first website. Clean code, built for speed, SEO, and conversions from day one."
                url="https://scalvicon-9bf2f.web.app/process/week-2-development"
                schema={howToSchema}
            />

            <Navbar />

            <main className="pt-24 pb-20">
                {/* 1. Process Stepper */}
                <div className="container mx-auto px-4 mb-8 overflow-hidden">
                    <div className="flex items-center justify-between relative max-w-4xl mx-auto overflow-x-auto pb-4 scrollbar-hide">
                        <div className="absolute top-5 left-0 right-0 h-[2px] bg-white/10 -z-10 hidden md:block" />
                        <div className="flex items-center justify-between min-w-[600px] md:min-w-0 w-full">
                            {steps.map((step, idx) => (
                                <Link 
                                    key={step.number} 
                                    to={`/process/${step.slug}`}
                                    className="flex flex-col items-center min-w-[100px] group transition-all"
                                >
                                    <div className={`
                                        w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-black mb-2
                                        ${step.status === 'active' ? 'bg-[#22d3ee] shadow-[0_0_20px_rgba(34,211,238,0.5)] scale-110' : 
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
                </div>

                {/* 2. Hero Section */}
                <section className="container mx-auto px-4 mb-16 md:mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-[#22d3ee] font-mono text-xs tracking-[0.2em] font-bold block mb-4 uppercase">
                            WEEK 2
                        </span>
                        <h1 className="text-4xl md:text-7xl font-display font-black text-white mb-6 tracking-tight leading-tight">
                            Development
                        </h1>
                        <p className="text-lg md:text-xl text-[#94a3b8] mb-8 font-light max-w-2xl mx-auto">
                            Your approved design, brought to life — fast.
                        </p>
                        <div className="max-w-3xl mx-auto text-base md:text-lg leading-relaxed mb-10 text-[#94a3b8]">
                            Once you've approved your design from Week 1, our developers get to work. 
                            We build mobile-first, performance-optimised websites with clean, scalable code. 
                            No bloated page builders. No slow WordPress themes. Just fast, purpose-built 
                            web experiences that load in under 2 seconds and rank on Google.
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#111820] border border-white/5 rounded-full text-sm font-medium text-[#22d3ee]">
                            <Clock className="w-4 h-4" />
                            <span>Duration: 5–7 Business Days</span>
                        </div>
                    </motion.div>
                </section>

                {/* 3. What Happens This Week - 4-Step Visual Timeline */}
                <section className="container mx-auto px-4 max-w-4xl mb-24 md:mb-32">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-12 text-center">What Happens This Week</h2>
                    <div className="space-y-6 md:space-y-8 relative">
                        <div className="absolute left-[31px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-[#22d3ee]/50 to-transparent hidden md:block" />
                        {timelineSteps.map((step, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="group bg-[#111820] rounded-2xl border-l-4 border-[#22d3ee] p-6 md:p-8 shadow-card hover:shadow-card-hover transition-all border border-white/5"
                            >
                                <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                                    <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-xl bg-[#22d3ee]/10 flex items-center justify-center group-hover:bg-[#22d3ee]/20 transition-colors">
                                        {step.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl font-display font-bold text-white mb-2">{step.title}</h3>
                                        <p className="text-[#94a3b8] text-sm md:text-base leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 4. Tech Stack Transparency Card */}
                <section className="container mx-auto px-4 max-w-4xl mb-24 md:mb-32">
                    <div className="bg-[#111820] rounded-3xl p-6 md:p-10 border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#22d3ee]/5 blur-3xl rounded-full -mr-32 -mt-32" />
                        <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-8 relative z-10 text-center">🛠 What We Build With</h3>
                        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 relative z-10">
                            {techBadges.map((tech, idx) => (
                                <Badge 
                                    key={idx} 
                                    variant="outline" 
                                    className="px-3 py-1.5 md:px-4 md:py-2 bg-black/40 border-white/10 text-white hover:border-[#22d3ee]/50 transition-colors text-xs md:text-sm font-medium"
                                >
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                        <p className="text-center text-xs md:text-sm italic text-[#94a3b8]/60 max-w-lg mx-auto relative z-10">
                            "Tech stack is adapted to your project needs. We always recommend what's best for your goals — not what's easiest for us."
                        </p>
                    </div>
                </section>

                {/* 5. SEO Built Into Development */}
                <section className="container mx-auto px-4 max-w-6xl mb-24 md:mb-32">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 text-center">SEO Is Not an Add-On</h2>
                    <p className="text-[#94a3b8] text-center mb-12 md:mb-16 text-base md:text-lg max-w-2xl mx-auto">It's built into every line of code from the start.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {seoFeatures.map((feature, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-[#111820] p-6 md:p-8 rounded-2xl border border-white/5 hover:border-[#22d3ee]/30 transition-all text-center"
                            >
                                <div className="w-12 h-12 bg-[#22d3ee]/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg md:text-xl font-display font-bold text-white mb-4">{feature.title}</h3>
                                <p className="text-[#94a3b8] text-xs md:text-sm leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 6. Deliverables Block */}
                <section className="container mx-auto px-4 max-w-4xl mb-24 md:mb-32">
                    <div className="bg-[#111820] rounded-2xl border border-[#22d3ee]/30 p-6 md:p-8 shadow-[0_0_30px_rgba(34,211,238,0.05)] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#22d3ee]/5 blur-3xl -mr-16 -mt-16 group-hover:bg-[#22d3ee]/10 transition-all rounded-full" />
                        <h3 className="text-xl md:text-2xl font-display font-bold text-[#22d3ee] mb-8 flex items-center gap-3">
                            <CheckCircle className="w-7 h-7" />
                            Week 2 Deliverables
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 md:gap-y-6 gap-x-8">
                            {[
                                "Fully developed website (staging link)",
                                "Mobile + desktop cross-browser testing",
                                "Google PageSpeed score report",
                                "On-page SEO implementation report",
                                "GA4 + Search Console connected"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="w-5 h-5 shrink-0 rounded-full bg-[#22d3ee]/20 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-[#22d3ee]" />
                                    </div>
                                    <span className="text-white font-medium text-xs md:text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 7. FAQ Section */}
                <section className="container mx-auto px-4 max-w-4xl mb-24 md:mb-32">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-12 text-center">Development — Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible className="space-y-4">
                        {faqItems.map((item, idx) => (
                            <AccordionItem 
                                key={idx} 
                                value={`item-${idx}`}
                                className="border border-white/5 bg-[#111820] rounded-xl px-2 overflow-hidden"
                            >
                                <AccordionTrigger className="hover:no-underline text-white font-bold py-6 text-left hover:text-[#22d3ee] transition-colors text-sm md:text-base">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-[#94a3b8] pb-6 leading-relaxed text-xs md:text-sm">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </section>

                {/* 8. CTA + Bottom Nav */}
                <section className="container mx-auto px-4 max-w-4xl mb-24 md:mb-32">
                    <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden border border-white/10 group bg-card">
                        <div className="relative z-10 text-center">
                            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-white mb-4">Ready to start your project?</h2>
                            <p className="text-[#94a3b8] mb-8 text-base md:text-lg">Free 30-minute strategy call. No commitment.</p>
                            <Link to="/#contact">
                                <Button size="lg" className="w-full sm:w-auto bg-[#00e5a0] hover:bg-[#00c58a] text-black font-bold h-14 px-10 text-base md:text-lg rounded-xl shadow-[0_0_30px_rgba(0,229,160,0.3)] hover:scale-105 transition-all">
                                    Book Your Free Discovery Call <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-4 max-w-4xl border-t border-white/5 pt-12">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <Link to="/process/week-1-discovery-design" className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors">
                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all text-xs font-bold font-mono">
                                01
                            </div>
                            <div className="text-left">
                                <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-1 font-bold">Previous Step</span>
                                <span className="font-display font-bold text-lg text-white group-hover:text-[#00e5a0]">Week 1: Discovery & Design</span>
                            </div>
                        </Link>

                        <Link to="/process/week-3-content-integrations" className="group text-right flex items-center gap-3">
                            <div className="text-right">
                                <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-1 font-bold">Next Step</span>
                                <span className="font-display font-bold text-lg text-white group-hover:text-[#f59e0b]">Week 3: Content & Integrations</span>
                            </div>
                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all text-xs font-bold font-mono">
                                03
                            </div>
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Week2Development;
