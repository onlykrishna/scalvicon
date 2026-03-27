import { Helmet } from "react-helmet-async";

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: "website" | "article";
    publishedTime?: string;
    author?: string;
    keywords?: string | string[];
    schema?: any; // Single schema or array of schemas
}

const SITE_NAME = "Scalvicon";
const DEFAULT_TITLE = "Scalvicon — Premium Web Solutions for SMEs & Emerging Brands";
const DEFAULT_DESC =
    "Premium web development and digital solutions tailored for SMEs and emerging brands. Scalvicon builds high-performance, SEO-optimized websites that drive growth.";
const DEFAULT_IMAGE = "https://scalvicon.in/og-image.png";
const SITE_URL = "https://scalvicon.in";
const DEFAULT_KEYWORDS =
    "premium web solutions, Scalvicon, web development for SMEs, emerging brand digital strategy, custom business websites India, high-performance web design";

export const SEO = ({
    title = DEFAULT_TITLE,
    description = DEFAULT_DESC,
    image = DEFAULT_IMAGE,
    url = SITE_URL,
    type = "website",
    publishedTime,
    author,
    keywords = DEFAULT_KEYWORDS,
    schema,
}: SEOProps) => {
    const fullTitle = title === DEFAULT_TITLE
        ? title
        : `${title} | ${SITE_NAME}`;

    const keywordsStr = Array.isArray(keywords) ? keywords.join(", ") : keywords;

    return (
        <Helmet>
            {/* Primary */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description} />
            {keywordsStr && <meta name="keywords" content={keywordsStr} />}
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="author" content={author ?? SITE_NAME} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            {publishedTime && (
                <meta property="article:published_time" content={publishedTime} />
            )}
            {author && <meta property="article:author" content={author} />}

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@scalvicon" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* JSON-LD Schema */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": SITE_NAME,
                    "url": SITE_URL,
                    "logo": image,
                    "description": DEFAULT_DESC,
                    "sameAs": [
                        "https://twitter.com/scalvicon",
                        "https://www.linkedin.com/company/scalvicon"
                    ],
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+91-XXXXXXXXXX",
                        "contactType": "customer service",
                        "areaServed": "IN",
                        "availableLanguage": "en"
                    }
                })}
            </script>
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": SITE_NAME,
                    "url": SITE_URL,
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": `${SITE_URL}/search?q={search_term_string}`,
                        "query-input": "required name=search_term_string"
                    }
                })}
            </script>

            {/* Custom Schema */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}

            {/* Canonical */}
            <link rel="canonical" href={url} />
        </Helmet>
    );
};
