const fs = require('fs');
const path = require('path');

// Configuration
const HOSTNAME = 'https://scalvicon-9bf2f.web.app';

// Static routes
const staticRoutes = [
  '/',
  '/login',
  '/signup',
  '/forgot-password',
  '/blog',
  '/careers',
  '/terms',
  '/privacy',
  '/portfolio', // New gallery page
];

// Content directories/files to scan for dynamic routes
// Note: In a real build environment, we'd import the data files.
// For now, we'll manually list the dynamic segments or read the files if possible.

const services = [
  'business-website',
  'booking-appointment-sites',
  'ecommerce-online-store',
  'real-estate-portals',
  'seo-google-presence',
  'website-revamp',
];

const problems = [
  'outdated-website',
  'losing-customers',
  'slow-broken-site',
  'invisible-online',
];

const portfolio = [
  'dhun-musicals-e-commerce',
  'divine-hospital-raebareli',
  'sharma-dental-clinic',
  'bliss-beauty-lounge',
  'gupta-real-estate',
  'reddys-kitchen',
  'fitzone-gym',
  'legaledge-associates',
];

const process = [
  'week-1-discovery-design',
  'week-2-development',
  'week-3-content-integrations',
  'week-4-testing-launch',
  'ongoing-support-growth',
];

// Combine all routes
const allRoutes = [
  ...staticRoutes,
  ...services.map(s => `/services/${s}`),
  ...problems.map(p => `/problems/${p}`),
  ...portfolio.map(p => `/portfolio/${p}`),
  ...process.map(p => `/process/${p}`),
];

// Output to sitemap-urls.json (used by vite-plugin-sitemap)
const outputPath = path.join(__dirname, '..', 'sitemap-urls.json');
fs.writeFileSync(outputPath, JSON.stringify(allRoutes, null, 2));

console.log(`✅ sitemap-urls.json generated with ${allRoutes.length} routes.`);
