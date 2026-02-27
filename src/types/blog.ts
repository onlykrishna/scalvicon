import type { Timestamp } from "firebase/firestore";

export type BlogStatus = "draft" | "published";

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;       // HTML or Markdown
    coverImage?: string;
    author: {
        name: string;
        avatar?: string;
    };
    category: string;
    tags: string[];
    publishedAt: Timestamp | null;
    updatedAt?: Timestamp;
    views: number;
    status: BlogStatus;
    seoOptimized?: boolean;
    seo?: {
        metaDescription: string;
        keywords: string[];
        focusKeyword: string;
        score: number;
        recommendations: string[];
        suggestedSlug: string;
        internalLinks: string[];
        optimizedAt: Timestamp;
    };
}


export const BLOG_CATEGORIES = [
    "Web Development",
    "SEO Tips",
    "Business Growth",
    "Case Studies",
    "Design",
    "Digital Marketing",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];
