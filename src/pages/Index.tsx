import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeTicker from "@/components/MarqueeTicker";

const Services = lazy(() => import("@/components/Services"));
const PainPoints = lazy(() => import("@/components/PainPoints"));
const Portfolio = lazy(() => import("@/components/Portfolio"));
const Process = lazy(() => import("@/components/Process"));
const Pricing = lazy(() => import("@/components/Pricing"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const ContactForm = lazy(() => import("@/components/ContactForm"));
const Footer = lazy(() => import("@/components/Footer"));

import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import { SEO } from "@/components/SEO";

const SectionLoading = () => <div className="h-[300px] w-full bg-background animate-pulse" />;

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <SEO 
      title="Premium Web Solutions for SMEs & Emerging Brands"
      description="Scalvicon delivers high-performance, premium web solutions designed to scale your business. Leading SME web agency in India."
      keywords={["premium web solutions", "SME growth", "business websites", "Scalvicon", "web agency India"]}
    />
    <Navbar />
    <Hero />
    <MarqueeTicker />
    <Suspense fallback={<SectionLoading />}>
      <Services />
      <PainPoints />
      <Portfolio showLimit={6} />
      <Process />
      <Pricing />
      <Testimonials />
      <FAQSection />
      <CTASection />
      <ContactForm />
      <Footer />
    </Suspense>
    <WhatsAppButton />
    <ScrollToTop />
  </div>
);

export default Index;
