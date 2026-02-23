export interface ProjectMetric {
    label: string;
    value: string;
    icon: string;
}

export interface PortfolioProject {
    id: number;
    title: string;
    category: string;
    tags: string[];
    gradient: string;
    accentColor: string;
    icon: string;
    description: string;
    metrics: ProjectMetric[];
    deliveryWeeks: number;
    liveUrl: string;
}

export const portfolioProjects: PortfolioProject[] = [
    {
        id: 1,
        title: "Sharma Dental Clinic",
        category: "Healthcare",
        tags: ["Healthcare", "Booking", "SEO"],
        gradient: "from-blue-600/20 to-cyan-600/20",
        accentColor: "#06b6d4",
        icon: "Stethoscope",
        description:
            "Complete clinic website with online appointment booking, doctor profiles, and service pages optimized for local SEO.",
        metrics: [
            { label: "New patients/month", value: "+18", icon: "Users" },
            { label: "Google ranking", value: "#1", icon: "Search" },
            { label: "PageSpeed score", value: "94", icon: "Zap" },
        ],
        deliveryWeeks: 3,
        liveUrl: "#",
    },
    {
        id: 2,
        title: "Bliss Beauty Lounge",
        category: "Salon & Spa",
        tags: ["Salon", "Booking", "Gallery"],
        gradient: "from-pink-600/20 to-purple-600/20",
        accentColor: "#d946ef",
        icon: "Sparkles",
        description:
            "Luxury salon website with Instagram-synced gallery, online booking calendar, price list, and WhatsApp chat integration.",
        metrics: [
            { label: "Bookings increase", value: "+200%", icon: "Calendar" },
            { label: "Bounce rate drop", value: "-45%", icon: "TrendingDown" },
            { label: "PageSpeed score", value: "91", icon: "Zap" },
        ],
        deliveryWeeks: 4,
        liveUrl: "#",
    },
    {
        id: 3,
        title: "Gupta Real Estate",
        category: "Real Estate",
        tags: ["Real Estate", "Listings", "Lead Gen"],
        gradient: "from-amber-600/20 to-orange-600/20",
        accentColor: "#f59e0b",
        icon: "Building2",
        description:
            "Property listing website with dynamic search filters, virtual tour links, lead capture forms, and CRM-ready inquiry management.",
        metrics: [
            { label: "Online leads share", value: "60%", icon: "PieChart" },
            { label: "Avg session time", value: "4.2m", icon: "Clock" },
            { label: "PageSpeed score", value: "89", icon: "Zap" },
        ],
        deliveryWeeks: 4,
        liveUrl: "#",
    },
    {
        id: 4,
        title: "Reddy's Kitchen",
        category: "Restaurant",
        tags: ["Restaurant", "Menu", "SEO"],
        gradient: "from-red-600/20 to-orange-600/20",
        accentColor: "#ef4444",
        icon: "UtensilsCrossed",
        description:
            "Restaurant website with digital menu, food photography showcase, Google Maps integration, and WhatsApp order button.",
        metrics: [
            { label: "WhatsApp orders", value: "3x", icon: "MessageCircle" },
            { label: "Google Maps views", value: "+890%", icon: "MapPin" },
            { label: "PageSpeed score", value: "96", icon: "Zap" },
        ],
        deliveryWeeks: 3,
        liveUrl: "#",
    },
    {
        id: 5,
        title: "FitZone Gym",
        category: "Fitness",
        tags: ["Fitness", "Membership", "SEO"],
        gradient: "from-green-600/20 to-emerald-600/20",
        accentColor: "#10b981",
        icon: "Dumbbell",
        description:
            "Gym and fitness center website with membership packages, class schedules, trainer profiles, and free trial sign-up flow.",
        metrics: [
            { label: "Trial signups/month", value: "+35", icon: "UserPlus" },
            { label: "Member retention lift", value: "+28%", icon: "TrendingUp" },
            { label: "PageSpeed score", value: "93", icon: "Zap" },
        ],
        deliveryWeeks: 3,
        liveUrl: "#",
    },
    {
        id: 6,
        title: "LegalEdge Associates",
        category: "Legal",
        tags: ["Legal", "Professional", "Trust"],
        gradient: "from-slate-600/20 to-gray-600/20",
        accentColor: "#94a3b8",
        icon: "Scale",
        description:
            "Law firm website with practice areas, attorney profiles, case result highlights, and secure client inquiry form.",
        metrics: [
            { label: "Inquiry form rate", value: "+180%", icon: "FileText" },
            { label: "Trust signals added", value: "12", icon: "Shield" },
            { label: "PageSpeed score", value: "92", icon: "Zap" },
        ],
        deliveryWeeks: 4,
        liveUrl: "#",
    },
];

export const portfolioCategories = [
    "All",
    "Healthcare",
    "Salon & Spa",
    "Real Estate",
    "Restaurant",
    "Fitness",
    "Legal",
];
