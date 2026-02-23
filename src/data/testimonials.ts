export interface Testimonial {
    id: number;
    name: string;
    role: string;
    business: string;
    location: string;
    avatar: string;
    avatarColor: string;
    rating: number;
    text: string;
    metric: string;
    metricIcon: string;
}

export const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Rajesh Sharma",
        role: "Owner",
        business: "Sharma Dental Clinic",
        location: "Jaipur, Rajasthan",
        avatar: "RS",
        avatarColor: "from-green-500 to-emerald-600",
        rating: 5,
        text: "Before Scalvicon, we had zero online presence. Within 3 months of our new website going live, we started getting 15–20 new patient inquiries every month through Google. The investment paid for itself in the first week.",
        metric: "+18 new patients/month",
        metricIcon: "TrendingUp",
    },
    {
        id: 2,
        name: "Priya Nair",
        role: "Founder",
        business: "Bliss Beauty Lounge",
        location: "Kochi, Kerala",
        avatar: "PN",
        avatarColor: "from-purple-500 to-pink-600",
        rating: 5,
        text: "Our salon bookings doubled within 6 weeks. The website looks so premium that clients think we're a 5-star establishment. Scalvicon understood exactly what a beauty salon needs — online booking, gallery, and Google Maps integration.",
        metric: "+200% bookings",
        metricIcon: "Calendar",
    },
    {
        id: 3,
        name: "Amit Gupta",
        role: "Director",
        business: "Gupta Real Estate",
        location: "Noida, Uttar Pradesh",
        avatar: "AG",
        avatarColor: "from-blue-500 to-cyan-600",
        rating: 5,
        text: "We were losing leads to competitors with better websites. Scalvicon built us a site with property listings and WhatsApp integration. Now 60% of our new clients say they found us online. Delivery was exactly 4 weeks as promised.",
        metric: "60% leads from online",
        metricIcon: "Home",
    },
    {
        id: 4,
        name: "Sunita Reddy",
        role: "Chef & Owner",
        business: "Reddy's Kitchen",
        location: "Hyderabad, Telangana",
        avatar: "SR",
        avatarColor: "from-orange-500 to-red-500",
        rating: 5,
        text: "Our restaurant website now shows up on Google when people search 'best South Indian food near me'. We got a Swiggy-style menu display and the online order inquiries via WhatsApp went up 3x. Very professional team.",
        metric: "3x WhatsApp orders",
        metricIcon: "UtensilsCrossed",
    },
];
