export const CHAT_CONFIG = {
    triggers: {
        scrollPercentage: 70,
        dwellTimeMs: 45000,
        exitIntent: true,
    },
    greeting: "Hi there! I'm Scalvicon AI. How can I help you grow your business today?",
    quickReplies: [
        { label: "🌐 Website", value: "I need a business website" },
        { label: "🛒 Ecommerce", value: "I want to build an ecommerce store" },
        { label: "📈 SEO", value: "I need help with SEO" },
        { label: "💰 Pricing", value: "What is your pricing?" },
        { label: "💬 Talk to Expert", value: "I want to talk to an expert" },
    ],
    whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "",
};
