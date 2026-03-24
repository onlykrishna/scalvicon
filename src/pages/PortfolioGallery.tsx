import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Portfolio from "@/components/Portfolio";
import { SEO } from "@/components/SEO";
import { fadeUp } from "@/lib/animations";

const PortfolioGallery = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Our Work | Scalvicon Portfolio"
        description="Explore our full portfolio of high-performance web solutions for SMEs. From healthcare to real estate, see how we help businesses grow."
        keywords={["web development portfolio", "SME websites", "Scalvicon projects", "case studies"]}
      />
      <Navbar />
      
      <main className="pt-20">
        {/* Header Section */}
        <section className="py-20 bg-muted/30 border-b border-border/50">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <h1 className="text-4xl md:text-6xl font-display font-extrabold text-foreground mb-6">
                Our Complete <span className="text-primary italic">Portfolio</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                A collection of high-performance digital solutions we've built for ambitious brands and SMEs. Each project is proof of our commitment to quality, speed, and conversion.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Portfolio Component (No Limit) */}
        <Portfolio />

        {/* Bottom CTA */}
        <section className="section-padding border-t border-border/50 bg-muted/10">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Ready to be our next success story?
              </h2>
              <p className="text-muted-foreground mb-10 text-lg">
                Let's build a high-converting digital presence for your business that ranks better and converts more.
              </p>
              <a 
                href="/#contact" 
                className="inline-flex h-14 items-center justify-center rounded-2xl bg-primary px-10 text-sm font-bold text-black shadow-[0_0_20px_rgba(0,229,160,0.3)] hover:shadow-[0_0_30px_rgba(0,229,160,0.5)] transition-all hover:scale-105"
              >
                Schedule a Free Strategy Call
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PortfolioGallery;
