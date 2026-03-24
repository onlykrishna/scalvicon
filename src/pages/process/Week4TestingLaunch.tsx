import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';
import { motion } from 'framer-motion';
import { 
    Clock, 
    CheckCircle, 
    MonitorSmartphone, 
    Zap, 
    Rocket, 
    Video, 
    ArrowRight, 
    ArrowLeft,
    Check,
    CheckCircle2,
    Globe,
    FileText,
    BarChart,
    PhoneCall
} from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const Week4TestingLaunch = () => {
    const steps = [
        { number: 1, title: "Discovery", color: "bg-[#00e5a0]", status: "completed", slug: "week-1-discovery-design" },
        { number: 2, title: "Development", color: "bg-[#22d3ee]", status: "completed", slug: "week-2-development" },
        { number: 3, title: "Content", color: "bg-[#f59e0b]", status: "completed", slug: "week-3-content-integrations" },
        { number: 4, title: "Testing", color: "bg-[#f97316]", status: "active", slug: "week-4-testing-launch" },
        { number: 5, title: "Launch", color: "bg-[#00e5a0]", status: "pending", slug: "ongoing-support-growth" },
    ];

    const timelineSteps = [
        {
            title: "Cross-Browser & Device Testing",
            description: "We test on Chrome, Safari, Firefox, Edge. On iPhone, Android, tablet, and desktop. Every layout, every button, every form.",
            icon: <MonitorSmartphone className="h-6 w-6 text-[#f97316]" />
        },
        {
            title: "Final Speed & Core Web Vitals Audit",
            description: "We run Lighthouse, GTmetrix, and PageSpeed Insights. Any score under 90 gets fixed before launch.",
            icon: <Zap className="h-6 w-6 text-[#f97316]" />
        },
        {
            title: "Go-Live & DNS Setup",
            description: "We connect your domain, configure DNS, activate SSL, and deploy to production.",
            icon: <Rocket className="h-6 w-6 text-[#f97316]" />
        },
        {
            title: "Loom Walkthrough Video",
            description: "You receive a personalised Loom screen-recording walking you through your entire website — how to request edits, how to view analytics, and how your site works.",
            icon: <Video className="h-6 w-6 text-[#f97316]" />
        }
    ];

    const checklistItems = [
        "All forms tested", "Thank-you pages working", "Mobile layout perfect",
        "404 page configured", "Sitemap submitted to Google", "SSL active",
        "Analytics tracking events", "Redirects in place", "Page speed 90+",
        "Schema markup validated", "OG tags verified", "Broken links checked"
    ];

    const launchDeliverables = [
        { title: "Live website URL", icon: <Globe className="w-5 h-5" />, desc: "Your new business headquarters is live." },
        { title: "Loom walkthrough video", icon: <Video className="w-5 h-5" />, desc: "How to use and manage your site." },
        { title: "Google Search Console", icon: <BarChart className="w-5 h-5" />, desc: "Verified and tracking your growth." },
        { title: "Full handover document", icon: <FileText className="w-5 h-5" />, desc: "Logins, hosting, and CMS guide." },
        { title: "30-minute launch call", icon: <PhoneCall className="w-5 h-5" />, desc: "Live walkthrough and final Q&A." }
    ];

    const faqItems = [
        {
            question: "What if something breaks after launch?",
            answer: "Every project includes a 30-day post-launch warranty. If something isn't working as expected, we'll jump in and fix it at no extra cost. We also offer monthly maintenance plans for long-term support."
        },
        {
            question: "How long does DNS propagation take?",
            answer: "Usually between 4 and 24 hours. While the site is often live within an hour, it may take a full day for the changes to reach every network worldwide."
        },
        {
            question: "Will I be able to make my own edits?",
            answer: "Yes. Our training video and handover document cover everything you need to know about updating text, images, and basic content through your CMS."
        },
        {
            question: "What's in the Loom video exactly?",
            answer: "It's a step-by-step tour of your site. We show you the frontend, the CMS dashboard, where to find your leads, and how to read your basic analytics reports."
        },
        {
            question: "Is there a staging site before it goes live?",
            answer: "Always. We build your site on a private 'staging' URL first. You review and approve everything there before we pointing your domain to the final production version."
        }
    ];

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "Scalvicon Web Design Process: Week 4",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Cross-Browser & Device Testing",
                "text": "Comprehensive testing across all major browsers and mobile/desktop devices."
            },
            {
                "@type": "HowToStep",
                "name": "Go-Live & DNS Setup",
                "text": "Final deployment to production and technical domain configuration."
            }
        ]
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#94a3b8] font-body selection:bg-[#f97316]/30">
            <SEO 
                title="Week 4: Testing & Launch | Website Launch Checklist"
                description="Week 4 is go-live. Scalvicon runs cross-browser testing, speed optimisation, and launches your site — with a Loom walkthrough video so you know exactly how it works."
                url="https://scalvicon-9bf2f.web.app/process/week-4-testing-launch"
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
                                        ${step.status === 'active' ? 'bg-[#f97316] shadow-[0_0_20px_rgba(249,115,22,0.5)] scale-110' : 
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
                        <span className="text-[#f97316] font-mono text-xs tracking-[0.2em] font-bold block mb-4 uppercase">
                            WEEK 4
                        </span>
                        <h1 className="text-4xl md:text-7xl font-display font-black text-white mb-6 tracking-tight leading-tight">
                            Testing & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-[#f59e0b]">Launch</span>
                        </h1>
                        <p className="text-lg md:text-xl text-[#94a3b8] mb-8 font-light max-w-2xl mx-auto italic">
                            "We go live only when it's perfect."
                        </p>
                        <div className="max-w-3xl mx-auto text-base md:text-lg leading-relaxed mb-10 text-[#94a3b8]">
                            Week 4 is the most satisfying part — but also the most rigorous. 
                            Before anything goes live, we run your website through our full 47-point 
                            launch checklist: cross-browser testing, mobile QA, speed audits, 
                            form testing, broken link checks, and SEO verification. Only when 
                            everything passes do we flip the switch.
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#111820] border border-white/5 rounded-full text-sm font-medium text-[#f97316]">
                            <Clock className="w-4 h-4" />
                            <span>Duration: 2–3 Business Days</span>
                        </div>
                    </motion.div>
                </section>

                {/* 3. What Happens This Week - Timeline */}
                <section className="container mx-auto px-4 max-w-4xl mb-24 md:mb-32">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-12 text-center">What Happens This Week</h2>
                    <div className="space-y-6 md:space-y-8 relative">
                        <div className="absolute left-[31px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-[#f97316]/50 to-transparent hidden md:block" />
                        {timelineSteps.map((step, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="group bg-[#111820] rounded-2xl border-l-4 border-[#f97316] p-6 md:p-8 shadow-card hover:shadow-card-hover transition-all border border-white/5"
                            >
                                <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                                    <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-xl bg-[#f97316]/10 flex items-center justify-center group-hover:bg-[#f97316]/20 transition-colors">
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

                {/* 4. Our 47-Point Launch Checklist */}
                <section className="container mx-auto px-4 max-w-5xl mb-24 md:mb-32">
                    <div className="bg-[#111820] rounded-3xl p-6 md:p-10 border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f97316]/5 blur-3xl rounded-full -mr-32 -mt-32" />
                        <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-8 md:mb-12 relative z-10 text-center">Our 47-Point Launch Checklist</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 md:gap-y-6 gap-x-12 relative z-10">
                            {checklistItems.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="w-5 h-5 shrink-0 rounded-full bg-[#00e5a0]/10 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-[#00e5a0]" />
                                    </div>
                                    <span className="text-white font-medium text-xs md:text-sm flex items-center gap-2">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <p className="mt-8 md:mt-12 text-center text-xs md:text-sm font-display font-bold text-[#00e5a0] tracking-widest relative z-10 uppercase">
                            "We don't launch until every box is checked."
                        </p>
                    </div>
                </section>

                {/* 5. What You Get on Launch Day */}
                <section className="container mx-auto px-4 max-w-6xl mb-24 md:mb-32">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-12 text-center">What You Get on Launch Day</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {launchDeliverables.map((item, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-[#111820] p-6 md:p-8 rounded-2xl border border-white/5 hover:border-[#f97316]/30 transition-all flex flex-col items-center text-center"
                            >
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#f97316]/10 rounded-xl flex items-center justify-center mb-6 text-[#f97316]">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg md:text-xl font-display font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-[#94a3b8] text-xs md:text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                        {/* Summary Box */}
                        <div className="sm:col-span-2 lg:col-span-1 bg-[#f97316]/5 border border-[#f97316]/20 p-6 md:p-8 rounded-2xl flex flex-col justify-center text-center">
                            <h3 className="text-lg md:text-xl font-display font-bold text-white mb-4">Total Peace of Mind</h3>
                            <p className="text-[10px] md:text-sm text-[#94a3b8] leading-relaxed">
                                From your domain setup to your personalized training video, we handle every detail so you can focus on running your business.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 6. FAQ Section */}
                <section className="container mx-auto px-4 max-w-4xl mb-24 md:mb-32">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-12 text-center">Testing & Launch — FAQ</h2>
                    <Accordion type="single" collapsible className="space-y-4">
                        {faqItems.map((item, idx) => (
                            <AccordionItem 
                                key={idx} 
                                value={`item-${idx}`}
                                className="border border-white/5 bg-[#111820] rounded-xl px-2 overflow-hidden"
                            >
                                <AccordionTrigger className="hover:no-underline text-white font-bold py-6 text-left hover:text-[#f97316] transition-colors text-sm md:text-base">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-[#94a3b8] pb-6 leading-relaxed text-xs md:text-sm">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </section>

                {/* 7. CTA + Bottom Nav */}
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
                        <Link to="/process/week-3-content-integrations" className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors">
                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all text-xs font-bold font-mono">
                                03
                            </div>
                            <div className="text-left">
                                <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-1 font-bold">Previous Step</span>
                                <span className="font-display font-bold text-lg text-white group-hover:text-[#f59e0b]">Week 3: Content & Integrations</span>
                            </div>
                        </Link>

                        <Link to="/process/ongoing-support-growth" className="group text-right flex items-center gap-3">
                            <div className="text-right">
                                <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-1 font-bold">Next Step</span>
                                <span className="font-display font-bold text-lg text-white group-hover:text-[#00e5a0]">Ongoing: Support & Growth</span>
                            </div>
                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all text-xs font-bold font-mono">
                                05
                            </div>
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Week4TestingLaunch;
