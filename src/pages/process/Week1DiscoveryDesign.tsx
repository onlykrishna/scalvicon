import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';
import { motion } from 'framer-motion';
import { 
    Clock, 
    CheckCircle, 
    Search, 
    Target, 
    Palette, 
    ArrowRight, 
    ArrowLeft,
    Check
} from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const Week1DiscoveryDesign = () => {
    const steps = [
        { number: 1, title: "Discovery", color: "bg-[#00e5a0]", status: "active", slug: "week-1-discovery-design" },
        { number: 2, title: "Development", color: "bg-[#22d3ee]", status: "pending", slug: "week-2-development" },
        { number: 3, title: "Content", color: "bg-[#f59e0b]", status: "pending", slug: "week-3-content-integrations" },
        { number: 4, title: "Testing", color: "bg-[#f97316]", status: "pending", slug: "week-4-testing-launch" },
        { number: 5, title: "Launch", color: "bg-[#00e5a0]", status: "pending", slug: "ongoing-support-growth" },
    ];

    const timelineSteps = [
        {
            title: "Business & Competitor Research",
            description: "We analyse your top 3–5 competitors, identify gaps in their UX, and map a positioning strategy unique to your brand.",
            icon: <Search className="h-6 w-6 text-[#00e5a0]" />
        },
        {
            title: "Goal & Audience Mapping",
            description: "We define your core audience persona, primary conversion goal (call, form, purchase), and key messaging hierarchy for your site.",
            icon: <Target className="h-6 w-6 text-[#00e5a0]" />
        },
        {
            title: "2 Custom Design Concepts",
            description: "You receive 2 fully designed homepage mockups. Each reflects a different visual direction while staying aligned with your brand. You pick one, we refine it, and lock it in.",
            icon: <Palette className="h-6 w-6 text-[#00e5a0]" />
        }
    ];

    const faqItems = [
        {
            question: "What if I don't have a logo yet?",
            answer: "No problem. We can either work with a professional placeholder font if you're planning to get one later, or we can design a custom logo for you as an add-on service. Just let us know on the kickoff call!"
        },
        {
            question: "How do I give feedback on the designs?",
            answer: "We use Figma for all our design work. You'll get a direct link where you can click anywhere on the design to leave comments. We find this is the fastest and clearest way to iterate."
        },
        {
            question: "What if I don't like either design concept?",
            answer: "While rare, if we miss the mark, we'll have a second deep-dive session to understand exactly why and produce a third concept. Your satisfaction is our priority before we move to development."
        },
        {
            question: "Do you work with my existing brand colours?",
            answer: "Absolutely. If you have established brand guidelines, we'll follow them strictly. If you're looking for a refresh, we can suggest modern palettes that complement your brand."
        },
        {
            question: "Is there a kickoff call?",
            answer: "Yes! Every project starts with a 45-60 minute kickoff call where we meet the team, align on goals, and walk through the next 4 weeks. It's the most important hour of the project."
        }
    ];

    // Schema Data
    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "Scalvicon Web Design Process: Week 1",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Business & Competitor Research",
                "text": "Analysis of top 3-5 competitors and brand positioning strategy."
            },
            {
                "@type": "HowToStep",
                "name": "Goal & Audience Mapping",
                "text": "Defining core audience persona and conversion goals."
            },
            {
                "@type": "HowToStep",
                "name": "2 Custom Design Concepts",
                "text": "Delivery of two bespoke design mockups for selection."
            }
        ]
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#94a3b8] font-body selection:bg-[#00e5a0]/30">
            <SEO 
                title="Week 1: Discovery & Design | Scalvicon Web Solutions Process"
                description="In Week 1, Scalvicon learns your business, competitors, and goals — then delivers 2 custom design concepts tailored for conversions. No guesswork, pure strategy."
                url="https://scalvicon.com/process/week-1-discovery-design"
            />
            <Helmet>
                <meta property="og:title" content="Week 1 — Discovery & Design | How Scalvicon Works" />
                <meta property="og:description" content="See exactly what happens in Week 1 of your Scalvicon project. Business discovery, competitor research, and 2 bespoke design concepts delivered." />
                <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            </Helmet>

            <Navbar />

            <main className="pt-24 pb-20">
                {/* 1. Process Breadcrumb Nav */}
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
                                        ${step.status === 'active' ? step.color + ' shadow-[0_0_20px_rgba(0,229,160,0.5)] scale-110' : 'bg-white/10 text-white/40 group-hover:bg-white/20'}
                                        transition-all duration-300
                                    `}>
                                        {step.number}
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
                        <span className="text-[#00e5a0] font-mono text-xs tracking-[0.2em] font-bold block mb-4 uppercase">
                            WEEK 1
                        </span>
                        <h1 className="text-4xl md:text-7xl font-display font-black text-white mb-6 tracking-tight leading-tight">
                            Discovery & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5a0] to-[#22d3ee]">Design</span>
                        </h1>
                        <p className="text-lg md:text-xl italic text-[#94a3b8] mb-8 font-light max-w-2xl mx-auto">
                            "We don't guess. We research."
                        </p>
                        <div className="max-w-3xl mx-auto text-base md:text-lg leading-relaxed mb-10 text-[#94a3b8]">
                            Before a single pixel is designed, we spend Week 1 deep inside your business. 
                            We study your competitors, map your audience, and identify exactly what your 
                            ideal customer needs to see before they buy. Then we translate all of that 
                            into 2 completely custom design concepts — built specifically for your brand, 
                            your goals, and your conversions. You pick your favourite and we move forward.
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#111820] border border-white/5 rounded-full text-sm font-medium text-[#00e5a0]">
                            <Clock className="w-4 h-4" />
                            <span>Duration: 5–7 Business Days</span>
                        </div>
                    </motion.div>
                </section>

                {/* 3. What Happens This Week - Vertical Timeline */}
                <section className="container mx-auto px-4 max-w-4xl mb-24 md:mb-32">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-12 text-center">What Happens This Week</h2>
                    <div className="space-y-6 md:space-y-8 relative">
                        <div className="absolute left-[31px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-[#00e5a0]/50 to-transparent hidden md:block" />
                        {timelineSteps.map((step, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="group bg-[#111820] rounded-2xl border-l-4 border-[#00e5a0] p-6 md:p-8 shadow-card hover:shadow-card-hover transition-all border border-white/5"
                            >
                                <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                                    <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-xl bg-[#00e5a0]/10 flex items-center justify-center group-hover:bg-[#00e5a0]/20 transition-colors">
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

                {/* 4 & 5. Checklist & Deliverables */}
                <section className="container mx-auto px-4 max-w-6xl mb-24 md:mb-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* What You Need to Provide */}
                        <div className="bg-[#111820] rounded-2xl border-l-4 border-[#f59e0b] p-6 md:p-8 border border-white/5 h-full">
                            <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-8">What We'll Need From You</h3>
                            <ul className="space-y-4">
                                {[
                                    "Your brand logo (or we create one — ask us)",
                                    "Brand colours (if any)",
                                    "3–5 competitor websites you like or dislike",
                                    "Your primary goal (leads, sales, bookings)",
                                    "Any reference sites you find visually appealing"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className="w-6 h-6 shrink-0 rounded-full bg-green-500/20 flex items-center justify-center mt-1">
                                            <Check className="w-4 h-4 text-green-500" />
                                        </div>
                                        <span className="text-white text-sm md:text-base font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-8 text-xs italic text-[#94a3b8]/60 p-4 bg-black/20 rounded-xl">
                                Don't have everything? No stress — we guide you through it on our kickoff call.
                            </p>
                        </div>

                        {/* Deliverables Block */}
                        <div className="bg-[#111820] rounded-2xl border border-[#00e5a0]/30 p-6 md:p-8 shadow-[0_0_30px_rgba(0,229,160,0.05)] relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-[#00e5a0]/5 blur-3xl -mr-16 -mt-16 group-hover:bg-[#00e5a0]/10 transition-all rounded-full" />
                            <h3 className="text-xl md:text-2xl font-display font-bold text-[#00e5a0] mb-8 flex items-center gap-3">
                                <CheckCircle className="w-7 h-7" />
                                Week 1 Deliverables
                            </h3>
                            <ul className="space-y-6">
                                {[
                                    { title: "2 custom homepage design mockups", desc: "Two distinct visual directions for your primary page." },
                                    { title: "Brand style guide", desc: "Fonts, colors, and spacing standards for your new site." },
                                    { title: "Sitemap & page structure", desc: "Visual hierarchy and pathing for your entire web presence." },
                                    { title: "Competitor analysis summary", desc: "Condensed report on our findings and how we'll pivot to beat them." }
                                ].map((item, idx) => (
                                    <li key={idx}>
                                        <h4 className="text-white font-bold mb-1 text-sm md:text-base">{item.title}</h4>
                                        <p className="text-xs md:text-sm text-[#94a3b8]">{item.desc}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 6. FAQ Section */}
                <section className="container mx-auto px-4 max-w-4xl mb-24 md:mb-32">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-12 text-center">Week 1 — Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible className="space-y-4">
                        {faqItems.map((item, idx) => (
                            <AccordionItem 
                                key={idx} 
                                value={`item-${idx}`}
                                className="border border-white/5 bg-[#111820] rounded-xl px-2 overflow-hidden"
                            >
                                <AccordionTrigger className="hover:no-underline text-white font-bold py-6 text-left hover:text-[#00e5a0] transition-colors text-sm md:text-base">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-[#94a3b8] pb-6 leading-relaxed text-xs md:text-sm">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </section>

                {/* 7. CTA Section */}
                <section className="container mx-auto px-4 max-w-4xl mb-24 md:mb-32">
                    <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden border border-white/10 group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#111820] to-[#0a0a0a]" />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from),_transparent_70%)] from-[#00e5a0]/10" />
                        
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

                {/* 8. Bottom Process Nav */}
                <section className="container mx-auto px-4 max-w-4xl border-t border-white/5 pt-12">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <Link to="/#process" className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors">
                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all">
                                <ArrowLeft className="w-4 h-4" />
                            </div>
                            <span className="font-display font-medium">Back to Process Overview</span>
                        </Link>

                        <Link to="/process/week-2-development" className="group text-right">
                            <span className="block text-xs uppercase tracking-widest text-white/40 mb-1 font-bold">Next Step</span>
                            <div className="flex items-center gap-3 text-[#22d3ee] group-hover:text-[#67e8f9] transition-colors">
                                <span className="font-display font-bold text-xl">Week 2: Development</span>
                                <div className="w-10 h-10 rounded-full border border-[#22d3ee]/20 flex items-center justify-center group-hover:border-[#22d3ee]/50 transition-all">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Week1DiscoveryDesign;
