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
    PenLine, 
    Image as ImageIcon, 
    Link2, 
    Bot, 
    ArrowRight, 
    ArrowLeft,
    Check,
    MessageSquare,
    MapPin,
    Star,
    BarChart,
    Calendar,
    CreditCard,
    Mail,
    Users,
    Youtube,
    Instagram
} from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const Week3ContentIntegrations = () => {
    const steps = [
        { number: 1, title: "Discovery", color: "bg-[#00e5a0]", status: "completed", slug: "week-1-discovery-design" },
        { number: 2, title: "Development", color: "bg-[#22d3ee]", status: "completed", slug: "week-2-development" },
        { number: 3, title: "Content", color: "bg-[#f59e0b]", status: "active", slug: "week-3-content-integrations" },
        { number: 4, title: "Testing", color: "bg-[#f97316]", status: "pending", slug: "week-4-testing-launch" },
        { number: 5, title: "Launch", color: "bg-[#00e5a0]", status: "pending", slug: "ongoing-support-growth" },
    ];

    const timelineSteps = [
        {
            title: "SEO Copywriting",
            description: "We write every word on your website. Headlines, service descriptions, CTAs, about sections — all crafted to rank for the right keywords and convert your target audience.",
            icon: <PenLine className="h-6 w-6 text-[#f59e0b]" />
        },
        {
            title: "Content Population",
            description: "Your images, videos, testimonials, portfolio pieces, and brand assets are added and optimised (compressed, alt-tagged, lazy-loaded).",
            icon: <ImageIcon className="h-6 w-6 text-[#f59e0b]" />
        },
        {
            title: "Third-Party Integrations",
            description: "We connect WhatsApp Click-to-Chat, Google Maps embed, Google Reviews widget, and any other tools you use.",
            icon: <Link2 className="h-6 w-6 text-[#f59e0b]" />
        },
        {
            title: "AI & Automation Tools",
            description: "If you've requested an AI chatbot, lead capture automation, or CRM integration — this is when we connect and test them.",
            icon: <Bot className="h-6 w-6 text-[#f59e0b]" />
        }
    ];

    const integrations = [
        { name: "WhatsApp Business", icon: <MessageSquare className="w-6 h-6" /> },
        { name: "Google Maps", icon: <MapPin className="w-6 h-6" /> },
        { name: "Google Reviews", icon: <Star className="w-6 h-6" /> },
        { name: "Meta Pixel", icon: <Link2 className="w-6 h-6" /> },
        { name: "Google Analytics 4", icon: <BarChart className="w-6 h-6" /> },
        { name: "Calendly", icon: <Calendar className="w-6 h-6" /> },
        { name: "Razorpay / Stripe", icon: <CreditCard className="w-6 h-6" /> },
        { name: "Mailchimp", icon: <Mail className="w-6 h-6" /> },
        { name: "Zoho CRM", icon: <Users className="w-6 h-6" /> },
        { name: "Tawk.to", icon: <MessageSquare className="w-6 h-6" /> },
        { name: "Instagram Feed", icon: <Instagram className="w-6 h-6" /> },
        { name: "YouTube Embed", icon: <Youtube className="w-6 h-6" /> }
    ];

    const faqItems = [
        {
            question: "Do I need to provide my own content?",
            answer: "While we research and write the primary SEO copy for you, your input on specific business details, team bios, and service particulars is essential. We turn your knowledge into high-converting copy."
        },
        {
            question: "What if I already have copy I want to use?",
            answer: "That works too! We'll review your existing copy for SEO optimization and internal linking, ensuring it fits the new design structure while keeping your brand voice intact."
        },
        {
            question: "Which keywords will you target?",
            answer: "We perform local and industry-specific keyword research to identify 'buying intent' keywords. We focus on terms that your customers actually search for when they're ready to purchase."
        },
        {
            question: "Can you connect my existing CRM?",
            answer: "Yes. We support integrations with major CRMs like Zoho, Hubspot, Salesforce, and Pipedrive. If it has a webhook or API, we can connect your leads directly to your sales pipeline."
        },
        {
            question: "What AI tools do you integrate?",
            answer: "We specialize in custom OpenAI-powered chatbots trained on your business data, automated email follow-ups, and lead qualification triggers that save you hours of manual work."
        }
    ];

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "Scalvicon Web Design Process: Week 3",
        "step": [
            {
                "@type": "HowToStep",
                "name": "SEO Copywriting",
                "text": "Crafting headlines and descriptions for both humans and search engines."
            },
            {
                "@type": "HowToStep",
                "name": "Third-Party Integrations",
                "text": "Connecting business tools like WhatsApp, CRM, and Maps."
            }
        ]
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#94a3b8] font-body selection:bg-[#f59e0b]/30">
            <SEO 
                title="Week 3: Content & Integrations | SEO Copywriting & Tools | Scalvicon"
                description="Week 3 — Scalvicon adds your content, writes SEO-optimised copy, and connects WhatsApp, Google Maps, CRM, and all third-party tools your business needs."
                url="https://scalvicon.com/process/week-3-content-integrations"
            />
            <Helmet>
                <meta property="og:title" content="Week 3 — Content & Integrations | Scalvicon Process" />
                <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
            </Helmet>

            <Navbar />

            <main className="pt-24 pb-20">
                {/* 1. Process Stepper */}
                <div className="container mx-auto px-4 mb-16 overflow-hidden">
                    <div className="flex items-center justify-between relative max-w-4xl mx-auto overflow-x-auto pb-4 scrollbar-hide">
                        <div className="absolute top-5 left-0 right-0 h-[2px] bg-white/10 -z-10 hidden md:block" />
                        {steps.map((step, idx) => (
                            <Link 
                                key={step.number} 
                                to={`/process/${step.slug}`}
                                className="flex flex-col items-center min-w-[100px] group transition-all"
                            >
                                <div className={`
                                    w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-black mb-2
                                    ${step.status === 'active' ? 'bg-[#f59e0b] shadow-[0_0_20px_rgba(245,158,11,0.5)] scale-110' : 
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

                {/* 2. Hero Section */}
                <section className="container mx-auto px-4 mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-[#f59e0b] font-mono text-sm tracking-[0.2em] font-bold block mb-4 uppercase">
                            WEEK 3
                        </span>
                        <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 tracking-tight leading-tight">
                            Content & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#f97316]">Integrations</span>
                        </h1>
                        <p className="text-xl text-[#94a3b8] mb-8 font-light max-w-2xl mx-auto italic">
                            "Words that rank. Tools that work."
                        </p>
                        <div className="max-w-3xl mx-auto text-lg leading-relaxed mb-10 text-[#94a3b8]">
                            A beautiful website with weak copy doesn't convert. In Week 3, we populate your 
                            site with content that speaks directly to your ideal customer — written for humans 
                            first, Google second. We also connect every tool your business runs on: 
                            WhatsApp, Google Maps, booking systems, CRMs, payment gateways, and more.
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#111820] border border-white/5 rounded-full text-sm font-medium text-[#f59e0b]">
                            <Clock className="w-4 h-4" />
                            <span>Duration: 3–5 Business Days</span>
                        </div>
                    </motion.div>
                </section>

                {/* 3. What Happens This Week - Timeline */}
                <section className="container mx-auto px-4 max-w-4xl mb-32">
                    <h2 className="text-3xl font-display font-bold text-white mb-12 text-center">What Happens This Week</h2>
                    <div className="space-y-8 relative">
                        <div className="absolute left-[31px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-[#f59e0b]/50 to-transparent hidden md:block" />
                        {timelineSteps.map((step, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="group bg-[#111820] rounded-2xl border-l-4 border-[#f59e0b] p-8 shadow-card hover:shadow-card-hover transition-all border border-white/5"
                            >
                                <div className="flex items-start gap-6">
                                    <div className="w-16 h-16 shrink-0 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center group-hover:bg-[#f59e0b]/20 transition-colors">
                                        {step.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-display font-bold text-white mb-2">{step.title}</h3>
                                        <p className="text-[#94a3b8] leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 4. Integrations We Support (Icon Grid) */}
                <section className="container mx-auto px-4 max-w-6xl mb-32">
                    <div className="bg-[#111820] rounded-3xl p-10 border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f59e0b]/5 blur-3xl rounded-full -mr-32 -mt-32" />
                        <h3 className="text-2xl font-display font-bold text-white mb-12 relative z-10 text-center">Integrations We Support</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 relative z-10">
                            {integrations.map((item, idx) => (
                                <div 
                                    key={idx} 
                                    className="flex flex-col items-center justify-center p-6 bg-black/40 border border-white/5 rounded-2xl group/item hover:border-[#f59e0b]/30 transition-all hover:-translate-y-1"
                                >
                                    <div className="w-12 h-12 flex items-center justify-center text-[#f59e0b] mb-4 bg-[#f59e0b]/5 rounded-xl group-hover/item:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <span className="text-xs font-medium text-white text-center">{item.name}</span>
                                </div>
                            ))}
                        </div>
                        <p className="mt-12 text-center text-sm italic text-[#94a3b8]/60 relative z-10">
                            "Need something not listed? We'll build a custom integration."
                        </p>
                    </div>
                </section>

                {/* 5. SEO Copywriting Breakdown Card */}
                <section className="container mx-auto px-4 max-w-4xl mb-32">
                    <div className="bg-[#111820] rounded-3xl border border-white/5 p-10 shadow-card">
                        <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">What Our SEO Copy Covers</h2>
                        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
                            {[
                                "Keyword-researched page titles and meta descriptions",
                                "H1/H2/H3 heading structure with target keywords",
                                "Service/product descriptions optimised for local search",
                                "FAQ sections with People Also Ask targeting",
                                "Schema markup for all content types (Local/Service)",
                                "Internal linking strategy for SEO weight distribution"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <div className="w-6 h-6 shrink-0 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                                        <Check className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-white font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. Deliverables Block */}
                <section className="container mx-auto px-4 max-w-4xl mb-32">
                    <div className="bg-[#111820] rounded-2xl border border-[#f59e0b]/30 p-10 shadow-[0_0_30px_rgba(245,158,11,0.05)] relative overflow-hidden group text-center">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#f59e0b]/5 blur-3xl -mr-16 -mt-16 group-hover:bg-[#f59e0b]/10 transition-all rounded-full" />
                        <h3 className="text-2xl font-display font-bold text-[#f59e0b] mb-12 flex items-center justify-center gap-3">
                            <CheckCircle className="w-7 h-7" />
                            Week 3 Deliverables
                        </h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { title: "SEO Copy", desc: "Written for all pages" },
                                { title: "Integrations", desc: "Live and fully tested" },
                                { title: "Image Report", desc: "Optimized & alt-tagged" },
                                { title: "Keyword Map", desc: "Targeting strategy" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center">
                                    <h4 className="text-white font-bold mb-1">{item.title}</h4>
                                    <p className="text-xs text-[#94a3b8]">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 7. FAQ Section */}
                <section className="container mx-auto px-4 max-w-4xl mb-32">
                    <h2 className="text-3xl font-display font-bold text-white mb-12 text-center">Content & Tools — FAQ</h2>
                    <Accordion type="single" collapsible className="space-y-4">
                        {faqItems.map((item, idx) => (
                            <AccordionItem 
                                key={idx} 
                                value={`item-${idx}`}
                                className="border border-white/5 bg-[#111820] rounded-xl px-2 overflow-hidden"
                            >
                                <AccordionTrigger className="hover:no-underline text-white font-bold py-6 text-left hover:text-[#f59e0b] transition-colors">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-[#94a3b8] pb-6 leading-relaxed">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </section>

                {/* 8. CTA + Bottom Nav */}
                <section className="container mx-auto px-4 max-w-4xl mb-32">
                    <div className="relative rounded-3xl p-12 overflow-hidden border border-white/10 group bg-card">
                        <div className="relative z-10 text-center">
                            <h2 className="text-3xl font-display font-extrabold text-white mb-4">Ready to start your project?</h2>
                            <p className="text-[#94a3b8] mb-8 text-lg">Free 30-minute strategy call. No commitment.</p>
                            <Link to="/#contact">
                                <Button size="lg" className="bg-[#00e5a0] hover:bg-[#00c58a] text-black font-bold h-14 px-10 text-lg rounded-xl shadow-[0_0_30px_rgba(0,229,160,0.3)] hover:scale-105 transition-all">
                                    Book Your Free Discovery Call <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-4 max-w-4xl border-t border-white/5 pt-12">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <Link to="/process/week-2-development" className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors">
                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all text-xs font-bold font-mono">
                                02
                            </div>
                            <div className="text-left">
                                <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-1 font-bold">Previous Step</span>
                                <span className="font-display font-bold text-lg text-white group-hover:text-[#22d3ee]">Week 2: Development</span>
                            </div>
                        </Link>

                        <Link to="/process/week-4-testing-launch" className="group text-right flex items-center gap-3">
                            <div className="text-right">
                                <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-1 font-bold">Next Step</span>
                                <span className="font-display font-bold text-lg text-white group-hover:text-[#f97316]">Week 4: Testing & Launch</span>
                            </div>
                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all text-xs font-bold font-mono">
                                04
                            </div>
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Week3ContentIntegrations;
