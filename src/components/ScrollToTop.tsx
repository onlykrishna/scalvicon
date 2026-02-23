import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", damping: 15 }}
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                    className="fixed bottom-24 right-6 z-40 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-200"
                >
                    <ArrowUp size={18} className="text-foreground" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;
