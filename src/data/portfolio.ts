export interface ProjectMetric {
    label: string;
    value: string;
    icon: string;
}

export interface PortfolioProject {
    id: number;
    slug: string;
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

    // Detailed case study data
    challenge?: string;
    solutionTitle?: string;
    solutionDetails?: string[];
    testimonial?: {
        quote: string;
        author: string;
        role: string;
    };
    techStack?: string[];
}

export const portfolioProjects: PortfolioProject[] = [
    {
        id: 8,
        slug: "dhun-musicals-e-commerce",
        title: "Dhun Musicals",
        category: "E-commerce",
        tags: ["E-commerce", "Musical Instruments", "Web Audio API", "Premium"],
        gradient: "from-orange-600/20 to-amber-600/20",
        accentColor: "#f59e0b",
        icon: "Music",
        description:
            "Premium e-commerce platform for professional-grade Indian bamboo flutes, featuring interactive tuning tools and a divine aesthetic.",
        metrics: [
            { label: "Satisfied Customers", value: "20k+", icon: "Users" },
            { label: "Tuning Standard", value: "440Hz", icon: "Mic" },
            { label: "Experience", value: "12+ yrs", icon: "Clock" },
        ],
        deliveryWeeks: 6,
        liveUrl: "https://www.dhunmusicals.com",
        challenge: "Dhun Musicals needed to translate the tactile, auditory essence of premium bamboo flutes into a digital experience while providing professional tools for serious musicians.",
        solutionTitle: "The Digital Flute Sanctuary",
        solutionDetails: [
            "Developed a Web Audio API-powered 'Scale Finder' for real-time tuning verification",
            "Crafted a 'Divine' UI using high-end imagery of Assam bamboo and leather textures",
            "Built specialized e-commerce filtering by scale, skill level, and wood density",
            "Integrated a professional-grade metronome and digital fingering charts for learners"
        ],
        testimonial: {
            quote: "The scale finder tool is a game-changer for our customers. The site finally reflects the premium quality of the Bansuris we've been crafting for over a decade.",
            author: "Founder",
            role: "Dhun Musicals"
        },
        techStack: ["React 18", "Web Audio API", "Tailwind CSS", "Firebase Hosting"]
    },
    {
        id: 7,
        slug: "divine-hospital-raebareli",
        title: "Divine Hospital & Advanced Laparoscopic Centre",
        category: "Healthcare",
        tags: ["Healthcare", "Ayushman Bharat", "Laparoscopic", "Responsive"],
        gradient: "from-emerald-600/20 to-blue-600/20",
        accentColor: "#10b981",
        icon: "HeartPulse",
        description:
            "Professional digital presence for a state-of-the-art Raebareli hospital, highlighting Ayushman Bharat empanelment and advanced surgical expertise.",
        metrics: [
            { label: "Rural Load Time", value: "<1.2s", icon: "Zap" },
            { label: "Mobile Optimized", value: "100%", icon: "Smartphone" },
            { label: "Specialties List", value: "15+", icon: "Stethoscope" },
        ],
        deliveryWeeks: 3,
        liveUrl: "https://divinehospitalbyscalvicon.netlify.app/",
        challenge: "Divine Hospital needed to bridge the gap between their advanced clinical capabilities and their digital visibility, especially for patients in Raebareli relying on Ayushman Bharat services.",
        solutionTitle: "Fast, Accessible & Informative Healthcare Hub",
        solutionDetails: [
            "Optimized for low-bandwidth rural mobile networks ensuring 100% accessibility",
            "Clear architectural hierarchy for Oncology, Urology, and Laparoscopic specialties",
            "Prominent Ayushman Bharat status display to build local trust and awareness",
            "Streamlined 'One-Tap' appointment booking and emergency contact integration"
        ],
        testimonial: {
            quote: "The website has significantly improved how patients in Raebareli find and trust our specialized services. The mobile speed is exceptional even on slower networks.",
            author: "Hospital Admin",
            role: "Divine Hospital"
        },
        techStack: ["React 18", "Vite", "Tailwind CSS", "Netlify"]
    },
    {
        id: 1,
        slug: "sharma-dental-clinic",
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
        challenge: "Dr. Sharma was losing 40% of calls because his receptionist couldn't handle the volume during peak hours. His old Wix site was invisible on Google Maps.",
        solutionTitle: "Automated Booking & Local SEO Dominance",
        solutionDetails: [
            "Built a custom React patient portal with instant 24/7 appointment booking",
            "Structured Google Schema markup for local healthcare providers",
            "Integrated WhatsApp auto-reminders reducing no-shows by 80%",
            "Migrated from shared hosting to Firebase edge network for instant load times"
        ],
        testimonial: {
            quote: "I no longer hire receptionists just to answer phones. The website does the heavy lifting, and we rank #1 for 'Dentist near me'. Scalvicon changed my practice.",
            author: "Dr. Alok Sharma",
            role: "Head Surgeon"
        },
        techStack: ["React", "Firebase", "WhatsApp API", "Structured Schema"]
    },
    {
        id: 2,
        slug: "bliss-beauty-lounge",
        title: "Bliss Beauty Lounge Luxury Service & Wellness",
        category: "Luxury Service / Wellness",
        tags: ["Luxury", "Wellness", "Booking Engine", "Visual Lookbook"],
        gradient: "from-rose-400/20 to-stone-400/20",
        accentColor: "#e5b3a4", // Rose Gold tone
        icon: "Sparkles",
        description:
            "Premium digital sanctuary for a high-end salon, featuring a frictionless multi-step booking engine and an immersive Instagram-style visual lookbook.",
        metrics: [
            { label: "Booking Flow", value: "4-Step", icon: "Calendar" },
            { label: "Transformations", value: "100+", icon: "Sparkles" },
            { label: "PageSpeed Score", value: "90+", icon: "Zap" },
            { label: "Conflicts", value: "Zero", icon: "CheckCircle" },
        ],
        deliveryWeeks: 4,
        liveUrl: "https://blissbeautybyscalvicon.netlify.app/",
        challenge: "Bliss Beauty Lounge needed to translate the tactile, opulent essence of a premium physical salon into a digital experience. The primary goal was to automate the appointment scheduling process without losing the \"luxury touch\" that their high-profile clients expect.",
        solutionTitle: "The Digital Sanctuary",
        solutionDetails: [
            "Multi-Step Booking Engine: Developed a robust React state-machine to handle service selection, date-time picking (with real-time validation), and customer details in a choreographed flow.",
            "Glassmorphism UI: Crafted a 'Luxury-First' design system using Tailwind v4, featuring a curated palette of Rose Gold, Cream, and Charcoal with soft-shadow glass overlays.",
            "Immersive Lookbook: Built an Instagram-style masonry gallery with interactive lightboxes and category filters to showcase stylist artistry at high resolution.",
            "Conversion Optimization: Integrated a persistent WhatsApp pulse-button and dynamic SEO/Open Graph metadata to ensure high-engagement social sharing."
        ],
        testimonial: {
            quote: "The new booking system has completely streamlined our daily operations. Our clients constantly compliment the premium feel of the site, and the gallery has become our strongest tool for attracting new bridal transformations.",
            author: "Priya Singh",
            role: "Owner & Lead Stylist"
        },
        techStack: ["React 19", "Vite", "Tailwind v4", "Framer Motion"]
    },
    {
        id: 3,
        slug: "gupta-real-estate",
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
        challenge: "Bleeding ₹50,000/month on 99Acres listings competing with 100 other brokers, offering no distinct premium brand presence.",
        solutionTitle: "Whitelabel Property Asset Portal",
        solutionDetails: [
            "Built a proprietary listing engine with custom parameters (BHK, Budget, Locality)",
            "Embedded immersive 360° Matterport virtual tours minimizing physical site visits",
            "Injected sticky WhatsApp CTAs on every property detail page",
            "Generated XML feeds syncing instantly with Google Maps API"
        ],
        testimonial: {
            quote: "We stopped paying aggregator fees within 3 months. Our direct high-net-worth client lead pipeline is now totally in our control.",
            author: "Rajesh Gupta",
            role: "Managing Director"
        },
        techStack: ["Next.js", "Google Maps API", "Tailwind CSS", "Firebase Firestore"]
    },
    {
        id: 4,
        slug: "reddys-kitchen",
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
        challenge: "Losing 25% margins giving revenue to Zomato/Swiggy. Their offline menu was great but online presence was non-existent.",
        solutionTitle: "Direct-to-Consumer Food Pipeline",
        solutionDetails: [
            "Highly visual, mouth-watering UI displaying 4K food photography",
            "Implemented direct WhatsApp ordering bypassing aggregator commissions",
            "Setup massive localized SEO for terms like 'Best Biryani in Hyderabad'",
            "Integrated direct Google reviews hook converting happy diners"
        ],
        testimonial: {
            quote: "The site paid for itself in 10 days just from saved Swiggy commissions on direct orders.",
            author: "Venkat Reddy",
            role: "Owner"
        },
        techStack: ["React", "Vite", "Image Optimization Pipelines"]
    },
    {
        id: 5,
        slug: "fitzone-gym",
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
        challenge: "Competing against massive franchise gyms (Cult.fit) without the budget to out-spend them on Facebook Ads.",
        solutionTitle: "Hyper-Local Community Authority",
        solutionDetails: [
            "Engineered an aggressive 'Claim Free Day Pass' sticky modal across all pages",
            "Built out an exhaustive SEO structure capturing local 'gyms near me' traffic natively",
            "Integrated trainer profile portfolios increasing trust and personal connection"
        ],
        testimonial: {
            quote: "We are finally capturing the organic traffic that Cult used to steal from us. The free pass funnel is a machine.",
            author: "Rahul Verma",
            role: "Head Coach"
        },
        techStack: ["React Router DOM", "Cloud Functions", "Nodemailer Alerts"]
    },
    {
        id: 6,
        slug: "legaledge-associates",
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
        challenge: "Old site looked like a scam from 2005. High net-worth corporate clients were bouncing immediately due to lack of trust.",
        solutionTitle: "The Trust & Authority Architecture",
        solutionDetails: [
            "Executed an ultra-minimalist, high-end monochrome design aesthetic",
            "Built a dynamic database engine publishing recent High Court case victory summaries",
            "Installed GDPR compliant privacy policies and secure PGP encrypted contact protocols",
            "Authored 10,000 words of deeply-researched legal SEO documentation"
        ],
        testimonial: {
            quote: "Corporate clients now tell me 'We hired you because your website proved you understand compliance better than anyone else'. Exceptional work.",
            author: "Neha Sharma",
            role: "Senior Partner"
        },
        techStack: ["React 18", "Zod Validations", "Framer Motion"]
    },
];

export const portfolioCategories = [
    "All",
    "E-commerce",
    "Healthcare",
    "Salon & Spa",
    "Real Estate",
    "Restaurant",
    "Fitness",
    "Legal",
];
