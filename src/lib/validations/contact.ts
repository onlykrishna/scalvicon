import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    businessName: z.string().min(2, "Business name is required"),
    businessType: z.string().min(1, "Please select your business type"),
    phone: z
        .string()
        .regex(/^\d{10}$/, "Please enter a valid 10-digit phone number"),
    email: z.string().email("Please enter a valid email address"),
    message: z.string().optional(),
    budget: z.string().min(1, "Please select a budget range"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const BUSINESS_TYPES = [
    "Restaurant / Café",
    "Clinic / Hospital",
    "Salon & Spa",
    "Real Estate",
    "Retail Store",
    "Gym / Fitness",
    "Legal / CA Firm",
    "Education / Coaching",
    "Other",
] as const;

export const BUDGET_RANGES = [
    "Under ₹15,000",
    "₹15,000 – ₹25,000",
    "₹25,000 – ₹35,000",
    "Custom / Not sure",
] as const;
