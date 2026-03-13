import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeTicker from "@/components/MarqueeTicker";
import Services from "@/components/Services";
import PainPoints from "@/components/PainPoints";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import { SEO } from "@/components/SEO";

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
    <Services />
    <PainPoints />
    <Portfolio />
    <Process />
    <Pricing />
    <Testimonials />
    <FAQSection />
    <CTASection />
    <ContactForm />
    <Footer />
    <WhatsAppButton />
    <ScrollToTop />
  </div>
);

export default Index;
